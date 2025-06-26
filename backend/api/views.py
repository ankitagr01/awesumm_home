from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.conf import settings
from supabase import create_client, Client
import json

# Create your views here.

# Initialize Supabase client
def get_supabase_client():
    """Get configured Supabase client"""
    supabase_url = settings.SUPABASE_URL
    supabase_key = settings.SUPABASE_KEY
    return create_client(supabase_url, supabase_key)



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
        supabase = get_supabase_client()
        
        # Sign in with Supabase Auth
        try:
            auth_response = supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
        except Exception as auth_error:
            # Check if it's an email confirmation issue
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
        
        if auth_response.user and auth_response.session:
            # Get user details from users table
            try:
                user_details = supabase.table('users').select('*').eq('id', auth_response.user.id).execute()
                user_data = user_details.data[0] if user_details.data else {}
            except Exception as e:
                # Log this in production with proper logging
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
        else:
            return Response({
                'error': 'Invalid credentials',
                'status': 'failed'
            }, status=401)
            
    except Exception as e:
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
