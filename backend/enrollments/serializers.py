from rest_framework import serializers

from courses.models import Course, CourseStatus

from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(
        source="course.title",
        read_only=True,
    )

    course_slug = serializers.CharField(
        source="course.slug",
        read_only=True,
    )

    student_email = serializers.CharField(
        source="student.email",
        read_only=True,
    )

    class Meta:
        model = Enrollment

        fields = (
            "id",
            "student",
            "student_email",
            "course",
            "course_title",
            "course_slug",
            "status",
            "progress",
            "enrolled_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "student",
            "student_email",
            "course_title",
            "course_slug",
            "status",
            "enrolled_at",
            "updated_at",
        )


class EnrollmentCreateSerializer(serializers.Serializer):
    course = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.filter(
            status=CourseStatus.PUBLISHED
        )
    )