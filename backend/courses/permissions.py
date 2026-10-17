from rest_framework.permissions import BasePermission

from accounts.models import UserRole


class IsAdminOrInstructor(BasePermission):
    """
    Allows ADMIN and INSTRUCTOR users.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role
            in (
                UserRole.ADMIN,
                UserRole.INSTRUCTOR,
            )
        )


class IsAdmin(BasePermission):
    """
    Allows ADMIN users only.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == UserRole.ADMIN
        )