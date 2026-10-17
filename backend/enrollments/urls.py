from django.urls import path

from .views import (
    EnrollmentDetailView,
    EnrollmentListCreateView,
)


urlpatterns = [
    path(
        "",
        EnrollmentListCreateView.as_view(),
        name="enrollment-list-create",
    ),
    path(
        "<int:pk>/",
        EnrollmentDetailView.as_view(),
        name="enrollment-detail",
    ),
]