from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager


class UserRole(models.TextChoices):
    ADMIN = "ADMIN", "Admin"
    INSTRUCTOR = "INSTRUCTOR", "Instructor"
    STUDENT = "STUDENT", "Student"


class CustomUser(AbstractUser):
    """
    Custom user model using email as the unique identifier.
    """

    username = None

    email = models.EmailField(
        unique=True,
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
    )

    profile_photo = models.ImageField(
        upload_to="users/profile_photos/",
        blank=True,
        null=True,
    )

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.STUDENT,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

class Meta:
    ordering = ["email"]

    def __str__(self):
        return f"{self.email} ({self.role})"