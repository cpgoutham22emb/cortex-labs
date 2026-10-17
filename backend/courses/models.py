from django.conf import settings
from django.db import models
from django.utils.text import slugify


class CourseLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Beginner"
    INTERMEDIATE = "INTERMEDIATE", "Intermediate"
    ADVANCED = "ADVANCED", "Advanced"


class CourseStatus(models.TextChoices):
    DRAFT = "DRAFT", "Draft"
    PUBLISHED = "PUBLISHED", "Published"
    ARCHIVED = "ARCHIVED", "Archived"


class Course(models.Model):
    title = models.CharField(max_length=200)

    slug = models.SlugField(
        max_length=220,
        unique=True,
        blank=True,
    )

    description = models.TextField()

    thumbnail = models.ImageField(
        upload_to="courses/thumbnails/",
        blank=True,
        null=True,
    )

    instructor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="courses",
    )

    category = models.CharField(
        max_length=100,
    )

    level = models.CharField(
        max_length=20,
        choices=CourseLevel.choices,
        default=CourseLevel.BEGINNER,
    )

    duration_hours = models.PositiveIntegerField(
        default=0,
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    status = models.CharField(
        max_length=20,
        choices=CourseStatus.choices,
        default=CourseStatus.DRAFT,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class CourseModule(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="modules",
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField(
        blank=True,
    )

    order = models.PositiveIntegerField(
        default=1,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["course", "order"],
                name="unique_course_module_order",
            )
        ]

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Lesson(models.Model):
    module = models.ForeignKey(
        CourseModule,
        on_delete=models.CASCADE,
        related_name="lessons",
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField(
        blank=True,
    )

    content = models.TextField(
        blank=True,
    )

    video_url = models.URLField(
        blank=True,
    )

    duration_minutes = models.PositiveIntegerField(
        default=0,
    )

    order = models.PositiveIntegerField(
        default=1,
    )

    is_published = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["module", "order"],
                name="unique_module_lesson_order",
            )
        ]

    def __str__(self):
        return f"{self.module.title} - {self.title}"

class LessonProgress(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="lesson_progress",
    )

    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name="progress_records",
    )

    progress = models.PositiveIntegerField(
        default=0,
    )

    completed = models.BooleanField(
        default=False,
    )

    last_accessed = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-last_accessed"]

        constraints = [
            models.UniqueConstraint(
                fields=["student", "lesson"],
                name="unique_student_lesson_progress",
            )
        ]

    def __str__(self):
        return (
            f"{self.student.email} - "
            f"{self.lesson.title} - "
            f"{self.progress}%"
        )

