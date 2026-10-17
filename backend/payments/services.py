from django.conf import settings
from django.core.exceptions import ValidationError
from courses.models import Course, CourseStatus

from django.db import transaction

from payments.models import Payment, PaymentStatus
from enrollments.models import Enrollment, EnrollmentStatus
from django.utils import timezone

import razorpay


def get_course_for_payment(course_id):
    try:
        return Course.objects.get(
            id=course_id,
            status=CourseStatus.PUBLISHED,
        )
    except Course.DoesNotExist:
        raise ValidationError("Course not found or not available for purchase.")




@transaction.atomic
def create_payment(
    *,
    student,
    course,
):
    existing_enrollment = Enrollment.objects.filter(
        student=student,
        course=course,
    ).first()

    if existing_enrollment:
        raise ValueError("You are already enrolled in this course.")

    existing_payment = Payment.objects.filter(
        student=student,
        course=course,
        status__in=[
            PaymentStatus.CREATED,
            PaymentStatus.PENDING,
        ],
    ).order_by("-created_at").first()

    if existing_payment:
        return existing_payment

    payment = Payment.objects.create(
        student=student,
        course=course,
        amount = (
            course.career_path.current_price
            if hasattr(course, "career_path")
            else course.price
        ),
        currency="INR",
        status=PaymentStatus.CREATED,
    )

    return payment

def create_razorpay_order(payment):
    if payment.gateway_order_id:
        return {
            "id": payment.gateway_order_id,
            "amount": int(payment.amount * 100),
            "currency": payment.currency,
        }

    client = razorpay.Client(
        auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET,
        )
    )

    amount_in_paise = int(payment.amount * 100)

    order_data = {
        "amount": amount_in_paise,
        "currency": payment.currency,
        "receipt": f"cortex_payment_{payment.id}",
        "notes": {
            "payment_id": str(payment.id),
            "course_id": str(payment.course_id),
            "student_id": str(payment.student_id),
        },
    }

    razorpay_order = client.order.create(
        data=order_data,
    )

    payment.gateway_order_id = razorpay_order["id"]
    payment.status = PaymentStatus.PENDING
    payment.save(
        update_fields=[
            "gateway_order_id",
            "status",
            "updated_at",
        ]
    )

    return razorpay_order

@transaction.atomic
def verify_razorpay_payment(
    *,
    payment,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
):
    if payment.status == PaymentStatus.SUCCESS:
        if payment.gateway_order_id != razorpay_order_id:
            raise ValueError("Razorpay order does not match this payment.")

        if payment.gateway_payment_id != razorpay_payment_id:
            raise ValueError("Razorpay payment does not match this payment.")

        return payment

    if payment.gateway_order_id != razorpay_order_id:
        raise ValueError("Razorpay order does not match this payment.")

    client = razorpay.Client(
        auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET,
        )
    )

    client.utility.verify_payment_signature(
        {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature,
        }
    )
    razorpay_payment = client.payment.fetch(
        razorpay_payment_id
    )

    if razorpay_payment["order_id"] != payment.gateway_order_id:
        raise ValueError("Razorpay payment order does not match this payment.")

    if razorpay_payment["status"] != "captured":
        raise ValueError(
            "Razorpay payment has not been captured."
        )

    expected_amount = int(payment.amount * 100)

    if razorpay_payment["amount"] != expected_amount:
        raise ValueError("Payment amount does not match the course price.")

    if razorpay_payment["currency"] != payment.currency:
        raise ValueError("Payment currency does not match the course currency.")

    payment.gateway_payment_id = razorpay_payment_id
    payment.gateway_signature = razorpay_signature
    payment.status = PaymentStatus.SUCCESS
    payment.paid_at = timezone.now()

    payment.save(
        update_fields=[
            "gateway_payment_id",
            "gateway_signature",
            "status",
            "paid_at",
            "updated_at",
        ]
    )

    Enrollment.objects.update_or_create(
        student=payment.student,
        course=payment.course,
        defaults={
            "status": EnrollmentStatus.ACTIVE,
            "progress": 0,
        },
    )

    return payment