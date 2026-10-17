from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import (
    Course,
    CourseModule,
    Lesson,
    LessonProgress,
    Quiz,
    QuizQuestion,
    QuizOption,
    QuizAttempt,
    QuizAnswer,
    QuizSystemSettings,
    QuizAttemptOverride,
)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "level",
        "status",
        "instructor",
        "created_at",
    )

    list_filter = (
        "status",
        "level",
        "category",
    )

    search_fields = (
        "title",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }


@admin.register(CourseModule)
class CourseModuleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "course",
        "order",
        "created_at",
    )

    list_filter = (
        "course",
    )

    search_fields = (
        "title",
        "course__title",
    )

    ordering = (
        "course",
        "order",
    )


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "module",
        "order",
        "duration_minutes",
        "is_published",
    )

    list_filter = (
        "is_published",
        "module__course",
    )

    search_fields = (
        "title",
        "description",
        "module__title",
        "module__course__title",
    )

    ordering = (
        "module",
        "order",
    )


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "lesson",
        "progress",
        "completed",
        "last_accessed",
    )

    list_filter = (
        "completed",
    )

    search_fields = (
        "student__email",
        "lesson__title",
    )

    readonly_fields = (
        "last_accessed",
    )


class QuizQuestionInline(admin.TabularInline):
    model = QuizQuestion

    extra = 0

    fields = (
        "order",
        "question",
        "marks",
    )

    ordering = (
        "order",
    )

    show_change_link = True


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "module",
        "pass_percentage",
        "max_attempts",
        "is_published",
        "proctoring_enabled",
        "require_fullscreen",
        "detect_tab_switch",
        "max_warnings",
        "question_count",
        "created_at",
    )

    list_filter = (
        "is_published",
        "proctoring_enabled",
        "require_fullscreen",
        "detect_tab_switch",
        "module__course",
    )

    search_fields = (
        "title",
        "module__title",
        "module__course__title",
    )

    ordering = (
        "module__course",
        "module__order",
    )

    fieldsets = (
        (
            "Assessment",
            {
                "fields": (
                    "module",
                    "title",
                    "description",
                    "pass_percentage",
                    "max_attempts",
                    "is_published",
                )
            },
        ),
        (
            "Proctoring Configuration",
            {
                "fields": (
                    "proctoring_enabled",
                    "require_fullscreen",
                    "detect_tab_switch",
                    "max_warnings",
                ),
                "description": (
                    "Configure browser and device monitoring for this assessment. "
                    "Camera and microphone are required when proctoring is enabled."
                ),
            },
        ),
    )

    inlines = (
        QuizQuestionInline,
    )

    @admin.display(
        description="Questions"
    )
    def question_count(self, obj):
        return obj.questions.count()


@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "quiz",
        "order",
        "question",
        "marks",
    )

    list_filter = (
        "quiz",
    )

    search_fields = (
        "question",
        "quiz__title",
    )

    ordering = (
        "quiz",
        "order",
    )


@admin.register(QuizOption)
class QuizOptionAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "order",
        "text",
        "is_correct",
    )

    list_filter = (
        "is_correct",
    )

    search_fields = (
        "text",
        "question__question",
    )

    ordering = (
        "question",
        "order",
    )


@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "quiz",
        "attempt_number",
        "score",
        "percentage",
        "passed",
        "status",
        "warnings",
        "started_at",
        "completed_at",
    )

    list_filter = (
        "status",
        "passed",
        "quiz",
    )

    search_fields = (
        "student__email",
        "quiz__title",
    )

    readonly_fields = (
        "started_at",
        "completed_at",
    )


@admin.register(QuizAnswer)
class QuizAnswerAdmin(admin.ModelAdmin):
    list_display = (
        "attempt",
        "question",
        "selected_option",
        "is_correct",
    )

    list_filter = (
        "is_correct",
    )

    search_fields = (
        "attempt__student__email",
        "question__question",
    )

@admin.register(QuizSystemSettings)
class QuizSystemSettingsAdmin(admin.ModelAdmin):
    list_display = (
        "resume_window_hours",
        "updated_at",
    )

    readonly_fields = (
        "updated_at",
    )

    def has_add_permission(self, request):
        return not QuizSystemSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(QuizAttemptOverride)
class QuizAttemptOverrideAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "quiz",
        "additional_attempts",
        "granted_by",
        "granted_at",
        "expires_at",
    )

    list_filter = (
        "quiz",
    )

    search_fields = (
        "student__email",
        "quiz__title",
        "reason",
    )

    readonly_fields = (
        "granted_at",
        "granted_by",
    )

    def save_model(self, request, obj, form, change):
        if not change:
            obj.granted_by = request.user

        super().save_model(request, obj, form, change)