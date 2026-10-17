from rest_framework.permissions import BasePermission

from accounts.models import UserRole


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == UserRole.ADMIN
        )


class IsAdminOrStudent(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role
            in (
                UserRole.ADMIN,
                UserRole.STUDENT,
            )
        )