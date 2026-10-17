from django.urls import path

from .views import (
    MySubscriptionView,
    SubscriptionListCreateView,
)


urlpatterns = [
    path(
        "my/",
        MySubscriptionView.as_view(),
        name="my-subscription",
    ),
    path(
        "",
        SubscriptionListCreateView.as_view(),
        name="subscription-list-create",
    ),
]