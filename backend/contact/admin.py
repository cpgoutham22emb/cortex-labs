from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):

    list_display = (
        "full_name",
        "email",
        "company",
        "enquiry_type",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "enquiry_type",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "company",
        "subject",
        "message",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    list_per_page = 25

    fieldsets = (
        (
            "Contact Information",
            {
                "fields": (
                    "full_name",
                    "email",
                    "company",
                )
            },
        ),
        (
            "Enquiry Details",
            {
                "fields": (
                    "enquiry_type",
                    "subject",
                    "message",
                )
            },
        ),
        (
            "Enquiry Management",
            {
                "fields": (
                    "status",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )