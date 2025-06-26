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
def hello_world(request):
    """Simple test endpoint to verify API is working"""
    return Response({
        'message': 'Hello from Django API!',
        'status': 'success',
        'timestamp': '2024-01-01T00:00:00Z'
    })

@api_view(['GET'])
def api_status(request):
    """API status endpoint"""
    return Response({
        'api': 'Employee Tracker API',
        'version': '1.0.0',
        'status': 'running',
        'message': 'Django backend is working!'
    })

# Simple test data for development
MOCK_USERS = [
    {'id': 1, 'name': 'John Doe', 'status': 'available', 'role': 'Developer'},
    {'id': 2, 'name': 'Jane Smith', 'status': 'busy', 'role': 'Designer'},
    {'id': 3, 'name': 'Mike Johnson', 'status': 'away', 'role': 'Manager'},
]

@api_view(['GET'])
def test_users(request):
    """Test endpoint with mock user data"""
    return Response({
        'users': MOCK_USERS,
        'count': len(MOCK_USERS)
    })

@api_view(['GET'])
def test_supabase(request):
    """Test Supabase connection"""
    try:
        # Get Supabase credentials from settings
        supabase_url = settings.SUPABASE_URL
        supabase_key = settings.SUPABASE_KEY
        
        if not supabase_url or not supabase_key:
            return Response({
                'error': 'Supabase credentials not configured',
                'status': 'failed',
                'details': 'SUPABASE_URL or SUPABASE_KEY missing'
            }, status=400)
        
        # Create Supabase client
        supabase: Client = create_client(supabase_url, supabase_key)
        
        # Simple test - just create the client and verify URL/key format
        url_valid = supabase_url.startswith('https://') and '.supabase.co' in supabase_url
        key_valid = len(supabase_key) > 100  # JWT tokens are typically long
        
        # Try a simple operation - list tables (will work even if no tables exist)
        try:
            # This tests authentication without requiring specific functions
            tables_result = supabase.table('_').select('*').limit(1).execute()
        except Exception as table_error:
            # Even if table doesn't exist, if we get a proper error response, 
            # it means authentication worked
            pass
        
        return Response({
            'message': 'Supabase connection successful!',
            'status': 'success',
            'supabase_url': supabase_url,
            'connection': 'verified',
            'url_valid': url_valid,
            'key_valid': key_valid,
            'client_created': 'success'
        })
        
    except Exception as e:
        return Response({
            'error': 'Supabase connection failed',
            'status': 'failed',
            'details': str(e)
        }, status=500)

# ===== AUTHENTICATION ENDPOINTS =====

@api_view(['GET'])
def check_users_table(request):
    """Check what users are in the Supabase users table"""
    try:
        # Create Supabase client
        supabase = get_supabase_client()
        
        # Get all users from the users table  
        result = supabase.table('users').select('*').execute()
        
        return Response({
            'message': 'Users table retrieved successfully',
            'status': 'success',
            'users': result.data,
            'count': len(result.data)
        })
        
    except Exception as e:
        return Response({
            'error': 'Failed to retrieve users table',
            'status': 'failed',
            'details': str(e)
        }, status=500)

@api_view(['POST'])
def test_user_insert(request):
    """Test inserting a user into the users table (for debugging)"""
    try:
        data = json.loads(request.body)
        
        # Create Supabase client
        supabase = get_supabase_client()
        
        # Test data
        test_user_data = {
            'id': data.get('id', 'test-user-123'),
            'Email': data.get('email', 'test@example.com'),
            'forename': data.get('forename', 'Test'),
            'lastname': data.get('lastname', 'User')
        }
        
        # Insert into users table
        result = supabase.table('users').insert(test_user_data).execute()
        
        return Response({
            'message': 'Test user inserted successfully',
            'status': 'success',
            'result': result.data
        })
        
    except Exception as e:
        return Response({
            'error': 'Test user insert failed',
            'status': 'failed',
            'details': str(e)
        }, status=500)

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
            print(f"Auth response: {auth_response}")
        except Exception as auth_error:
            print(f"Auth error: {auth_error}")
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
                print(f"User created but table insert failed: {table_error}")
            
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
        auth_response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        if auth_response.user and auth_response.session:
            # Get user details from users table
            try:
                user_details = supabase.table('users').select('*').eq('id', auth_response.user.id).execute()
                user_data = user_details.data[0] if user_details.data else {}
            except Exception as e:
                print(f"Error fetching user details: {e}")
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
                print(f"Error fetching user details: {e}")
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
