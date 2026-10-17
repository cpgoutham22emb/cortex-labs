from rest_framework import serializers

from .models import Service, ServiceFeature


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = [
            "id",
            "title",
            "description",
            "display_order",
        ]


class ServiceSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "icon",
            "image",
            "display_order",
            "is_published",
            "features",
        ]