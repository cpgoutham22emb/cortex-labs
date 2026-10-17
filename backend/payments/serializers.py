from rest_framework import serializers

from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    student_email = serializers.EmailField(
        source="student.email",
        read_only=True,
    )

    course_title = serializers.CharField(
        source="course.title",
        read_only=True,
    )

    class Meta:
        model = Payment
        fields = (
            "id",
            "student",
            "student_email",
            "course",
            "course_title",
            "amount",
            "currency",
            "status",
            "gateway",
            "gateway_order_id",
            "gateway_payment_id",
            "created_at",
            "paid_at",
        )

        read_only_fields = (
            "id",
            "student",
            "student_email",
            "course_title",
            "amount",
            "currency",
            "status",
            "gateway",
            "gateway_order_id",
            "gateway_payment_id",
            "created_at",
            "paid_at",
        )

class CreatePaymentOrderSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()

class VerifyPaymentSerializer(serializers.Serializer):
    payment_id = serializers.IntegerField()
    razorpay_order_id = serializers.CharField(max_length=200)
    razorpay_payment_id = serializers.CharField(max_length=200)
    razorpay_signature = serializers.CharField(max_length=500)