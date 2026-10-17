from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models

from courses.models import Course


class CareerPath(models.Model):
    """
    Represents the complete Career Path product/program.

    The linked Course is the actual purchasable product so that
    the existing payment and enrollment system can be reused.
    """

    course = models.OneToOneField(
        Course,
        on_delete=models.PROTECT,
        related_name="career_path",
    )

    title = models.CharField(max_length=255)

    regular_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )

    founding_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
    )

    founding_batch_active = models.BooleanField(default=True)

    short_description = models.TextField()

    badge_text = models.CharField(
        max_length=100,
        blank=True,
        default="CAREER PATH",
    )

    cta_text = models.CharField(
        max_length=100,
        default="Explore Career Path",
    )

    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Career Path"
        verbose_name_plural = "Career Paths"

    def __str__(self):
        return self.title

    @property
    def current_price(self):
        if self.founding_batch_active:
            return self.founding_price

        return self.regular_price


class CareerStage(models.Model):
    """
    A major stage inside the Career Path.
    Example:
        01 Programming Foundation
        02 Embedded C
        03 Microcontrollers
    """

    career_path = models.ForeignKey(
        CareerPath,
        on_delete=models.CASCADE,
        related_name="stages",
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["career_path", "order"],
                name="unique_career_stage_order",
            )
        ]

    def __str__(self):
        return f"{self.order:02d} - {self.title}"


class CareerStageTopic(models.Model):
    """
    Individual topics belonging to a Career Stage.
    """

    stage = models.ForeignKey(
        CareerStage,
        on_delete=models.CASCADE,
        related_name="topics",
    )

    title = models.CharField(max_length=255)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["stage", "order"],
                name="unique_career_topic_order",
            )
        ]

    def __str__(self):
        return self.title


class CareerProject(models.Model):
    """
    Industry-style projects included in the Career Path.
    """

    career_path = models.ForeignKey(
        CareerPath,
        on_delete=models.CASCADE,
        related_name="projects",
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["career_path", "order"],
                name="unique_career_project_order",
            )
        ]

    def __str__(self):
        return self.title


class CareerProjectStep(models.Model):
    """
    Workflow followed for each Career Path project.

    Example:
        Requirement
        Design
        Architecture
        Coding
        Hardware
        Debugging
        Testing
        GitHub
    """

    project = models.ForeignKey(
        CareerProject,
        on_delete=models.CASCADE,
        related_name="steps",
    )

    title = models.CharField(max_length=255)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["project", "order"],
                name="unique_project_step_order",
            )
        ]

    def __str__(self):
        return self.title


class CareerSupportCategory(models.Model):
    """
    Groups Job Ready / Placement support items.

    Examples:
        Technical
        Portfolio
        Professional
        Interview
    """

    career_path = models.ForeignKey(
        CareerPath,
        on_delete=models.CASCADE,
        related_name="support_categories",
    )

    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["career_path", "order"],
                name="unique_support_category_order",
            )
        ]

    def __str__(self):
        return self.title


class CareerSupportItem(models.Model):
    """
    Individual item inside a support category.
    """

    category = models.ForeignKey(
        CareerSupportCategory,
        on_delete=models.CASCADE,
        related_name="items",
    )

    title = models.CharField(max_length=255)

    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["category", "order"],
                name="unique_support_item_order",
            )
        ]

    def __str__(self):
        return self.title


class TrainingLandingPage(models.Model):
    """
    Controls the dynamic content displayed on /training.

    This is intentionally a singleton-style model.
    """

    hero_title = models.CharField(
        max_length=255,
        default="Build Your Embedded Engineering Career",
    )

    hero_description = models.TextField(blank=True)

    career_path_section_title = models.CharField(
        max_length=255,
        default="Become a Job-Ready Embedded Engineer",
    )

    career_path_section_description = models.TextField(
        default=(
            "Includes structured curriculum + projects + "
            "interview preparation + placement assistance."
        ),
    )

    career_path_cta_text = models.CharField(
        max_length=100,
        default="Explore Career Path",
    )

    skill_courses_section_title = models.CharField(
        max_length=255,
        default="Learn exactly what you need",
    )

    skill_courses_section_description = models.TextField(
        blank=True,
    )

    skill_courses_cta_text = models.CharField(
        max_length=100,
        default="Explore Skill Courses",
    )

    is_published = models.BooleanField(default=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Training Landing Page"
        verbose_name_plural = "Training Landing Page"

    def __str__(self):
        return "Training Landing Page"