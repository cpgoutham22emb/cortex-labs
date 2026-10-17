from django.db import transaction
from django.utils import timezone

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.response import Response
from rest_framework.views import APIView


from .models import (
    Course,
    CourseStatus,
    LessonProgress,
    Lesson,
    Quiz,
    QuizAttempt,
    QuizSystemSettings,
    QuizAttemptOverride,
    QuizAnswer,
    ProctoringSession,
    ProctoringEvent,
)

from .serializers import (
    CourseSerializer,
    LessonProgressSerializer,
    CourseContentSerializer,
    QuizSerializer,
    QuizAttemptSerializer,
    QuizAttemptHistorySerializer,
    QuizStartSerializer,
    QuizSubmitSerializer,
    QuizResultSerializer,
    ProctoringEventSerializer,
)
from .permissions import IsAdminOrInstructor
from .content_permissions import CanAccessCourseContent
from enrollments.models import Enrollment, EnrollmentStatus
from subscriptions.models import Subscription
from datetime import timedelta

class CourseListCreateView(APIView):

    def get_permissions(self):
        if self.request.method == "POST":
            return [
                IsAuthenticated(),
                IsAdminOrInstructor(),
            ]

        return [AllowAny()]

    @extend_schema(
        responses=CourseSerializer(many=True),
    )
    def get(self, request):
        courses = Course.objects.filter(
            status=CourseStatus.PUBLISHED
        ).exclude(
            career_path__isnull=False
        )

        serializer = CourseSerializer(
            courses,
            many=True,
        )

        return Response(serializer.data)

    @extend_schema(
        request=CourseSerializer,
        responses={201: CourseSerializer},
    )
    def post(self, request):
        serializer = CourseSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        course = serializer.save(
            instructor=request.user,
        )

        return Response(
            CourseSerializer(course).data,
            status=status.HTTP_201_CREATED,
        )


