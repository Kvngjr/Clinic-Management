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
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="patient")
  
class Staff(models.Model): 
  department = models.TextField()
  specialization = models.TextField()
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="staff")
  
class Consultation(models.Model): 
  brief = models.TextField()
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="consultations")
  staffs = models.ManyToManyField(Staff, related_name="consultations")