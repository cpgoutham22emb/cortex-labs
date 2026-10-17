from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserRole

from .models import Enrollment
from .serializers import (
    EnrollmentCreateSerializer,
    EnrollmentSerializer,
)


class EnrollmentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=EnrollmentSerializer(many=True),
    )
    def get(self, request):

        if request.user.role == UserRole.ADMIN:
            enrollments = Enrollment.objects.all()

        elif request.user.role == UserRole.INSTRUCTOR:
            enrollments = Enrollment.objects.filter(
                course__instructor=request.user
            )

        else:
            enrollments = Enrollment.objects.filter(
                student=request.user
            )

        enrollments = enrollments.select_related(
            "student",
            "course",
        )

        serializer = EnrollmentSerializer(
            enrollments,
            many=True,
        )

        return Response(serializer.data)

    @extend_schema(
        request=EnrollmentCreateSerializer,
        responses={201: EnrollmentSerializer},
    )
    def post(self, request):
        if request.user.role != UserRole.STUDENT:
            return Response(
                {
                    "detail": "Only students can enroll in courses."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EnrollmentCreateSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        course = serializer.validated_data["course"]

        if course.price > 0:
            return Response(
                {
                    "detail": "Payment is required before enrolling in this course."
                },
                status=status.HTTP_402_PAYMENT_REQUIRED,
            )

        if Enrollment.objects.filter(
            student=request.user,
            course=course,
        ).exists():
            return Response(
                {
                    "detail": "You are already enrolled in this course."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        enrollment = Enrollment.objects.create(
            student=request.user,
            course=course,
        )

        return Response(
            EnrollmentSerializer(enrollment).data,
            status=status.HTTP_201_CREATED,
        )


class EnrollmentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, pk):
        try:
            return Enrollment.objects.select_related(
                "course",
                "student",
            ).get(
                pk=pk,
                student=request.user,
            )
        except Enrollment.DoesNotExist:
            return None

    @extend_schema(
        responses=EnrollmentSerializer,
    )
    def get(self, request, pk):
        enrollment = self.get_object(
            request,
            pk,
        )

        if enrollment is None:
            return Response(
                {"detail": "Enrollment not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            EnrollmentSerializer(enrollment).data
        )

    @extend_schema(
        request=EnrollmentSerializer,
        responses=EnrollmentSerializer,
    )
    def patch(self, request, pk):
        enrollment = self.get_object(
            request,
            pk,
        )

        if enrollment is None:
            return Response(
                {"detail": "Enrollment not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = EnrollmentSerializer(
            enrollment,
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