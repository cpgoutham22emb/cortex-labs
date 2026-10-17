from drf_spectacular.utils import extend_schema

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer, UserSerializer


REFRESH_COOKIE_NAME = "cortex_refresh"


def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=str(refresh_token),
        httponly=True,
        secure=False,  # Development only. Use True in production with HTTPS.
        samesite="Lax",
        max_age=7 * 24 * 60 * 60,
        path="/api/auth/",
    )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenObtainPairSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        tokens = serializer.validated_data

        response = Response(
            {
                "access": tokens["access"],
            },
            status=status.HTTP_200_OK,
        )

        set_refresh_cookie(
            response,
            tokens["refresh"],
        )

        return response


class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get(
            REFRESH_COOKIE_NAME
        )

        if not refresh_token:
            return Response(
                {
                    "detail": "Refresh token cookie not found."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(
            data={
                "refresh": refresh_token,
            }
        )

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response(
                {
                    "detail": "Invalid or expired refresh token."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        tokens = serializer.validated_data

        response = Response(
            {
                "access": tokens["access"],
            },
            status=status.HTTP_200_OK,
        )

        # With refresh rotation enabled, SimpleJWT returns
        # a new refresh token. Replace the cookie.
        if "refresh" in tokens:
            set_refresh_cookie(
                response,
                tokens["refresh"],
            )

        return response


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(
            serializer.data
        )


@extend_schema(
    request=RegisterSerializer,
    responses=UserSerializer,
)
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        return Response(
            UserSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get(
            REFRESH_COOKIE_NAME
        )

        response = Response(
            {
                "detail": "Logout successful."
            },
            status=status.HTTP_205_RESET_CONTENT,
        )

        if refresh_token:
            try:
                token = RefreshToken(
                    refresh_token
                )
                token.blacklist()
            except Exception:
                pass

        response.delete_cookie(
            key=REFRESH_COOKIE_NAME,
            path="/api/auth/",
        )

        return response