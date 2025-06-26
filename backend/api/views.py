from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.conf import settings
from supabase import create_client, Client
import json
from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import User, UserDetails
from rest_framework import serializers
from django.db import models
import os
from urllib.parse import urlparse
import socket

# Create your views here.

# Initialize Supabase client
def get_supabase_client() -> Client:
    """Get configured Supabase client"""
    try:
        # Get base URL (without any trailing slashes or auth paths)
        supabase_url = os.getenv('SUPABASE_URL', '').rstrip('/')
        if supabase_url.endswith('/auth/v1'):
            supabase_url = supabase_url[:-8]
        
        supabase_key = os.getenv('SUPABASE_API_KEY')
        if not supabase_url or not supabase_key:
            raise ValueError("SUPABASE_URL and SUPABASE_API_KEY must be set")
            
        # Create client with proper typing
        return create_client(supabase_url, supabase_key)
    except Exception as e:
        print(f"Debug - Error in get_supabase_client: {str(e)}")
        raise e



@api_view(['GET'])
def api_status(request):
    """API status endpoint"""
    return Response({
        'api': 'Employee Tracker API',
        'version': '1.0.0',
        'status': 'running',
        'message': 'Django backend is working!'
    })



# ===== AUTHENTICATION ENDPOINTS =====

@api_view(['POST'])
def signup(request):
    """Register a new user with Supabase Auth"""
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        forename = data.get('forename', '')
        lastname = data.get('lastname', '')
        
        if not email or not password:
            return Response({
                'error': 'Email and password are required',
                'status': 'failed'
            }, status=400)
        
        # Create Supabase client
        supabase = get_supabase_client()
        
        # Sign up with Supabase Auth
        try:
            auth_response = supabase.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": {
                        "forename": forename,
                        "lastname": lastname
                    }
                }
            })
        except Exception as auth_error:
            raise auth_error
        
        if auth_response.user:
            # Update the users table with additional info
            try:
                user_data = {
                    'id': auth_response.user.id,
                    'Email': email,  # Capital E to match your Supabase table schema
                    'forename': forename,
                    'lastname': lastname
                }
                
                # Insert into users table
                supabase.table('users').insert(user_data).execute()
                
            except Exception as table_error:
                # Auth user created but table insert failed
                pass  # Log this in production with proper logging
            
            return Response({
                'message': 'User created successfully',
                'status': 'success',
                'user': {
                    'id': auth_response.user.id,
                    'email': auth_response.user.email,
                    'forename': forename,
                    'lastname': lastname
                },
                'session': auth_response.session.access_token if auth_response.session else None
            })
        else:
            return Response({
                'error': 'Failed to create user',
                'status': 'failed'
            }, status=400)
            
    except Exception as e:
        return Response({
            'error': 'Signup failed',
            'status': 'failed',
            'details': str(e)
        }, status=500)

@api_view(['POST'])
def login(request):
    """Login user with Supabase Auth"""
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Email and password are required',
                'status': 'failed'
            }, status=400)
        
        # Create Supabase client
        try:
            supabase: Client = get_supabase_client()
        except Exception as e:
            return Response({
                'error': 'Authentication service unavailable',
                'status': 'failed',
                'details': str(e)
            }, status=503)
        
        # Sign in with Supabase Auth
        try:
            # Use the correct auth method from the SDK
            auth_response = supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            
            if not auth_response.user or not auth_response.session:
                return Response({
                    'error': 'Invalid credentials',
                    'status': 'failed'
                }, status=401)
            
            # Get user details from users table
            try:
                user_details = supabase.table('users').select('*').eq('id', auth_response.user.id).execute()
                user_data = user_details.data[0] if user_details.data else {}
            except Exception as e:
                print(f"Debug - Error fetching user details: {str(e)}")
                user_data = {}
            
            return Response({
                'message': 'Login successful',
                'status': 'success',
                'user': {
                    'id': auth_response.user.id,
                    'email': auth_response.user.email,
                    'forename': user_data.get('forename', ''),
                    'lastname': user_data.get('lastname', ''),
                    'created_at': user_data.get('created_at', '')
                },
                'session': {
                    'access_token': auth_response.session.access_token,
                    'refresh_token': auth_response.session.refresh_token,
                    'expires_at': auth_response.session.expires_at
                }
            })
            
        except Exception as auth_error:
            print(f"Debug - Auth error: {str(auth_error)}")
            if "Email not confirmed" in str(auth_error):
                return Response({
                    'error': 'Email not confirmed',
                    'status': 'failed',
                    'details': 'Please check your email and click the confirmation link before logging in.'
                }, status=400)
            else:
                return Response({
                    'error': 'Login failed',
                    'status': 'failed',
                    'details': str(auth_error)
                }, status=400)
            
    except Exception as e:
        print(f"Debug - General error: {str(e)}")
        return Response({
            'error': 'Login failed',
            'status': 'failed',
            'details': str(e)
        }, status=500)

@api_view(['POST'])
def logout(request):
    """Logout user from Supabase Auth"""
    try:
        # Get auth token from request headers
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({
                'error': 'Authorization token required',
                'status': 'failed'
            }, status=401)
        
        token = auth_header.split(' ')[1]
        
        # Create Supabase client
        supabase = get_supabase_client()
        
        # Set the session
        supabase.auth.set_session(token, token)  # Use token for both access and refresh
        
        # Sign out
        supabase.auth.sign_out()
        
        return Response({
            'message': 'Logout successful',
            'status': 'success'
        })
        
    except Exception as e:
        return Response({
            'error': 'Logout failed',
            'status': 'failed',
            'details': str(e)
        }, status=500)

