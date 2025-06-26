from django.db import models
import uuid

class User(models.Model):
    """Custom User model matching Supabase auth schema exactly"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True, db_column='Email')  # Match Supabase column name
    forename = models.CharField(max_length=255, null=True, blank=True)
    lastname = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.forename} {self.lastname}" if self.forename and self.lastname else self.email

    class Meta:
        db_table = 'users'  # Use the existing Supabase table name

class UserDetails(models.Model):
    """Detailed user information from CSV"""
    WORKLOAD_STATUS_CHOICES = [
        ('green', 'Green'),
        ('yellow', 'Yellow'),
        ('red', 'Red'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='details')
    role = models.CharField(max_length=200, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    profile_bio = models.TextField(blank=True, null=True)
    office_days = models.JSONField(default=list, blank=True)  # Store as JSON array
    workload_status = models.CharField(max_length=10, choices=WORKLOAD_STATUS_CHOICES, blank=True, null=True)
    today_location = models.CharField(max_length=100, blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    interests = models.TextField(blank=True, null=True)
    favorite_recipes = models.TextField(blank=True, null=True)
    recommendations = models.TextField(blank=True, null=True)
    days_with_company = models.IntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.forename} {self.user.lastname} - {self.role}"

    class Meta:
        db_table = 'user_details'  # Use Supabase table name
        verbose_name = "User Details"
        verbose_name_plural = "User Details"
