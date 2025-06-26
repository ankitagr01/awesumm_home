# Employee Tracker - Development Plan

## 🎯 Project Overview
**App Name:** Employee Tracker  
**Architecture:** Backend-first with Django REST API + React frontend  
**Auth & Database:** Supabase  
**Approach:** Build core functionality first, polish UI later  

---

## ⚡ Quick Start (Get Basic Version Running)

### Immediate Next Steps (30 minutes setup):
1. [ ] **Backend Setup**
   - Create Django project + single `api` app
   - Install dependencies: `django`, `djangorestframework`, `python-dotenv`, `django-cors-headers`, `supabase`
   - Basic settings configuration

2. [ ] **Frontend Setup**
   - Create React app with `create-react-app`
   - Install `react-router-dom` and `axios`
   - Basic folder structure

3. [ ] **First API Endpoint**
   - Create simple `GET /api/hello/` endpoint
   - Test React can call Django API
   - Verify CORS working

4. [ ] **Supabase Connection**
   - Connect to Supabase (basic test)
   - Create one simple endpoint using Supabase data

**Goal:** Have a working Django API + React frontend communicating within 30-60 minutes!

---

## 📁 Simplified Project Structure

```
awesumm_home/
├── backend/                 # Django REST API
│   ├── employee_tracker/    # Main Django project
│   ├── api/                # Single Django app for all features
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── frontend/              # React app
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/        # Page components
    │   └── services/     # API calls
    └── package.json      # Node dependencies
```

---

## 🚀 Phase 1: Project Initialization (Simplified)

### Backend Setup
- [ ] Create Django project structure
- [ ] Set up virtual environment
- [ ] Install Django + Django REST Framework + python-dotenv + django-cors-headers
- [ ] Configure settings.py with CORS and environment variables
- [ ] Create single Django app: `api` (handles all features)
- [ ] Set up basic URL routing

### Frontend Setup  
- [ ] Create React app with create-react-app
- [ ] Install React Router DOM and Axios
- [ ] Set up basic folder structure (components, pages, services)
- [ ] Configure proxy for API calls in package.json
- [ ] Create basic routing setup

### Environment Configuration
- [ ] Set up .env files for both backend and frontend
- [ ] Configure Supabase connection variables
- [ ] Set up CORS settings for development

---

## 🔐 Phase 2: Supabase Integration (Backend-Controlled)

### Supabase Setup
- [ ] Create Supabase project
- [ ] Set up authentication with email/password
- [ ] Create profiles table (schema to be provided later)
- [ ] Configure RLS (Row Level Security) policies
- [ ] Get API keys and database URL

### Backend Integration
- [ ] Install supabase-py client
- [ ] Create Supabase service class for database operations
- [ ] Set up authentication middleware
- [ ] Create utility functions for Supabase API calls

---

## 🔑 Phase 3: Authentication API (Django)

### Backend Auth Endpoints
- [ ] `POST /api/auth/login/` - Authenticate with Supabase
- [ ] `POST /api/auth/register/` - Register new user
- [ ] `POST /api/auth/logout/` - Logout user
- [ ] `GET /api/auth/me/` - Get current user info
- [ ] Create authentication decorators/middleware
- [ ] Handle JWT tokens from Supabase

### Authentication Flow
- [ ] Implement token validation
- [ ] Create user session management
- [ ] Handle authentication errors
- [ ] Set up authentication state management

---

## 👤 Phase 4: Profile API (Django)

### Profile Endpoints
- [ ] `GET /api/profiles/me/` - Get current user's profile
- [ ] `PUT /api/profiles/me/` - Update current user's profile  
- [ ] `GET /api/profiles/{user_id}/` - Get any user's profile (read-only)
- [ ] Integrate with Supabase profiles table
- [ ] Handle profile image uploads (if needed)

### Profile Management
- [ ] Create profile serializers
- [ ] Implement profile validation
- [ ] Handle profile not found cases
- [ ] Set up profile permissions

---

## 📊 Phase 5: Dashboard API (Django)

### Dashboard Endpoints
- [ ] `GET /api/dashboard/` - Get dashboard data with user status categories
- [ ] `GET /api/users/search/?q={query}` - Search users by name
- [ ] Create status categorization logic
- [ ] Implement efficient database queries

### Dashboard Data Structure
- [ ] Define user status categories
- [ ] Create response serializers for dashboard data
- [ ] Implement caching for performance
- [ ] Handle empty states

---

## 🎨 Phase 6: Frontend - Dashboard Implementation

### Dashboard Page
- [ ] Create Dashboard component (`/src/pages/Dashboard.js`)
- [ ] Implement API service for dashboard data (`/src/services/dashboardService.js`)
- [ ] Create user status sections with clickable user icons
- [ ] Implement navigation to profile pages on icon click
- [ ] Add loading states and error handling

