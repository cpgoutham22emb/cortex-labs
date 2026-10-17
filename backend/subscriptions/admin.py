from django.contrib import admin

from .models import Subscription


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "plan",
        "start_date",
        "end_date",
        "status",
        "created_at",
    )

    list_filter = (
        "plan",
        "status",
    )

    search_fields = (
        "student__email",
    )