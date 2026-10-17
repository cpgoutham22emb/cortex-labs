from django.urls import path

from .views import StudentDashboardView


urlpatterns = [
    path(
        "student/",
        StudentDashboardView.as_view(),
        name="student-dashboard",
    ),
]