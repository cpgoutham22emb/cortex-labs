from drf_spectacular.utils import extend_schema
from .serializers import StudentDashboardSerializer
from django.db.models import Count, Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserRole
from courses.models import Course, LessonProgress
from enrollments.models import Enrollment, EnrollmentStatus
from subscriptions.models import Subscription


class StudentDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=StudentDashboardSerializer,
    )

    def get(self, request):

        if request.user.role != UserRole.STUDENT:
            return Response(
                {
                    "detail": "Student dashboard is available only to students."
                },
                status=403,
            )

        subscription = (
            Subscription.objects
            .filter(student=request.user)
            .order_by("-end_date")
            .first()
        )

        if subscription:
            subscription_data = {
                "plan": subscription.plan,
                "status": subscription.status,
                "active": subscription.is_active(),
                "start_date": subscription.start_date,
                "end_date": subscription.end_date,
            }
        else:
            subscription_data = {
                "plan": None,
                "status": None,
                "active": False,
                "start_date": None,
                "end_date": None,
            }

        enrollments = (
            Enrollment.objects
            .filter(
                student=request.user,
                status=EnrollmentStatus.ACTIVE,
            )
            .select_related("course")
            .prefetch_related(
                "course__modules__lessons"
            )
        )

        courses = []

        for enrollment in enrollments:

            course = enrollment.course

            lessons = [
                lesson
                for module in course.modules.all()
                for lesson in module.lessons.all()
                if lesson.is_published
            ]

            total_lessons = len(lessons)

            completed_lessons = LessonProgress.objects.filter(
                student=request.user,
                lesson__in=lessons,
                completed=True,
            ).count()

            if total_lessons:
                progress = round(
                    (completed_lessons / total_lessons) * 100
                )
            else:
                progress = 0

            last_progress = (
                LessonProgress.objects
                .filter(
                    student=request.user,
                    lesson__module__course=course,
                )
                .select_related("lesson")
                .order_by("-last_accessed")
                .first()
            )

            courses.append(
                {
                    "course_id": course.id,
                    "course_title": course.title,
                    "course_slug": course.slug,
                    "progress": progress,
                    "completed_lessons": completed_lessons,
                    "total_lessons": total_lessons,
                    "last_accessed_lesson": (
                        last_progress.lesson.title
                        if last_progress
                        else None
                    ),
                }
            )

        data = {
            "student": {
                "id": request.user.id,
                "email": request.user.email,
                "first_name": request.user.first_name,
                "last_name": request.user.last_name,
                "role": request.user.role,
            },
            "subscription": subscription_data,
            "courses": courses,
        }

        return Response(data)