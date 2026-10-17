from django.contrib import admin

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


@admin.register(TrainingLandingPage)
class TrainingLandingPageAdmin(admin.ModelAdmin):
    list_display = (
        "hero_title",
        "is_published",
        "updated_at",
    )

    readonly_fields = (
        "updated_at",
    )


@admin.register(CareerPath)
class CareerPathAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "course",
        "regular_price",
        "founding_price",
        "founding_batch_active",
        "is_published",
        "updated_at",
    )

    list_filter = (
        "founding_batch_active",
        "is_published",
    )

    search_fields = (
        "title",
        "course__title",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


@admin.register(CareerStage)
class CareerStageAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title",
        "career_path",
    )

    list_filter = (
        "career_path",
    )

    search_fields = (
        "title",
        "career_path__title",
    )

    ordering = (
        "career_path",
        "order",
    )


@admin.register(CareerStageTopic)
class CareerStageTopicAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title",
        "stage",
    )

    list_filter = (
        "stage__career_path",
        "stage",
    )

    search_fields = (
        "title",
        "stage__title",
    )

    ordering = (
        "stage",
        "order",
    )


@admin.register(CareerProject)
class CareerProjectAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title",
        "career_path",
    )

    list_filter = (
        "career_path",
    )

    search_fields = (
        "title",
        "career_path__title",
    )

    ordering = (
        "career_path",
        "order",
    )


@admin.register(CareerProjectStep)
class CareerProjectStepAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title",
        "project",
    )

    list_filter = (
        "project__career_path",
        "project",
    )

    search_fields = (
        "title",
        "project__title",
    )

    ordering = (
        "project",
        "order",
    )


@admin.register(CareerSupportCategory)
class CareerSupportCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title",
        "career_path",
    )

    list_filter = (
        "career_path",
    )

    search_fields = (
        "title",
        "career_path__title",
    )

    ordering = (
        "career_path",
        "order",
    )


@admin.register(CareerSupportItem)
class CareerSupportItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "title",
        "category",
    )

    list_filter = (
        "category__career_path",
        "category",
    )

    search_fields = (
        "title",
        "category__title",
    )

    ordering = (
        "category",
        "order",
    )