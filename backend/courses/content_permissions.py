from rest_framework.permissions import BasePermission

from accounts.models import UserRole
from enrollments.models import Enrollment, EnrollmentStatus
from subscriptions.models import Subscription


class CanAccessCourseContent(BasePermission):

    message = "You do not have access to this course content."

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        # Admin always has access.
        if request.user.role == UserRole.ADMIN:
            return True

        # Instructor access is checked against course ownership
        # inside the view.
        if request.user.role == UserRole.INSTRUCTOR:
            return True

        # Students must have an active subscription
        # and an active enrollment.
        if request.user.role != UserRole.STUDENT:
            return False

        has_enrollment = Enrollment.objects.filter(
            student=request.user,
            course__slug=view.kwargs.get("slug"),
            status=EnrollmentStatus.ACTIVE,
        ).exists()

        if not has_enrollment:
            return False

        subscription = (
            Subscription.objects
            .filter(student=request.user)
            .order_by("-end_date")
            .first()
        )

        return (
            subscription is not None
            and subscription.is_active()
        )