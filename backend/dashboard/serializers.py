from rest_framework import serializers


class StudentDashboardSerializer(serializers.Serializer):
    student = serializers.DictField()
    subscription = serializers.DictField()
    courses = serializers.ListField()