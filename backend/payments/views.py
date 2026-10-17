from django.conf import settings
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema

from .models import Payment

from .serializers import (
    CreatePaymentOrderSerializer,
    PaymentSerializer,
    VerifyPaymentSerializer,
)
from .services import (
    create_payment,
    create_razorpay_order,
    get_course_for_payment,
    verify_razorpay_payment,
)


class CreatePaymentOrderView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=CreatePaymentOrderSerializer,
    )

    def post(self, request):
        if request.user.role != "STUDENT":
            return Response(
                {"detail": "Only students can purchase courses."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = CreatePaymentOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        course_id = serializer.validated_data["course_id"]

        try:
            course = get_course_for_payment(course_id)
        except Exception as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if course.price <= 0:
            return Response(
                {"detail": "This course is free."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            payment = create_payment(
                student=request.user,
                course=course,
            )
            razorpay_order = create_razorpay_order(payment)
        except ValueError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as exc:
            print("RAZORPAY ERROR:", repr(exc))
            return Response(
                {"detail": "Unable to create payment order. Please try again."},
                status=status.HTTP_502_BAD_GATEWAY,
            )
        
        return Response(
            {
                "payment": PaymentSerializer(payment).data,
                "checkout": {
                    "key_id": settings.RAZORPAY_KEY_ID,
                    "order_id": razorpay_order["id"],
                    "amount": razorpay_order["amount"],
                    "currency": razorpay_order["currency"],
                },
            },
            status=status.HTTP_201_CREATED,
        )

class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=VerifyPaymentSerializer,
    )
    def post(self, request):
        if request.user.role != "STUDENT":
            return Response(
                {"detail": "Only students can verify course payments."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = VerifyPaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payment_id = serializer.validated_data["payment_id"]
        razorpay_order_id = serializer.validated_data["razorpay_order_id"]
        razorpay_payment_id = serializer.validated_data["razorpay_payment_id"]
        razorpay_signature = serializer.validated_data["razorpay_signature"]

        try:
            payment = Payment.objects.get(
                id=payment_id,
                student=request.user,
            )
        except Payment.DoesNotExist:
            return Response(
                {"detail": "Payment not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            payment = verify_razorpay_payment(
                payment=payment,
                razorpay_order_id=razorpay_order_id,
                razorpay_payment_id=razorpay_payment_id,
                razorpay_signature=razorpay_signature,
            )
        except ValueError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception:
            return Response(
                {"detail": "Payment verification failed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "detail": "Payment verified successfully.",
                "payment": PaymentSerializer(payment).data,
            },
            status=status.HTTP_200_OK,
        )