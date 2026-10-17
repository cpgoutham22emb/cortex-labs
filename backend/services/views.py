from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.filter(
            is_published=True
        ).prefetch_related("features")


class ServiceDetailView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ServiceSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Service.objects.filter(
            is_published=True
        ).prefetch_related("features")