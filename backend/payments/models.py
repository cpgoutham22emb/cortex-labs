from django.conf import settings
from django.db import models

from courses.models import Course


class PaymentStatus(models.TextChoices):
    CREATED = "CREATED", "Created"
    PENDING = "PENDING", "Pending"
    SUCCESS = "SUCCESS", "Success"
    FAILED = "FAILED", "Failed"
    CANCELLED = "CANCELLED", "Cancelled"
    REFUNDED = "REFUNDED", "Refunded"


class PaymentGateway(models.TextChoices):
    RAZORPAY = "RAZORPAY", "Razorpay"


class Payment(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="payments",
    )

    course = models.ForeignKey(
        Course,
        on_delete=models.PROTECT,
        related_name="payments",
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    currency = models.CharField(
        max_length=3,
        default="INR",
    )

    status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.CREATED,
    )

    gateway = models.CharField(
        max_length=20,
        choices=PaymentGateway.choices,
        default=PaymentGateway.RAZORPAY,
    )

    gateway_order_id = models.CharField(
        max_length=200,
        blank=True,
    )

    gateway_payment_id = models.CharField(
        max_length=200,
        blank=True,
    )

    gateway_signature = models.CharField(
        max_length=500,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(
                fields=["student", "course"],
            ),
            models.Index(
                fields=["gateway_order_id"],
            ),
            models.Index(
                fields=["gateway_payment_id"],
            ),
        ]

    def __str__(self):
        return (
            f"{self.student.email} - "
            f"{self.course.title} - "
            f"{self.amount} {self.currency} - "
            f"{self.status}"
        )