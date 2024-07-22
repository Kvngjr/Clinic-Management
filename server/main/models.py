from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
  passport = models.ImageField(upload_to='passports/', blank=True, verbose_name="Passport (Photo)")
  type = models.TextField(choices=(("staff", "Staff"), ("patient", "Patient")), default="staff")
  
  def __str__(self):
      return self.email

  class Meta:
    verbose_name = "User"
    verbose_name_plural = "Users"

class Patient(models.Model): 
  # First Form
  level = models.TextField(blank=True, null=True)
  gender = models.TextField(choices=(("male", "Male"), ("female", "Female")), blank=True, null=True)
  dob = models.DateField(blank=True, null=True)
  age = models.IntegerField(blank=True, null=True)
  faculty = models.TextField(blank=True, null=True)
  department = models.TextField(blank=True, null=True)
  phone_number = models.TextField(blank=True, null=True)
  address = models.TextField(blank=True, null=True)
  next_of_kin = models.TextField(blank=True, null=True)
  phone_number_of_next_of_kin = models.TextField(blank=True, null=True)
  address_of_next_of_kin = models.TextField(blank=True, null=True)
  
  # Second Form
  previous_operations = models.TextField(blank=True, null=True)
  previous_injuries = models.TextField(blank=True, null=True)
  small_pox = models.TextField(blank=True, null=True)
  triple_vaccine = models.TextField(blank=True, null=True)
  polio = models.TextField(blank=True, null=True)
  typhoid = models.TextField(blank=True, null=True)
  yellow_fever = models.TextField(blank=True, null=True)
  cholera = models.TextField(blank=True, null=True)
  any_others = models.TextField(blank=True, null=True)
  heart_disease = models.TextField(blank=True, null=True)
  kidney_disease = models.TextField(blank=True, null=True)
  high_blood_pressure = models.TextField(blank=True, null=True)
  diabetes = models.TextField(blank=True, null=True)
  nervous_ill_health = models.TextField(blank=True, null=True)
  mental_ill_health = models.TextField(blank=True, null=True)
  any_other_health_defect = models.TextField(blank=True, null=True)
  nervous_or_mental_ill_health_treatment = models.TextField(blank=True, null=True)
  
  # Completed by doctor
  height = models.TextField(blank=True, null=True)
  weight = models.TextField(blank=True, null=True)
  special_senses = models.TextField(blank=True, null=True)
  heart_size_and_position = models.TextField(blank=True, null=True)
  heart_sound = models.TextField(blank=True, null=True)
  bp = models.TextField(blank=True, null=True)
  pulse = models.TextField(blank=True, null=True)
  liver = models.TextField(blank=True, null=True)
  spleen = models.TextField(blank=True, null=True)
  hernia = models.TextField(blank=True, null=True) 
  hemorrhoid = models.TextField(blank=True, null=True)
  with_glasses = models.TextField(blank=True, null=True)
  without_glasses = models.TextField(blank=True, null=True)
  genito_urinary_system_kidneys = models.TextField(blank=True, null=True)
  hearing_left = models.TextField(blank=True, null=True)
  hearing_right = models.TextField(blank=True, null=True)
  eyes_ears_nose_sinuses  = models.TextField(blank=True, null=True)
  throat = models.TextField(blank=True, null=True)
  lymphatic_glands = models.TextField(blank=True, null=True)
  muscular_skeletal_system = models.TextField(blank=True, null=True)
  
  # Lab examinations
  blood_group = models.TextField(blank=True, null=True)
  genotype = models.TextField(blank=True, null=True)
  pcv = models.TextField(blank=True, null=True)
  chest_xray = models.TextField(blank=True, null=True)
  tuberculin_test = models.TextField(blank=True, null=True)
  hiv_aids = models.TextField(blank=True, null=True)
  hepatitis = models.TextField(blank=True, null=True)
  assessment_of_mental_health = models.TextField(blank=True, null=True)
  additional_observations = models.TextField(blank=True, null=True)
  
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="patient", unique=True)
  
class Staff(models.Model): 
  department = models.TextField()
  specialization = models.TextField()
  role = models.TextField(choices=(("doctor", "Doctor"), ("nurse", "nurse")))
  user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="staff", unique=True)
  
class Consultation(models.Model): 
  note = models.TextField(blank=True, null=True)
  medical_issue = models.TextField(blank=True, null=True)
  prescription = models.TextField(blank=True, null=True)
  time = models.DateTimeField(auto_now_add=True)
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="consultations")
  staffs = models.ManyToManyField(Staff, related_name="consultations")
  
class Ticket(models.Model): 
  complaint = models.TextField()
  time = models.DateTimeField(auto_now_add=True)
  assigned_to = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="assigned_tickets", blank=True, null=True)
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="tickets")