from django.db.models import Prefetch
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Course, CourseStatus

from .models import (
    CareerPath,
    CareerProject,
    CareerProjectStep,
    CareerStage,
    CareerStageTopic,
    CareerSupportCategory,
    CareerSupportItem,
    TrainingLandingPage,
)
from .serializers import (
    CareerPathSerializer,
    SkillCourseSerializer,
    TrainingLandingPageSerializer,
)


class TrainingLandingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        landing_page = (
            TrainingLandingPage.objects
            .filter(is_published=True)
            .first()
        )

        career_path = (
            CareerPath.objects
            .filter(
                is_published=True,
                course__status=CourseStatus.PUBLISHED,
            )
            .select_related("course")
            .first()
        )

        skill_courses = (
            Course.objects
            .filter(status=CourseStatus.PUBLISHED)
            .exclude(
                career_path__isnull=False,
            )
            .order_by("id")
        )

        return Response(
            {
                "landing_page": (
                    TrainingLandingPageSerializer(landing_page).data
                    if landing_page
                    else None
                ),
                "career_path": (
                    CareerPathSerializer(career_path).data
                    if career_path
                    else None
                ),
                "skill_courses": SkillCourseSerializer(
                    skill_courses,
                    many=True,
                ).data,
            }
        )


class CareerPathDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        career_path = (
            CareerPath.objects
            .filter(
                is_published=True,
                course__status=CourseStatus.PUBLISHED,
            )
            .select_related("course")
            .prefetch_related(
                Prefetch(
                    "stages",
                    queryset=(
                        CareerStage.objects
                        .order_by("order")
                        .prefetch_related(
                            Prefetch(
                                "topics",
                                queryset=CareerStageTopic.objects.order_by(
                                    "order"
                                ),
                            )
                        )
                    ),
                ),
                Prefetch(
                    "projects",
                    queryset=(
                        CareerProject.objects
                        .order_by("order")
                        .prefetch_related(
                            Prefetch(
                                "steps",
                                queryset=CareerProjectStep.objects.order_by(
                                    "order"
                                ),
                            )
                        )
                    ),
                ),
                Prefetch(
                    "support_categories",
                    queryset=(
                        CareerSupportCategory.objects
                        .order_by("order")
                        .prefetch_related(
                            Prefetch(
                                "items",
                                queryset=CareerSupportItem.objects.order_by(
                                    "order"
                                ),
                            )
                        )
                    ),
                ),
            )
            .first()
        )

        if not career_path:
            return Response(
                {
                    "detail": "Career Path is not available."
                },
                status=404,
            )

        return Response(
            CareerPathSerializer(career_path).data
        )