from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "student",
        "course",
        "amount",
        "currency",
        "status",
        "gateway",
        "gateway_order_id",
        "gateway_payment_id",
        "created_at",
        "paid_at",
    )

    list_filter = (
        "status",
        "gateway",
        "created_at",
    )

    search_fields = (
        "student__email",
        "course__title",
        "gateway_order_id",
        "gateway_payment_id",
    )

    readonly_fields = (
        "gateway_order_id",
        "gateway_payment_id",
        "gateway_signature",
        "created_at",
        "updated_at",
        "paid_at",
    )

    ordering = ("-created_at",)