@api_view(['GET'])
def get_current_user(request):
    """Get current user details"""
    try:
        # Get auth token from request headers
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({
                'error': 'Authorization token required',
                'status': 'failed'
            }, status=401)
        
        token = auth_header.split(' ')[1]
        
        # Create Supabase client
        supabase = get_supabase_client()
        
        # Set the session
        supabase.auth.set_session(token, token)
        
        # Get current user
        user_response = supabase.auth.get_user()
        
        if user_response.user:
            # Get user details from users table
            try:
                user_details = supabase.table('users').select('*').eq('id', user_response.user.id).execute()
                user_data = user_details.data[0] if user_details.data else {}
            except Exception as e:
                # Log this in production with proper logging
                user_data = {}
            
            return Response({
                'message': 'User retrieved successfully',
                'status': 'success',
                'user': {
                    'id': user_response.user.id,
                    'email': user_response.user.email,
                    'forename': user_data.get('forename', ''),
                    'lastname': user_data.get('lastname', ''),
                    'created_at': user_data.get('created_at', '')
                }
            })
        else:
            return Response({
                'error': 'User not found',
                'status': 'failed'
            }, status=404)
            
    except Exception as e:
        return Response({
            'error': 'Failed to get user',
            'status': 'failed',
            'details': str(e)
        }, status=500)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'profile_picture', 'created_at', 'updated_at']

class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserDetails
        fields = ['id', 'user', 'role', 'location', 'profile_bio', 'office_days', 
                 'workload_status', 'today_location', 'skills', 'interests', 
                 'favorite_recipes', 'recommendations', 'days_with_company', 
                 'created_at', 'updated_at']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['get'])
    def with_details(self, request):
        """Get all users with their details"""
        users = User.objects.select_related('details').all()
        data = []
        
        for user in users:
            user_data = UserSerializer(user).data
            try:
                user_data['details'] = UserDetailsSerializer(user.details).data
            except UserDetails.DoesNotExist:
                user_data['details'] = None
            data.append(user_data)
        
        return Response(data)

class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.select_related('user').all()
    serializer_class = UserDetailsSerializer
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get summary statistics"""
        total_users = UserDetails.objects.count()
        workload_counts = UserDetails.objects.values('workload_status').annotate(count=models.Count('workload_status'))
        
        return Response({
            'total_users': total_users,
            'workload_distribution': {item['workload_status']: item['count'] for item in workload_counts},
            'status': 'success'
        })

# Additional employee endpoints for compatibility
@api_view(['GET'])
def get_employees(request):
    """Get all employees with their details"""
    try:
        users = User.objects.prefetch_related('details').all()
        employees_data = []
        
        for user in users:
            employee = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'profile_picture': user.profile_picture,
                'created_at': user.created_at,
                'updated_at': user.updated_at,
            }
            
            # Add details if they exist
            if hasattr(user, 'details'):
                details = user.details
                employee.update({
                    'role': details.role,
                    'location': details.location,
                    'profile_bio': details.profile_bio,
                    'office_days': details.office_days,
                    'workload_status': details.workload_status,
                    'today_location': details.today_location,
                    'skills': details.skills,
                    'interests': details.interests,
                    'favorite_recipes': details.favorite_recipes,
                    'recommendations': details.recommendations,
                    'days_with_company': details.days_with_company,
                })
            
            employees_data.append(employee)
        
        return Response({
            'employees': employees_data,
            'count': len(employees_data),
            'status': 'success'
        })
        
    except Exception as e:
        return Response({
            'error': 'Failed to fetch employees',
            'details': str(e),
            'status': 'failed'
        }, status=500)


@api_view(['POST'])
def create_employee(request):
    """Create a new employee"""
    try:
        data = json.loads(request.body)
        
        # Required fields
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        
        if not email or not first_name or not last_name:
            return Response({
                'error': 'Email, first_name, and last_name are required',
                'status': 'failed'
            }, status=400)
        
        # Create username from first name and last name
        username = f"{first_name.lower()}{last_name[0].lower()}"
        
        # Make username unique
        original_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{original_username}{counter}"
            counter += 1
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=data.get('password', 'defaultpassword123'),
            profile_picture=data.get('profile_picture', '')
        )
        
        # Create user details if provided
        details_data = {
            'user': user,
            'role': data.get('role', ''),
            'location': data.get('location', ''),
            'profile_bio': data.get('profile_bio', ''),
            'office_days': data.get('office_days', []),
            'workload_status': data.get('workload_status', None),
            'today_location': data.get('today_location', ''),
            'skills': data.get('skills', ''),
            'interests': data.get('interests', ''),
            'favorite_recipes': data.get('favorite_recipes', ''),
            'recommendations': data.get('recommendations', ''),
            'days_with_company': data.get('days_with_company', None),
        }
        
        UserDetails.objects.create(**details_data)
        
        return Response({
            'message': 'Employee created successfully',
            'employee': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'username': user.username
            },
            'status': 'success'
        })
        
    except Exception as e:
        return Response({
            'error': 'Failed to create employee',
            'details': str(e),
            'status': 'failed'
        }, status=500)
