from django.urls import path
from . import views

urlpatterns = [
    # Basic API endpoints
    path('status/', views.api_status, name='api_status'),
    
    # Authentication endpoints
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/me/', views.get_current_user, name='get_current_user'),
] 