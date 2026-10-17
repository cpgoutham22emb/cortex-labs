from django.urls import path

from .views import (
    CareerPathDetailView,
    TrainingLandingView,
)

urlpatterns = [
    path("", TrainingLandingView.as_view(), name="training-landing"),
    path(
        "career-path/",
        CareerPathDetailView.as_view(),
        name="career-path-detail",
    ),
]