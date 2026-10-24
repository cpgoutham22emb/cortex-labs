from rest_framework import serializers
from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):

    class Meta:
        model = Enquiry

        fields = [
            "id",
            "full_name",
            "email",
            "company",
            "enquiry_type",
            "subject",
            "message",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]

    def validate_full_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Full name is required."
            )

        return value

    def validate_subject(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Subject is required."
            )

        return value

    def validate_message(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Message is required."
            )

        return value

    def validate_company(self, value):
        return value.strip()