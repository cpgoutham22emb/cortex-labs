from rest_framework import serializers

from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    student_email = serializers.CharField(
        source="student.email",
        read_only=True,
    )

    active = serializers.SerializerMethodField()

    class Meta:
        model = Subscription

        fields = (
            "id",
            "student",
            "student_email",
            "plan",
            "start_date",
            "end_date",
            "status",
            "active",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "student",
            "student_email",
            "status",
            "active",
            "created_at",
            "updated_at",
        )

    def get_active(self, obj):
        return obj.is_active()