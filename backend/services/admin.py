from django.contrib import admin

from .models import Service, ServiceFeature


class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "display_order",
        "is_published",
        "updated_at",
    )

    list_filter = (
        "is_published",
    )

    search_fields = (
        "title",
        "short_description",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",),
    }

    ordering = (
        "display_order",
        "id",
    )

    inlines = [
        ServiceFeatureInline,
    ]


@admin.register(ServiceFeature)
class ServiceFeatureAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "service",
        "display_order",
    )

    list_filter = (
        "service",
    )

    search_fields = (
        "title",
        "description",
    )

    ordering = (
        "service",
        "display_order",
        "id",
    )