from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'user-details', views.UserDetailsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('employees/', views.get_employees, name='get_employees'),
    path('employees/create/', views.create_employee, name='create_employee'),
    # Basic API endpoints
    path('status/', views.api_status, name='api_status'),
    
    # Authentication endpoints
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/me/', views.get_current_user, name='get_current_user'),
] 