class Quiz(models.Model):
    module = models.OneToOneField(
        CourseModule,
        on_delete=models.CASCADE,
        related_name="quiz",
    )

    title = models.CharField(
        max_length=200,
    )

    description = models.TextField(
        blank=True,
    )

    pass_percentage = models.PositiveIntegerField(
        default=70,
    )

    max_attempts = models.PositiveIntegerField(
        default=3,
    )

    is_published = models.BooleanField(
        default=False,
    )

    # Proctoring controls are configured by Admin.
    # Enabling proctoring requires camera + microphone permission.
    # No audio/video recording is implied by these settings.
    proctoring_enabled = models.BooleanField(
        default=False,
    )

    require_fullscreen = models.BooleanField(
        default=True,
    )

    detect_tab_switch = models.BooleanField(
        default=True,
    )

    max_warnings = models.PositiveIntegerField(
        default=3,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["module__order"]

    def __str__(self):
        return self.title


class QuizQuestion(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions",
    )

    question = models.TextField()

    order = models.PositiveIntegerField(
        default=1,
    )

    marks = models.PositiveIntegerField(
        default=1,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["order"]

        constraints = [
            models.UniqueConstraint(
                fields=["quiz", "order"],
                name="unique_quiz_question_order",
            )
        ]

    def __str__(self):
        return f"{self.quiz.title} - Question {self.order}"


class QuizOption(models.Model):
    question = models.ForeignKey(
        QuizQuestion,
        on_delete=models.CASCADE,
        related_name="options",
    )

    text = models.CharField(
        max_length=500,
    )

    order = models.PositiveIntegerField(
        default=1,
    )

    is_correct = models.BooleanField(
        default=False,
    )

    class Meta:
        ordering = ["order"]

        constraints = [
            models.UniqueConstraint(
                fields=["question", "order"],
                name="unique_question_option_order",
            )
        ]

    def __str__(self):
        return self.text


class QuizAttempt(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        PASSED = "PASSED", "Passed"
        FAILED = "FAILED", "Failed"
        INVALID = "INVALID", "Invalid"
        ABANDONED = "ABANDONED", "Abandoned"

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quiz_attempts",
    )

    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="attempts",
    )

    attempt_number = models.PositiveIntegerField(
        default=1,
    )

    score = models.PositiveIntegerField(
        default=0,
    )

    percentage = models.PositiveIntegerField(
        default=0,
    )

    passed = models.BooleanField(
        default=False,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.IN_PROGRESS,
    )

    warnings = models.PositiveIntegerField(
        default=0,
    )

    started_at = models.DateTimeField(
        auto_now_add=True,
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    class Meta:
        ordering = ["-started_at"]

    def __str__(self):
        return (
            f"{self.student.email} - "
            f"{self.quiz.title} - "
            f"Attempt {self.attempt_number}"
        )



class QuizAnswer(models.Model):
    attempt = models.ForeignKey(
        QuizAttempt,
        on_delete=models.CASCADE,
        related_name="answers",
    )

    question = models.ForeignKey(
        QuizQuestion,
        on_delete=models.CASCADE,
        related_name="attempt_answers",
    )

    selected_option = models.ForeignKey(
        QuizOption,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="selected_answers",
    )

    is_correct = models.BooleanField(
        default=False,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["attempt", "question"],
                name="unique_attempt_question",
            )
        ]

    def __str__(self):
        return (
            f"{self.attempt} - "
            f"Q{self.question.order}"
        )

class QuizSystemSettings(models.Model):
    resume_window_hours = models.PositiveIntegerField(
        default=24,
        help_text="Number of hours an unfinished quiz attempt can be resumed.",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Quiz System Settings"


class QuizAttemptOverride(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quiz_attempt_overrides",
    )

    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="attempt_overrides",
    )

    additional_attempts = models.PositiveIntegerField(
        default=1,
    )

    reason = models.TextField(
        blank=True,
    )

    granted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="granted_quiz_attempt_overrides",
    )

    granted_at = models.DateTimeField(
        auto_now_add=True,
    )

    expires_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "quiz"],
                name="unique_student_quiz_attempt_override",
            )
        ]

    def __str__(self):
        return (
            f"{self.student.email} - "
            f"{self.quiz.title} - "
            f"+{self.additional_attempts} attempts"
        )

class ProctoringSession(models.Model):
    """
    One proctoring session for one quiz attempt.

    V1 records permission/state and browser events only.
    Camera and microphone streams are not recorded.
    """

    attempt = models.OneToOneField(
        "QuizAttempt",
        on_delete=models.CASCADE,
        related_name="proctoring_session",
    )

    camera_granted = models.BooleanField(default=False)
    microphone_granted = models.BooleanField(default=False)
    fullscreen_started = models.BooleanField(default=False)

    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Proctoring - {self.attempt}"


class ProctoringEvent(models.Model):
    class EventType(models.TextChoices):
        TAB_SWITCH = "TAB_SWITCH", "Tab Switch"
        WINDOW_BLUR = "WINDOW_BLUR", "Window Blur"
        FULLSCREEN_EXIT = "FULLSCREEN_EXIT", "Fullscreen Exit"
        CAMERA_STOPPED = "CAMERA_STOPPED", "Camera Stopped"
        MICROPHONE_STOPPED = "MICROPHONE_STOPPED", "Microphone Stopped"
        CAMERA_PERMISSION_DENIED = (
            "CAMERA_PERMISSION_DENIED",
            "Camera Permission Denied",
        )
        MICROPHONE_PERMISSION_DENIED = (
            "MICROPHONE_PERMISSION_DENIED",
            "Microphone Permission Denied",
        )
        ASSESSMENT_STARTED = "ASSESSMENT_STARTED", "Assessment Started"
        ASSESSMENT_SUBMITTED = "ASSESSMENT_SUBMITTED", "Assessment Submitted"

    session = models.ForeignKey(
        ProctoringSession,
        on_delete=models.CASCADE,
        related_name="events",
    )

    event_type = models.CharField(
        max_length=40,
        choices=EventType.choices,
    )

    occurred_at = models.DateTimeField()

    duration_ms = models.PositiveIntegerField(default=0)

    metadata = models.JSONField(
        default=dict,
        blank=True,
    )

    class Meta:
        ordering = ["occurred_at"]

    def __str__(self):
        return f"{self.session} - {self.event_type}"
