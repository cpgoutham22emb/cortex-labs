from django.urls import path

from .views import (
    CourseContentView,
    CourseDetailView,
    CourseListCreateView,
    LessonProgressView,
    QuizView,
    QuizAttemptView,
    QuizSubmitView,
    ProctoringEventView,
)


urlpatterns = [
    path(
        "",
        CourseListCreateView.as_view(),
        name="course-list-create",
    ),
    path(
        "<slug:slug>/",
        CourseDetailView.as_view(),
        name="course-detail",
    ),
    path(
        "<slug:slug>/content/",
        CourseContentView.as_view(),
        name="course-content",
    ),
    path(
        "lessons/<int:lesson_id>/progress/",
        LessonProgressView.as_view(),
        name="lesson-progress",
    ),

    path(
        "<slug:slug>/quiz/",
        QuizView.as_view(),
        name="course-quiz",
    ),

    path(
        "quizzes/<int:quiz_id>/attempts/",
        QuizAttemptView.as_view(),
        name="quiz-attempt",
    ),

    path(
        "attempts/<int:attempt_id>/submit/",
        QuizSubmitView.as_view(),
        name="quiz-submit",
    ),

    path(
        "attempts/<int:attempt_id>/proctoring/events/",
        ProctoringEventView.as_view(),
        name="proctoring-event",
    ),
]