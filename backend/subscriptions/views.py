from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserRole

from .models import Subscription
from .permissions import IsAdmin
from .serializers import SubscriptionSerializer


class MySubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        responses=SubscriptionSerializer(many=True),
    )
    def get(self, request):
        subscriptions = Subscription.objects.filter(
            student=request.user
        )

        serializer = SubscriptionSerializer(
            subscriptions,
            many=True,
        )

        return Response(serializer.data)


class SubscriptionListCreateView(APIView):
    permission_classes = [IsAdmin]

    @extend_schema(
        responses=SubscriptionSerializer(many=True),
    )
    def get(self, request):
        subscriptions = Subscription.objects.all()

        serializer = SubscriptionSerializer(
            subscriptions,
            many=True,
        )

        return Response(serializer.data)

    @extend_schema(
        request=SubscriptionSerializer,
        responses={201: SubscriptionSerializer},
    )
    def post(self, request):
        serializer = SubscriptionSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        student_id = request.data.get("student")

        try:
            from accounts.models import CustomUser

            student = CustomUser.objects.get(
                id=student_id,
                role=UserRole.STUDENT,
            )
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "Student not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        subscription = serializer.save(
            student=student,
        )

        return Response(
            SubscriptionSerializer(subscription).data,
            status=status.HTTP_201_CREATED,
        )