class CourseDetailView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]

        return [
            IsAuthenticated(),
            IsAdminOrInstructor(),
        ]

    def get_object(self, slug):
        return Course.objects.get(
            slug=slug,
        )

    @extend_schema(
        responses=CourseSerializer,
    )
    def get(self, request, slug):
        try:
            course = self.get_object(slug)
        except Course.DoesNotExist:
            return Response(
                {"detail": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            course.status != CourseStatus.PUBLISHED
            and request.user != course.instructor
            and request.user.role != "ADMIN"
        ):
            return Response(
                {"detail": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            CourseSerializer(course).data,
        )

    @extend_schema(
        request=CourseSerializer,
        responses=CourseSerializer,
    )
    def patch(self, request, slug):
        try:
            course = self.get_object(slug)
        except Course.DoesNotExist:
            return Response(
                {"detail": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            request.user.role != "ADMIN"
            and course.instructor != request.user
        ):
            return Response(
                {"detail": "You do not have permission to modify this course."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = CourseSerializer(
            course,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        serializer.save()

        return Response(
            serializer.data,
        )

    def delete(self, request, slug):
        try:
            course = self.get_object(slug)
        except Course.DoesNotExist:
            return Response(
                {"detail": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if (
            request.user.role != "ADMIN"
            and course.instructor != request.user
        ):
            return Response(
                {"detail": "You do not have permission to delete this course."},
                status=status.HTTP_403_FORBIDDEN,
            )

        course.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )

class CourseContentView(APIView):

    permission_classes = [CanAccessCourseContent]

    @extend_schema(
        responses=CourseContentSerializer,
    )
    def get(self, request, slug):

        try:
            course = Course.objects.prefetch_related(
                "modules__lessons"
            ).get(
                slug=slug,
            )

        except Course.DoesNotExist:
            return Response(
                {"detail": "Course not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Instructor can access only their own course.
        if request.user.role == "INSTRUCTOR":
            if course.instructor != request.user:
                return Response(
                    {
                        "detail": (
                            "You do not have access to "
                            "this course."
                        )
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        # Students are checked again here so that
        # the exact failure reason can be returned.
        if request.user.role == "STUDENT":

            enrollment_exists = Enrollment.objects.filter(
                student=request.user,
                course=course,
                status=EnrollmentStatus.ACTIVE,
            ).exists()

            if not enrollment_exists:
                return Response(
                    {
                        "detail": (
                            "You are not enrolled in this course."
                        )
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            subscription = (
                Subscription.objects
                .filter(student=request.user)
                .order_by("-end_date")
                .first()
            )

            if (
                subscription is None
                or not subscription.is_active()
            ):
                return Response(
                    {
                        "detail": (
                            "Your subscription is "
                            "inactive or expired."
                        )
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        serializer = CourseContentSerializer(course)

        return Response(serializer.data)



class QuizView(APIView):

    permission_classes = [
        CanAccessCourseContent
    ]

    @extend_schema(
        responses=QuizSerializer,
    )
    def get(self, request, slug):

        try:
            course = Course.objects.get(
                slug=slug
            )
        except Course.DoesNotExist:
            return Response(
                {
                    "detail": "Course not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        quiz = (
            Quiz.objects
            .filter(
                module__course=course,
                is_published=True,
            )
            .prefetch_related(
                "questions__options"
            )
            .order_by(
                "module__order"
            )
            .first()
        )

        if quiz is None:
            return Response(
                {
                    "detail": "No quiz available for this course."
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            QuizSerializer(quiz).data
        )

class QuizAttemptView(APIView):
    """
    Start a quiz attempt.

    For proctored quizzes the frontend must first establish:
    - camera permission/readiness
    - microphone permission/readiness
    - fullscreen readiness when required
    """

    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=QuizAttemptHistorySerializer,
    )
    def get(self, request, quiz_id):
        try:
            quiz = (
                Quiz.objects
                .select_related("module__course")
                .get(
                    id=quiz_id,
                    is_published=True,
                )
            )
        except Quiz.DoesNotExist:
            return Response(
                {"detail": "Quiz not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if request.user.role == "STUDENT":
            enrollment_exists = Enrollment.objects.filter(
                student=request.user,
                course=quiz.module.course,
                status=EnrollmentStatus.ACTIVE,
            ).exists()

            if not enrollment_exists:
                return Response(
                    {"detail": "You are not enrolled in this course."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            subscription = (
                Subscription.objects
                .filter(student=request.user)
                .order_by("-end_date")
                .first()
            )

            if subscription is None or not subscription.is_active():
                return Response(
                    {"detail": "Your subscription is inactive or expired."},
                    status=status.HTTP_403_FORBIDDEN,
                )

        attempts = (
            QuizAttempt.objects
            .filter(
                student=request.user,
                quiz=quiz,
            )
            .order_by("-attempt_number")
        )

        completed_attempts = attempts.filter(
            status__in=[
                QuizAttempt.Status.PASSED,
                QuizAttempt.Status.FAILED,
                QuizAttempt.Status.INVALID,
            ]
        ).count()

        attempt_override = QuizAttemptOverride.objects.filter(
            student=request.user,
            quiz=quiz,
        ).first()

        additional_attempts = 0

        if attempt_override:
            if (
                attempt_override.expires_at is None
                or attempt_override.expires_at >= timezone.now()
            ):
                additional_attempts = attempt_override.additional_attempts

        effective_max_attempts = (
            quiz.max_attempts + additional_attempts
        )

        attempts_remaining = max(
            effective_max_attempts - completed_attempts,
            0,
        )

        return Response(
            {
                "quiz_id": quiz.id,
                "quiz_title": quiz.title,
                "attempts": QuizAttemptSerializer(
                    attempts,
                    many=True,
                ).data,
                "attempts_used": completed_attempts,
                "maximum_attempts": quiz.max_attempts,
                "additional_attempts": additional_attempts,
                "effective_max_attempts": effective_max_attempts,
                "attempts_remaining": attempts_remaining,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        request=QuizStartSerializer,
        responses={201: QuizAttemptSerializer},
    )
    def post(self, request, quiz_id):

        try:
            quiz = (
                Quiz.objects
                .select_related("module__course")
                .get(
                    id=quiz_id,
                    is_published=True,
                )
            )
        except Quiz.DoesNotExist:
            return Response(
                {"detail": "Quiz not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if request.user.role == "STUDENT":

            enrollment_exists = Enrollment.objects.filter(
                student=request.user,
                course=quiz.module.course,
                status=EnrollmentStatus.ACTIVE,
            ).exists()

            if not enrollment_exists:
                return Response(
                    {"detail": "You are not enrolled in this course."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            subscription = (
                Subscription.objects
                .filter(student=request.user)
                .order_by("-end_date")
                .first()
            )

            if subscription is None or not subscription.is_active():
                return Response(
                    {"detail": "Your subscription is inactive or expired."},
                    status=status.HTTP_403_FORBIDDEN,
                )

        completed_attempts = QuizAttempt.objects.filter(
            student=request.user,
            quiz=quiz,
            status__in=[
                QuizAttempt.Status.PASSED,
                QuizAttempt.Status.FAILED,
                QuizAttempt.Status.INVALID,
            ],
        ).count()

        attempt_override = QuizAttemptOverride.objects.filter(
            student=request.user,
            quiz=quiz,
        ).first()

        additional_attempts = 0

        if attempt_override:
            if (
                attempt_override.expires_at is None
                or attempt_override.expires_at >= timezone.now()
            ):
                additional_attempts = attempt_override.additional_attempts

        effective_max_attempts = (
            quiz.max_attempts + additional_attempts
        )

        # ---------------------------------------------------------
        # 1. Resume an existing unfinished attempt
        # ---------------------------------------------------------
        existing_attempt = (
            QuizAttempt.objects
            .filter(
                student=request.user,
                quiz=quiz,
                status=QuizAttempt.Status.IN_PROGRESS,
            )
            .order_by("-started_at")
            .first()
        )

        if existing_attempt:
            system_settings = QuizSystemSettings.get_settings()

            resume_deadline = (
                existing_attempt.started_at
                + timedelta(hours=system_settings.resume_window_hours)
            )

            if timezone.now() <= resume_deadline:
                attempt_data = QuizAttemptSerializer(existing_attempt).data

                attempt_data.update(
                    {
                        "attempts_used": completed_attempts,
                        "maximum_attempts": quiz.max_attempts,
                        "additional_attempts": additional_attempts,
                        "effective_max_attempts": effective_max_attempts,
                        "attempts_remaining": (
                            effective_max_attempts - completed_attempts
                        ),
                    }
                )

                return Response(
                    attempt_data,
                    status=status.HTTP_200_OK,
                )

            # Resume window expired
            existing_attempt.status = QuizAttempt.Status.ABANDONED
            existing_attempt.completed_at = timezone.now()
            existing_attempt.save(
                update_fields=["status", "completed_at"]
            )

            # End the proctoring session if one exists
            ProctoringSession.objects.filter(
                attempt=existing_attempt,
                ended_at__isnull=True,
            ).update(
                ended_at=timezone.now()
            )


        # ---------------------------------------------------------
        # 5. Check whether another attempt is available
        # ---------------------------------------------------------
        if completed_attempts >= effective_max_attempts:
            return Response(
                {
                    "detail": (
                        "Maximum quiz attempts reached. "
                        "Please contact administrator if you "
                        "require an additional attempt."
                    ),
                    "attempts_used": completed_attempts,
                    "maximum_attempts": quiz.max_attempts,
                    "additional_attempts": additional_attempts,
                    "effective_max_attempts": effective_max_attempts,
                    "attempts_remaining": 0,
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = QuizStartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        proctoring_data = serializer.validated_data.get("proctoring", {})

        if quiz.proctoring_enabled:
            if not proctoring_data.get("camera_ready", False):
                return Response(
                    {"detail": "Camera permission is required for this assessment."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not proctoring_data.get("microphone_ready", False):
                return Response(
                    {"detail": "Microphone permission is required for this assessment."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if (
                quiz.require_fullscreen
                and not proctoring_data.get("fullscreen_ready", False)
            ):
                return Response(
                    {"detail": "Fullscreen mode is required for this assessment."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        attempt = QuizAttempt.objects.create(
            student=request.user,
            quiz=quiz,
                attempt_number=QuizAttempt.objects.filter(
                quiz=quiz,
                student=request.user,
            ).count() + 1,
            status=QuizAttempt.Status.IN_PROGRESS,
        )

        if quiz.proctoring_enabled:
            session = ProctoringSession.objects.create(
                attempt=attempt,
                camera_granted=True,
                microphone_granted=True,
                fullscreen_started=proctoring_data.get(
                    "fullscreen_ready",
                    False,
                ),
            )

            ProctoringEvent.objects.create(
                session=session,
                event_type=ProctoringEvent.EventType.ASSESSMENT_STARTED,
                occurred_at=timezone.now(),
            )

        attempt_data = QuizAttemptSerializer(attempt).data

        attempt_data.update(
            {
                "attempts_used": completed_attempts,
                "maximum_attempts": quiz.max_attempts,
                "additional_attempts": additional_attempts,
                "effective_max_attempts": effective_max_attempts,
                "attempts_remaining": (
                    effective_max_attempts - completed_attempts - 1
                ),
            }
        )

        return Response(
            attempt_data,
            status=status.HTTP_201_CREATED,
        )


class QuizSubmitView(APIView):
    """
    Submit and automatically evaluate an MCQ quiz attempt.
    """

    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=QuizSubmitSerializer,
        responses=QuizResultSerializer,
    )
    def post(self, request, attempt_id):

        serializer = QuizSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():

            try:
                attempt = (
                    QuizAttempt.objects
                    .select_for_update()
                    .select_related("quiz")
                    .get(
                        id=attempt_id,
                        student=request.user,
                    )
                )
            except QuizAttempt.DoesNotExist:
                return Response(
                    {"detail": "Quiz attempt not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            if attempt.status != QuizAttempt.Status.IN_PROGRESS:
                return Response(
                    {"detail": "This quiz attempt is no longer active."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            questions = list(
                attempt.quiz.questions.prefetch_related("options").all()
            )

            submitted_answers = serializer.validated_data["answers"]

            question_ids = {question.id for question in questions}
            submitted_question_ids = [
                answer["question_id"]
                for answer in submitted_answers
            ]

            if len(submitted_question_ids) != len(set(submitted_question_ids)):
                return Response(
                    {"detail": "Each question must be answered only once."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if set(submitted_question_ids) != question_ids:
                return Response(
                    {"detail": "All quiz questions must be answered."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            question_map = {question.id: question for question in questions}

            total_marks = sum(question.marks for question in questions)
            score = 0

            for submitted in submitted_answers:
                question = question_map.get(submitted["question_id"])

                if question is None:
                    return Response(
                        {"detail": "Invalid question submitted."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                try:
                    option = question.options.get(
                        id=submitted["option_id"]
                    )
                except question.options.model.DoesNotExist:
                    return Response(
                        {"detail": "Invalid option for the selected question."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                is_correct = option.is_correct

                if is_correct:
                    score += question.marks

                QuizAnswer.objects.create(
                    attempt=attempt,
                    question=question,
                    selected_option=option,
                    is_correct=is_correct,
                )

            percentage = (
                round((score / total_marks) * 100)
                if total_marks > 0
                else 0
            )

            passed = percentage >= attempt.quiz.pass_percentage

            attempt.score = score
            attempt.percentage = percentage
            attempt.passed = passed
            attempt.status = (
                QuizAttempt.Status.PASSED
                if passed
                else QuizAttempt.Status.FAILED
            )
            attempt.completed_at = timezone.now()
            attempt.save(
                update_fields=[
                    "score",
                    "percentage",
                    "passed",
                    "status",
                    "completed_at",
                ]
            )

            if attempt.quiz.proctoring_enabled:
                try:
                    session = attempt.proctoring_session
                except ProctoringSession.DoesNotExist:
                    session = None

                if session is not None:
                    ProctoringEvent.objects.create(
                        session=session,
                        event_type=(
                            ProctoringEvent.EventType.ASSESSMENT_SUBMITTED
                        ),
                        occurred_at=timezone.now(),
                    )

                    session.ended_at = timezone.now()
                    session.save(update_fields=["ended_at"])

        return Response(
            {
                "attempt_id": attempt.id,
                "score": attempt.score,
                "total_marks": total_marks,
                "percentage": attempt.percentage,
                "pass_percentage": attempt.quiz.pass_percentage,
                "passed": attempt.passed,
                "status": attempt.status,
                "completed_at": attempt.completed_at,
            },
            status=status.HTTP_200_OK,
        )


class ProctoringEventView(APIView):
    """
    Record browser/proctoring events.

    Events are logged for tutor review. V1 does not automatically
    declare cheating or invalidate the attempt.
    """

    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=ProctoringEventSerializer,
        responses=ProctoringEventSerializer,
    )
    def post(self, request, attempt_id):

        try:
            attempt = QuizAttempt.objects.select_related(
                "quiz"
            ).get(
                id=attempt_id,
                student=request.user,
            )
        except QuizAttempt.DoesNotExist:
            return Response(
                {"detail": "Quiz attempt not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not attempt.quiz.proctoring_enabled:
            return Response(
                {"detail": "Proctoring is not enabled for this quiz."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if attempt.status != QuizAttempt.Status.IN_PROGRESS:
            return Response(
                {"detail": "This quiz attempt is no longer active."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            session = attempt.proctoring_session
        except ProctoringSession.DoesNotExist:
            return Response(
                {"detail": "Proctoring session not found."},
                status=status.HTTP_409_CONFLICT,
            )

        serializer = ProctoringEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        event = serializer.save(session=session)

        warning_events = {
            ProctoringEvent.EventType.WINDOW_BLUR,
            ProctoringEvent.EventType.CAMERA_STOPPED,
            ProctoringEvent.EventType.MICROPHONE_STOPPED,
            ProctoringEvent.EventType.CAMERA_PERMISSION_DENIED,
            ProctoringEvent.EventType.MICROPHONE_PERMISSION_DENIED,
        }

        if attempt.quiz.detect_tab_switch:
            warning_events.add(ProctoringEvent.EventType.TAB_SWITCH)

        if attempt.quiz.require_fullscreen:
            warning_events.add(ProctoringEvent.EventType.FULLSCREEN_EXIT)

        if event.event_type in warning_events:
            attempt.warnings += 1
            attempt.save(update_fields=["warnings"])

        return Response(
            {
                "event": ProctoringEventSerializer(event).data,
                "warnings": attempt.warnings,
                "max_warnings": attempt.quiz.max_warnings,
                "review_required": (
                    attempt.warnings >= attempt.quiz.max_warnings
                ),
            },
            status=status.HTTP_201_CREATED,
        )


class LessonProgressView(APIView):

    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=LessonProgressSerializer,
    )
    def get(self, request, lesson_id):

        try:
            lesson = Lesson.objects.select_related(
                "module__course"
            ).get(
                id=lesson_id,
            )
        except Lesson.DoesNotExist:
            return Response(
                {"detail": "Lesson not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        progress, _ = LessonProgress.objects.get_or_create(
            student=request.user,
            lesson=lesson,
        )

        return Response(
            LessonProgressSerializer(progress).data
        )

    @extend_schema(
        request=LessonProgressSerializer,
        responses=LessonProgressSerializer,
    )
    def patch(self, request, lesson_id):

        try:
            lesson = Lesson.objects.select_related(
                "module__course"
            ).get(
                id=lesson_id,
            )
        except Lesson.DoesNotExist:
            return Response(
                {"detail": "Lesson not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        progress, _ = LessonProgress.objects.get_or_create(
            student=request.user,
            lesson=lesson,
        )

        serializer = LessonProgressSerializer(
            progress,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        serializer.save()

        return Response(
            serializer.data
        )