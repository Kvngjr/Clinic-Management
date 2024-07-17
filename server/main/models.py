from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
  passport = models.ImageField(upload_to='passports/', blank=True, verbose_name="Passport (Photo)")
  type = models.TextField(choices=(("staff", "Staff"), ("patient", "Patient")), default="staff")
  phone_number = models.TextField()
  
  def __str__(self):
      return self.email
    
  class Meta:
    verbose_name = "User"
    verbose_name_plural = "Users"
    
class Patient(models.Model): 
  address = models.TextField(blank=True, verbose_name="Address")
  dob = models.DateField()
  gender = models.TextField(choices=(("male", "Male"), ("female", "Female")))
  medical_history = models.TextField()
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="patient", unique=True)
  
class Staff(models.Model): 
  department = models.TextField()
  specialization = models.TextField()
  role = models.TextField(choices=(("doctor", "Doctor"), ("nurse", "nurse")))
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="staff", unique=True)
  
class Consultation(models.Model): 
  brief = models.TextField()
  time = models.DateTimeField(auto_now_add=True)
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="consultations")
  staffs = models.ManyToManyField(Staff, related_name="consultations")
  
class Ticket(models.Model): 
  complaint = models.TextField()
  time = models.DateTimeField(auto_now_add=True)
  assigned_to = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="assigned_tickets", blank=True, null=True)
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="tickets")