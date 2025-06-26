from django.urls import path
from . import views

urlpatterns = [
    # Test endpoints
    path('hello/', views.hello_world, name='hello_world'),
    path('status/', views.api_status, name='api_status'),
    path('test-users/', views.test_users, name='test_users'),
    path('test-supabase/', views.test_supabase, name='test_supabase'),
    path('check-users/', views.check_users_table, name='check_users_table'),
    path('test-user-insert/', views.test_user_insert, name='test_user_insert'),
    
    # Authentication endpoints
    path('auth/signup/', views.signup, name='signup'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/me/', views.get_current_user, name='get_current_user'),
] 