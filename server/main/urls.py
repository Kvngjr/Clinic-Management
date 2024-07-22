from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from .views import (SignUpView, SignInView, PatientViewSet, StaffViewSet, UpdateProfileView,
ConsultationViewSet, TicketViewSet, CreateConsultationViewSet, CreateTicketViewSet)
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'patient', PatientViewSet, basename='patient')
router.register(r'staff', StaffViewSet, basename='staff')
router.register(r'consultation', ConsultationViewSet, basename='consultation')
router.register(r'create-consultation', CreateConsultationViewSet, basename='create-consultation')
router.register(r'ticket', TicketViewSet, basename='ticket')
router.register(r'create-ticket', CreateTicketViewSet, basename='create-ticket')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sign-up/', SignUpView.as_view(), name='Sign Up'),
    path('sign-in/', SignInView.as_view(), name='Sign In'), 
    path('update-profile/', UpdateProfileView.as_view(), name='update profile'), 
    path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
