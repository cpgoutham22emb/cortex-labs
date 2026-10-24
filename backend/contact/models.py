from django.db import models


class Enquiry(models.Model):

    class EnquiryType(models.TextChoices):
        TRAINING = "TRAINING", "Training"
        CONSULTANCY = "CONSULTANCY", "Engineering Consultancy"
        PRODUCT_DEVELOPMENT = "PRODUCT_DEVELOPMENT", "Product Development"
        EDGE_AI = "EDGE_AI", "Edge AI"
        OTHER = "OTHER", "Other"

    class EnquiryStatus(models.TextChoices):
        NEW = "NEW", "New"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        RESPONDED = "RESPONDED", "Responded"
        CLOSED = "CLOSED", "Closed"

    full_name = models.CharField(max_length=150)

    email = models.EmailField(max_length=254)

    company = models.CharField(
        max_length=200,
        blank=True,
    )

    enquiry_type = models.CharField(
        max_length=30,
        choices=EnquiryType.choices,
    )

    subject = models.CharField(max_length=200)

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=EnquiryStatus.choices,
        default=EnquiryStatus.NEW,
        db_index=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Enquiry"
        verbose_name_plural = "Enquiries"

    def __str__(self):
        return f"{self.full_name} - {self.subject}"