from rest_framework import serializers

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
    ProctoringSession,
    ProctoringEvent,
)


class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "thumbnail",
            "instructor",
            "instructor_name",
            "category",
            "level",
            "duration_hours",
            "price",
            "status",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "slug",
            "instructor",
            "instructor_name",
            "created_at",
            "updated_at",
        )

    def get_instructor_name(self, obj):
        return obj.instructor.get_full_name() or obj.instructor.email


class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson

        fields = (
            "id",
            "title",
            "description",
            "content",
            "video_url",
            "duration_minutes",
            "order",
            "is_published",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )


class CourseModuleSerializer(serializers.ModelSerializer):

    lessons = LessonSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = CourseModule

        fields = (
            "id",
            "course",
            "title",
            "description",
            "order",
            "lessons",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )


class CourseContentSerializer(serializers.ModelSerializer):

    modules = CourseModuleSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Course

        fields = (
            "id",
            "title",
            "slug",
            "description",
            "category",
            "level",
            "duration_hours",
            "modules",
        )

class LessonProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(
        source="lesson.title",
        read_only=True,
    )

    course_title = serializers.CharField(
        source="lesson.module.course.title",
        read_only=True,
    )

    class Meta:
        model = LessonProgress

        fields = (
            "id",
            "lesson",
            "lesson_title",
            "course_title",
            "progress",
            "completed",
            "last_accessed",
        )

        read_only_fields = (
            "id",
            "lesson_title",
            "course_title",
            "last_accessed",
        )

class QuizOptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuizOption

        fields = (
            "id",
            "text",
            "order",
        )

        read_only_fields = (
            "id",
            "text",
            "order",
        )


class QuizQuestionSerializer(serializers.ModelSerializer):

    options = QuizOptionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = QuizQuestion

        fields = (
            "id",
            "question",
            "order",
            "marks",
            "options",
        )

        read_only_fields = (
            "id",
            "question",
            "order",
            "marks",
            "options",
        )


class QuizSerializer(serializers.ModelSerializer):

    questions = QuizQuestionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Quiz
        fields = (
            "id",
            "title",
            "description",
            "pass_percentage",
            "max_attempts",
            "proctoring_enabled",
            "require_fullscreen",
            "detect_tab_switch",
            "max_warnings",
            "questions",
        )

        read_only_fields = (
            "id",
            "title",
            "description",
            "pass_percentage",
            "max_attempts",
            "proctoring_enabled",
            "require_fullscreen",
            "detect_tab_switch",
            "max_warnings",
            "questions",
        )


class QuizStartProctoringSerializer(serializers.Serializer):
    camera_ready = serializers.BooleanField(default=False)
    microphone_ready = serializers.BooleanField(default=False)
    fullscreen_ready = serializers.BooleanField(default=False)


class QuizStartSerializer(serializers.Serializer):
    proctoring = QuizStartProctoringSerializer(required=False)


class QuizAnswerSubmissionSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    option_id = serializers.IntegerField()


class QuizSubmitSerializer(serializers.Serializer):
    answers = QuizAnswerSubmissionSerializer(many=True)


class QuizResultSerializer(serializers.Serializer):
    attempt_id = serializers.IntegerField()
    score = serializers.IntegerField()
    total_marks = serializers.IntegerField()
    percentage = serializers.IntegerField()
    pass_percentage = serializers.IntegerField()
    passed = serializers.BooleanField()
    status = serializers.CharField()
    completed_at = serializers.DateTimeField(allow_null=True)


class ProctoringSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProctoringSession
        fields = (
            "id",
            "attempt",
            "camera_granted",
            "microphone_granted",
            "fullscreen_started",
            "started_at",
            "ended_at",
        )
        read_only_fields = fields


class ProctoringEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProctoringEvent
        fields = (
            "id",
            "event_type",
            "occurred_at",
            "duration_ms",
            "metadata",
        )
        read_only_fields = ("id",)


class QuizAttemptSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuizAttempt
        fields = (
            "id",
            "quiz",
            "attempt_number",
            "status",
            "started_at",
        )

        read_only_fields = (
            "id",
            "attempt_number",
            "status",
            "started_at",
        )


class QuizAttemptHistorySerializer(serializers.Serializer):
    quiz_id = serializers.IntegerField()
    quiz_title = serializers.CharField()
    attempts = QuizAttemptSerializer(many=True)
    attempts_used = serializers.IntegerField()
    maximum_attempts = serializers.IntegerField()
    additional_attempts = serializers.IntegerField()
    effective_max_attempts = serializers.IntegerField()
    attempts_remaining = serializers.IntegerField()