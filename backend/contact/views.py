from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle

from .models import Enquiry
from .serializers import EnquirySerializer


class ContactEnquiryThrottle(AnonRateThrottle):
    rate = "5/hour"


class EnquiryCreateView(generics.CreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [ContactEnquiryThrottle]