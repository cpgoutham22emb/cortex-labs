from rest_framework import serializers

from courses.models import Course
from .models import (
    CareerPath,
    CareerProject,
    CareerProjectStep,
    CareerStage,
    CareerStageTopic,
    CareerSupportCategory,
    CareerSupportItem,
    TrainingLandingPage,
)


class TrainingLandingPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingLandingPage
        fields = [
            "hero_title",
            "hero_description",
            "career_path_section_title",
            "career_path_section_description",
            "career_path_cta_text",
            "skill_courses_section_title",
            "skill_courses_section_description",
            "skill_courses_cta_text",
        ]


class CareerStageTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerStageTopic
        fields = [
            "id",
            "title",
            "order",
        ]


class CareerStageSerializer(serializers.ModelSerializer):
    topics = CareerStageTopicSerializer(many=True, read_only=True)

    class Meta:
        model = CareerStage
        fields = [
            "id",
            "title",
            "description",
            "order",
            "topics",
        ]


class CareerProjectStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerProjectStep
        fields = [
            "id",
            "title",
            "order",
        ]


class CareerProjectSerializer(serializers.ModelSerializer):
    steps = CareerProjectStepSerializer(many=True, read_only=True)

    class Meta:
        model = CareerProject
        fields = [
            "id",
            "title",
            "description",
            "order",
            "steps",
        ]


class CareerSupportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerSupportItem
        fields = [
            "id",
            "title",
            "order",
        ]


class CareerSupportCategorySerializer(serializers.ModelSerializer):
    items = CareerSupportItemSerializer(many=True, read_only=True)

    class Meta:
        model = CareerSupportCategory
        fields = [
            "id",
            "title",
            "description",
            "order",
            "items",
        ]


class CareerPathSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(source="course.id", read_only=True)
    course_slug = serializers.CharField(source="course.slug", read_only=True)
    current_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    stages = CareerStageSerializer(many=True, read_only=True)
    projects = CareerProjectSerializer(many=True, read_only=True)
    support_categories = CareerSupportCategorySerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = CareerPath
        fields = [
            "id",
            "course_id",
            "course_slug",
            "title",
            "regular_price",
            "founding_price",
            "founding_batch_active",
            "current_price",
            "short_description",
            "badge_text",
            "cta_text",
            "stages",
            "projects",
            "support_categories",
        ]


class SkillCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "thumbnail",
            "category",
            "level",
            "duration_hours",
            "price",
        ]