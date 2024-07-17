# serializers.py
from rest_framework import serializers
from .models import CustomUser, Patient, Staff, Consultation, Ticket
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)

  def create(self, validated_data): 
    # create user
    validated_data["is_active"] = True
    validated_data["password"] = make_password(validated_data["password"])
    user = super().create(validated_data)
    
    initial_data = self.initial_data
    initial_data["user"] = user.id
    
    user_type = self.initial_data.get("type")
    
    if user_type == "patient":
      patient_serializer = CreatePatientSerializer(data=initial_data)
      if patient_serializer.is_valid(raise_exception=True): 
        patient = patient_serializer.save()
    else: 
      staff_serializer = CreateStaffSerializer(data=initial_data)
      if staff_serializer.is_valid(raise_exception=True): 
        staff = staff_serializer.save()
    
    return user
    
  class Meta:
    model = CustomUser
    fields = ['date_joined','email','first_name','groups','id','is_active','is_staff',
    'is_superuser','last_login','last_name','passport','type','user_permissions',
    'username','patient', 'staff', 'password']
    read_only_fields = ["patient", "staff"]

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        # Field-level validation
        if not attrs.get('username'):
            raise serializers.ValidationError('Username is required.')
        if not attrs.get('password'):
            raise serializers.ValidationError('Password is required.')
        return attrs

class CustomTokenSerializer(serializers.Serializer):
  token = serializers.CharField(source='key')
  user = UserSerializer()
  
class PatientSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta: 
    model = Patient
    fields = "__all__"
    
class StaffSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  class Meta: 
    model = Staff
    fields = "__all__"
    
class ConsultationSerializer(serializers.ModelSerializer):
  staffs = StaffSerializer(many=True, read_only=True)
  patient = PatientSerializer(read_only=True)
  class Meta: 
    model = Consultation
    fields = "__all__"

class CreateConsultationSerializer(serializers.ModelSerializer):  
  class Meta: 
    model = Consultation
    fields = "__all__"
    
class TicketSerializer(serializers.ModelSerializer):
  patient = PatientSerializer(read_only=True)
  assigned_to = StaffSerializer(read_only=True)
  class Meta: 
    model = Ticket
    fields = "__all__"
    
class CreateTicketSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Ticket
    fields = "__all__"
    
class CreatePatientSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Patient
    fields = "__all__"
    
class CreateStaffSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Staff
    fields = "__all__"