### Dashboard Components
- [ ] UserStatusSection component
- [ ] UserIcon component (clickable)
- [ ] StatusGrid component
- [ ] SearchBar component

---

## 👥 Phase 7: Frontend - Profile Implementation

### Profile Page
- [ ] Create Profile component (`/src/pages/Profile.js`)
- [ ] Implement API service for profile operations (`/src/services/profileService.js`)
- [ ] Handle two modes: editable (own profile) vs read-only (other users)
- [ ] Create profile editing form
- [ ] Add save/cancel functionality

### Profile Components
- [ ] ProfileView component (read-only)
- [ ] ProfileEdit component (editable)
- [ ] ProfileForm component
- [ ] Avatar placeholder component

---

## 🛣️ Phase 8: React Router Setup

### Routing Configuration
- [ ] Set up React Router DOM
- [ ] Create route structure:
  - [ ] `/` - Dashboard (default)
  - [ ] `/profile` - Current user's profile (editable)
  - [ ] `/profile/:userId` - Other user's profile (read-only)
  - [ ] `/login` - Login page
  - [ ] `/register` - Registration page
- [ ] Implement protected routes
- [ ] Add navigation components

### Route Protection
- [ ] Create PrivateRoute component
- [ ] Implement authentication checks
- [ ] Handle unauthorized access
- [ ] Add redirect logic

---

## 🔧 Phase 9: API Integration & Services

### Frontend API Services
- [ ] Create base API service (`/src/services/apiService.js`)
- [ ] Implement authentication service (`/src/services/authService.js`)
- [ ] Create profile service (`/src/services/profileService.js`)
- [ ] Implement dashboard service (`/src/services/dashboardService.js`)
- [ ] Add error handling and request interceptors

### State Management
- [ ] Set up authentication context
- [ ] Create user context for profile data
- [ ] Implement loading states
- [ ] Add error boundary components

---

## 🧪 Phase 10: Testing & Integration

### Backend Testing
- [ ] Test all API endpoints with Postman/curl
- [ ] Verify Supabase integration
- [ ] Test authentication flow
- [ ] Validate data serialization
- [ ] Check error handling

### Frontend Testing
- [ ] Test routing navigation
- [ ] Verify API integration
- [ ] Test profile editing functionality
- [ ] Check dashboard user interactions
- [ ] Validate authentication flow

### Integration Testing
- [ ] Test complete user flow: register → login → dashboard → profile
- [ ] Verify cross-component navigation
- [ ] Test error scenarios
- [ ] Check responsive behavior (basic)

---

## 📋 Testing Checklist

### Authentication Flow
- [ ] User can register with email/password
- [ ] User can login with valid credentials
- [ ] Invalid credentials show appropriate errors
- [ ] User can logout successfully
- [ ] Protected routes redirect to login when not authenticated

### Profile Management
- [ ] User can view their own profile
- [ ] User can edit their own profile information
- [ ] Profile changes save successfully
- [ ] User can view other users' profiles (read-only)
- [ ] Profile page shows correct data

### Dashboard Functionality
- [ ] Dashboard loads and displays user status sections
- [ ] User icons are clickable and navigate to correct profiles
- [ ] Search functionality works correctly
- [ ] Dashboard data updates appropriately
- [ ] Loading states display properly

### Navigation & Routing
- [ ] All routes work correctly
- [ ] Navigation between pages functions properly
- [ ] URL parameters work (e.g., `/profile/:userId`)
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works for all routes

---

## 🎯 Success Criteria

- [ ] Complete backend API with all required endpoints
- [ ] Functional React frontend with all core features
- [ ] Successful Supabase integration for auth and data
- [ ] Smooth navigation between all pages
- [ ] Proper error handling throughout the application
- [ ] Code is organized and maintainable
- [ ] Basic functionality works without styling

---

## 🚧 Future Enhancements (Post-MVP)

- [ ] UI/UX improvements and styling
- [ ] Real-time updates
- [ ] Advanced search filters
- [ ] User roles and permissions
- [ ] File upload functionality
- [ ] Email notifications
- [ ] Mobile responsiveness optimization

---

## 📝 Notes

- **Backend-First Approach:** All business logic lives in Django
- **Frontend Role:** Data presentation and user interaction only
- **Placeholder Content:** Use placeholder avatars and sample data during development
- **Database Schema:** Will be provided separately for Supabase profiles table
- **No UI Libraries:** Keep it simple with basic HTML/CSS for now

---

**Total Estimated Development Time:** 2-3 weeks (depending on experience level)  
**Priority:** Focus on core functionality first, polish later 