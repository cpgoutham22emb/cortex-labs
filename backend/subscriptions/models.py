from django.conf import settings
from django.db import models
from django.utils import timezone


class SubscriptionPlan(models.TextChoices):
    MONTHLY = "MONTHLY", "Monthly"
    QUARTERLY = "QUARTERLY", "Quarterly"
    YEARLY = "YEARLY", "Yearly"


class SubscriptionStatus(models.TextChoices):
    ACTIVE = "ACTIVE", "Active"
    EXPIRED = "EXPIRED", "Expired"
    CANCELLED = "CANCELLED", "Cancelled"


class Subscription(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="subscriptions",
    )

    plan = models.CharField(
        max_length=20,
        choices=SubscriptionPlan.choices,
    )

    start_date = models.DateTimeField(
        default=timezone.now,
    )

    end_date = models.DateTimeField()

    status = models.CharField(
        max_length=20,
        choices=SubscriptionStatus.choices,
        default=SubscriptionStatus.ACTIVE,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def is_active(self):
        return (
            self.status == SubscriptionStatus.ACTIVE
            and self.end_date > timezone.now()
        )

    def __str__(self):
        return f"{self.student.email} - {self.plan}"