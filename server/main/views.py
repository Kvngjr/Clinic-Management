from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import (UserSerializer, CustomTokenSerializer, LoginSerializer, CreateTicketSerializer,
ConsultationSerializer, PatientSerializer, StaffSerializer, TicketSerializer, CreateConsultationSerializer, CreatePatientSerializer)
from .permissions import IsOwnerOrIsAdminOrReadOnly
from .models import Patient, Staff, Consultation, Ticket
from rest_framework.authentication import TokenAuthentication

from django.contrib.auth import authenticate
from django.db.models import Q

class SignUpView(APIView):
  def post(self, request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid(raise_exception=True):
      user = user_serializer.save()
      token, created = Token.objects.get_or_create(user=user)
      serializer = CustomTokenSerializer(data={'token': token.key, 'user': UserSerializer(user).data})
      serializer.is_valid()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

class SignInView(APIView):
  permission_classes = [AllowAny]

  def post(self, request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user = authenticate(username=serializer.data['username'], password=serializer.data['password'])
      if user:
        token, created = Token.objects.get_or_create(user=user)
        serializer = CustomTokenSerializer(data={'token': token.key, 'user': UserSerializer(user).data})
        serializer.is_valid()
        return Response(serializer.data)
      else: 
        return Response("Wrong username or password", status=400)
      
class ConsultationViewSet(viewsets.ModelViewSet): 
  queryset = Consultation.objects.all()
  serializer_class = ConsultationSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user
    if (user.type == "patient"): 
      return user.patient.consultations.all()
    return super().get_queryset()
  
class PatientViewSet(viewsets.ModelViewSet): 
  queryset = Patient.objects.all()
  serializer_class = PatientSerializer
  permission_classes = [IsAuthenticated]
  
class StaffViewSet(viewsets.ModelViewSet): 
  queryset = Staff.objects.all()
  serializer_class = StaffSerializer
  permission_classes = [IsAuthenticated]
  
class TicketViewSet(viewsets.ModelViewSet):
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user
    if user.type == "patient": 
      print(user.patient.tickets.all())
      return user.patient.tickets.all()
    return super().get_queryset()
  
class CreateConsultationViewSet(viewsets.ModelViewSet): 
  queryset = Consultation.objects.all() 
  serializer_class = CreateConsultationSerializer
  permission_classes = [IsAuthenticated]
  
class CreateTicketViewSet(viewsets.ModelViewSet): 
  queryset = Ticket.objects.all() 
  serializer_class = CreateTicketSerializer
  permission_classes = [IsAuthenticated]
  
class CreatePatientViewSet(viewsets.ModelViewSet): 
  queryset = Patient.objects.all() 
  serializer_class = CreatePatientSerializer
  permission_classes = [IsAuthenticated]