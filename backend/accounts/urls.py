from django.urls import path

from .views import (
    CurrentUserView,
    LoginView,
    LogoutView,
    RefreshView,
    RegisterView,
)

urlpatterns = [
    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),
    path(
        "refresh/",
        RefreshView.as_view(),
        name="refresh",
    ),

    path(
        "me/",
        CurrentUserView.as_view(),
        name="current_user",
    ),

    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),

]