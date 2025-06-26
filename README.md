# Employee Tracker - Full Stack Web Application

A Django REST API backend with React frontend for tracking employee status and profiles.

## 🏗️ Project Structure

```
awesumm_home/
├── venv/                    # Python virtual environment (project root)
├── backend/                 # Django REST API
│   ├── employee_tracker/    # Main Django project
│   ├── api/                # Single Django app for all features
│   │   ├── models.py       # User and UserDetails models (Supabase-aligned)
│   │   ├── views.py        # API endpoints
│   │   └── migrations/     # Database migrations
│   ├── .env                # Environment variables (not in git)
│   ├── example.env         # Environment template
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management script
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page components
│   │   └── services/     # API service layer
│   ├── .env              # Frontend environment variables (not in git)
│   ├── example.env       # Frontend environment template
│   └── package.json      # Node.js dependencies
├── plan.md               # Development roadmap
├── features.md           # Feature tracking
├── user_details.csv      # Employee data source (used for initial population)
└── README.md            # This file
```

## 📊 Database Setup ✅ COMPLETE

### Database Configuration
- **Database System**: Supabase PostgreSQL (production-ready)
- **Local SQLite**: Removed (clean Supabase-only setup)
- **Tables**: 2 main tables with proper relationships
- **Data Population**: 16 users + 15 detailed profiles populated from CSV

### Database Schema
```sql
-- users table (matches Supabase Auth)
users:
  - id (UUID, primary key)
  - created_at (timestamp)
  - Email (text, matches Supabase capitalization)
  - forename (text)
  - lastname (text)

-- user_details table (extended profile information)
user_details:
  - id (UUID, primary key)
  - user_id (UUID, foreign key → users.id)
  - role (text) - e.g., "CEO & Co-Founder", "CTO", "Head of Sales"
  - location (text) - e.g., "Munich", "Remote"
  - profile_bio (text)
  - office_days (JSON array) - e.g., ["Monday", "Tuesday", "Wednesday"]
  - workload_status (enum) - "green", "yellow", "red"
  - today_location (text)
  - skills (text)
  - interests (text)
  - favorite_recipes (text)
  - recommendations (text)
  - days_with_company (integer)
  - created_at (timestamp, auto)
  - updated_at (timestamp, auto-updated via trigger)
```

### Data Population Status
- **16 Users** in `users` table with proper email format (firstname@summ-ai.com)
- **15 User Details** in `user_details` table with rich profile information
- **Sample Data Includes**:
  - Flora Geske (CEO & Co-Founder, Munich, 899 days with company)
  - Vanessa Theel (CRO & Co-Founder, Munich, yellow workload)
  - Nicholas Wolf (CTO & Co-Founder, Munich, red workload)
  - Various roles: Sales, Marketing, Operations, Development teams

### Django Model Alignment
- Custom `User` model matches exact Supabase schema (no Django auth conflicts)  
- `UserDetails` model with comprehensive profile fields
- Foreign key relationships properly configured
- Removed unnecessary Django admin/auth dependencies for clean setup

## ⚠️ Security First

**CRITICAL:** This project contains sensitive credentials and API keys. Please read [SECURITY.md](SECURITY.md) before proceeding.

### 🔒 Security Checklist
- [ ] Never commit `.env` files to version control
- [ ] Use `example.env` files as templates only
- [ ] Keep Supabase credentials secure
- [ ] Review `.gitignore` protection

## 🚀 Complete Setup Guide

### Prerequisites Installation

#### 1. Install Git

**macOS:**
```bash
# Option 1: Install Git using Homebrew (recommended)
# First install Homebrew if you don't have it:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Git:
brew install git

# Option 2: Download installer
# Visit: https://git-scm.com/download/mac
# Download and run the .dmg installer
```

**Windows:**
```bash
# Step 1: Download Git for Windows
# Visit: https://git-scm.com/download/win
# Download "64-bit Git for Windows Setup"

# Step 2: Run the installer with these recommended settings:
# ✅ Use Git from Git Bash only (or "Git from the command line")
# ✅ Use the OpenSSL library
# ✅ Checkout Windows-style, commit Unix-style line endings
# ✅ Use Windows' default console window
# ✅ Enable file system caching
# ✅ Enable Git Credential Manager

# Step 3: After installation, open "Git Bash" or Command Prompt
```

**Linux (Ubuntu/Debian):**
```bash
# Update package list
sudo apt update

# Install Git
sudo apt install git

# For CentOS/RHEL/Fedora:
# sudo yum install git  (older versions)
# sudo dnf install git  (newer versions)
```

#### 2. Install Python 3.9+

**macOS:**
```bash
# Option 1: Install Python using Homebrew (recommended)
brew install python@3.11

# Option 2: Download from official website
# Visit: https://www.python.org/downloads/
# Download "macOS 64-bit universal2 installer"
# Run the .pkg installer

# Verify installation:
python3 --version
pip3 --version
```

**Windows:**
```bash
# Step 1: Download Python for Windows
# Visit: https://www.python.org/downloads/
# Download "Windows installer (64-bit)" for Python 3.11+

# Step 2: Run installer with these CRITICAL settings:
# ✅ CHECK "Add Python to PATH" (VERY IMPORTANT!)
# ✅ CHECK "Install for all users" (recommended)
# ✅ Choose "Customize installation"
# ✅ CHECK "pip" (Python package installer)
# ✅ CHECK "py launcher" (for all users)
# ✅ CHECK "Add Python to environment variables"

# Step 3: Verify installation (open new Command Prompt):
python --version
pip --version

# Note: On Windows, use 'python' instead of 'python3'
```

**Linux (Ubuntu/Debian):**
```bash
# Update package list
sudo apt update

# Install Python 3 and essential tools
sudo apt install python3 python3-pip python3-venv python3-dev

# For CentOS/RHEL/Fedora:
# sudo yum install python3 python3-pip python3-venv
# or
# sudo dnf install python3 python3-pip python3-venv

# Verify installation:
python3 --version
pip3 --version
```

#### 3. Install Node.js 18+ (LTS)

**macOS:**
```bash
# Option 1: Download from official website (recommended)
# Visit: https://nodejs.org/
# Download "LTS" version (18.x or higher)
# Run the .pkg installer

# Option 2: Using Homebrew
brew install node

# Option 3: Using Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# Restart terminal, then:
nvm install --lts
nvm use --lts
```

**Windows:**
```bash
# Step 1: Download Node.js for Windows
# Visit: https://nodejs.org/
# Download "LTS" version (Windows Installer .msi)

# Step 2: Run the installer
# ✅ Accept license agreement
# ✅ Choose installation directory (default is fine)
# ✅ CHECK "Automatically install the necessary tools"
# ✅ This will also install npm (Node Package Manager)

# Step 3: Verify installation (open new Command Prompt):
node --version
npm --version

# Alternative: Using Chocolatey (if you have it)
# choco install nodejs
```

**Linux (Ubuntu/Debian):**
```bash
# Option 1: Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Option 2: Using snap
sudo snap install node --classic

# Option 3: Using Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# Restart terminal, then:
nvm install --lts
nvm use --lts

# Verify installation:
node --version
npm --version
```

#### 4. Verify All Installations

**macOS/Linux:**
```bash
# Check Git installation
git --version          # Should show: git version 2.x.x

# Check Python installation  
python3 --version      # Should show: Python 3.9+ (e.g., Python 3.11.x)
pip3 --version         # Should show: pip 22.x.x or higher

# Check Node.js installation
node --version         # Should show: v18.x.x or higher
npm --version          # Should show: 8.x.x or higher
```

**Windows:**
```cmd
# Check Git installation (in Command Prompt or Git Bash)
git --version          # Should show: git version 2.x.x

# Check Python installation (in Command Prompt)
python --version       # Should show: Python 3.9+ (e.g., Python 3.11.x)
pip --version          # Should show: pip 22.x.x or higher

# Check Node.js installation
node --version         # Should show: v18.x.x or higher  
npm --version          # Should show: 8.x.x or higher
```

#### 5. Install Code Editor (Optional but Recommended)

**Visual Studio Code:**
- Download from: https://code.visualstudio.com/
- Install recommended extensions:
  - Python
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - GitLens — Git supercharged

### 🏗️ Project Setup

#### 1. Clone Repository
```bash
# Clone the project
git clone <repository-url>
cd awesumm_home
```

#### 2. Backend Setup (Django)

**macOS/Linux:**
```bash
# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp example.env .env
# Edit .env file with your Supabase credentials (see Environment Configuration section)

# Run database migrations
python3 manage.py migrate

# Start Django development server
python3 manage.py runserver
```

**Windows (Command Prompt):**
```cmd
# Create Python virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
copy example.env .env
# Edit .env file with your Supabase credentials (see Environment Configuration section)

# Run database migrations
python manage.py migrate

# Start Django development server
python manage.py runserver
```

**Windows (PowerShell):**
```powershell
# Create Python virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\Activate.ps1

# If you get execution policy error, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
Copy-Item example.env .env
# Edit .env file with your Supabase credentials

# Run database migrations
python manage.py migrate

# Start Django development server
python manage.py runserver
```

**Django will run on: http://localhost:8000**

#### 3. Frontend Setup (React)
```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install Node.js dependencies
npm install

# Set up environment variables
cp example.env .env
# Edit .env file with your configuration

# Start React development server
npm start
```

**React will run on: http://localhost:3000**

### 🔧 Development Workflow

#### Running Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
# From project root
cd backend
source ../venv/bin/activate
python3 manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
# From project root  
cd frontend
npm start
```

#### Alternative: Using Full Python Path (if venv issues)
```bash
# If virtual environment activation issues occur:
cd backend
/path/to/your/project/venv/bin/python manage.py runserver

# Example:
/Users/username/awesumm_home/venv/bin/python manage.py runserver
```

## 🔧 Environment Configuration

### Backend (.env)
```bash
# Supabase Configuration (Production Database)
DATABASE_URL=postgresql://postgres.oyqjwgdfkkxwuseiohjj:your_encoded_password@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_API_KEY=your_supabase_api_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here

# Debug mode - set to true to enable debug outputs, false to disable
DEBUG_MODE=false

# Application Configuration
DOMAIN=localhost:8000
ENVIRONMENT=production  # Always use Supabase (no local SQLite)
```

### Frontend (.env)
```bash
# Local development settings
# In development, our Vite server will proxy /api requests to this URL
VITE_API_URL=http://localhost:8000

# supabase
VITE_SUPABASE_URL=https://project-id.supabase.co
VITE_SUPABASE_ANON_KEY=anon_key
```

## 🛠️ Development Workflow

### Running Both Servers

**Terminal 1 - Backend:**
```bash
# From project root
cd backend
source ../venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
# From project root
cd frontend
npm start
```

### Common Commands

**Backend:**
```bash
# Create new Django app
python manage.py startapp app_name

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Django shell
python manage.py shell
```

**Frontend:**
```bash
# Install new package
npm install package-name

# Build for production
npm run build

# Run tests
npm test
```

## 📡 API Endpoints

### Production Endpoints
- `GET /api/status/` - API status and health check

### Authentication ✅ COMPLETE
- `POST /api/auth/signup/` - User registration with Supabase
- `POST /api/auth/login/` - User authentication
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Current user information

### Profile Management (Next Phase)
- `GET /api/profiles/me/` - Get current user's profile
- `PUT /api/profiles/me/` - Update current user's profile
- `GET /api/profiles/{user_id}/` - Get any user's profile

### Dashboard (Next Phase)
- `GET /api/dashboard/` - Get dashboard data with user status categories
- `GET /api/users/search/?q={query}` - Search users by name

## 🧪 Testing the Setup

1. **Visit http://localhost:3000** - Should show the API test page
2. **Check browser console** - Should see API request/response logs
3. **Test API directly**: `curl http://localhost:8000/api/hello/`

If you see the test page with user data, everything is working! 🎉

## 📚 Tech Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API development
- **python-dotenv** - Environment variables
- **django-cors-headers** - CORS handling
- **supabase-py** - Supabase integration

### Frontend
- **React 18** - Frontend framework
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Modern ES6+** - JavaScript features

### Database & Auth
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database (via Supabase)
- **Supabase Auth** - Authentication

## 🐛 Troubleshooting Guide

### Environment Setup Issues

#### Virtual Environment Problems
**"ModuleNotFoundError: No module named 'django'":**
```bash
# Solution 1: Reinstall packages
source venv/bin/activate
pip install -r backend/requirements.txt

# Solution 2: Use full Python path
cd backend
/full/path/to/project/venv/bin/python manage.py runserver
```

**Virtual environment not activating properly:**
```bash
# Create new virtual environment
rm -rf venv
python3 -m venv venv
source venv/bin/activate
cd backend
pip install -r requirements.txt
```

#### Python/Node Installation Issues
**"python3: command not found":**
```bash
# macOS: Install Python via Homebrew
brew install python@3.11

# Linux: Install Python
sudo apt install python3 python3-pip python3-venv

# Verify installation
python3 --version
```

**"npm: command not found":**
```bash
# Install Node.js from https://nodejs.org/
# Or use nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

### Development Server Issues

**npm start fails with "package.json not found":**
```bash
# Make sure you're in the frontend directory
cd frontend
npm start
```

**Django server won't start:**
```bash
# Check virtual environment
source ../venv/bin/activate
cd backend

# Try with full path if activation fails
/path/to/project/venv/bin/python manage.py runserver

# Check if Django is installed
python3 -c "import django; print(django.VERSION)"
```

**Port already in use:**
```bash
# Kill processes on ports 3000 and 8000
sudo lsof -ti:3000 | xargs sudo kill -9
sudo lsof -ti:8000 | xargs sudo kill -9
```

### API and Database Issues

**API calls failing with CORS errors:**
```bash
# Verify Django server is running
curl http://localhost:8000/api/status/

# Check CORS settings in backend/employee_tracker/settings.py
# Ensure CORS_ALLOWED_ORIGINS includes "http://localhost:3000"
```

**Supabase connection errors:**
```bash
# Verify environment variables
cd backend
cat .env | grep SUPABASE

# Test Supabase connection
curl http://localhost:8000/api/test-supabase/
```

**Environment variables not loading:**
```bash
# Ensure .env files exist
ls -la backend/.env
ls -la frontend/.env

# Copy from examples if missing
cp backend/example.env backend/.env
cp frontend/example.env frontend/.env

# Restart servers after changing .env files
```

### Authentication Issues

**"Email not confirmed" after signup:**
- This is normal! Check your email for a confirmation link from Supabase
- Click the confirmation link before trying to login

**User created but can't login:**
- Ensure email verification is complete
- Check Supabase Auth settings for email confirmation requirements

### Quick Diagnostics

**Check all services are running:**
```bash
# Test Django API
curl http://localhost:8000/api/status/

# Test React frontend (should show React app)
curl -I http://localhost:3000

# Test Supabase connection
curl http://localhost:8000/api/test-supabase/
```

**Reset everything (nuclear option):**
```bash
# Stop all servers (Ctrl+C)
# Remove virtual environment
rm -rf venv

# Remove node_modules
rm -rf frontend/node_modules

# Start fresh
python3 -m venv venv
source venv/bin/activate
cd backend && pip install -r requirements.txt
cd ../frontend && npm install
```

### Platform-Specific Notes

**macOS with M1/M2 Chips:**
```bash
# If you get architecture errors
arch -x86_64 python3 -m venv venv
```

**Windows Specific:**
```bash
# Use backslashes for paths
venv\Scripts\activate

# Use py instead of python3 if python3 doesn't work
py -m venv venv
```

### Port Configuration
- **Django Backend**: http://localhost:8000
- **React Frontend**: http://localhost:3000
- **Supabase**: Remote (configured via environment variables)

### Getting Help

If you're still having issues:
1. Check the browser console for error messages
2. Check Django server logs in terminal
3. Verify all environment variables are set correctly
4. Try the authentication flow step by step

## 📋 Development Status

See `plan.md` and `features.md` for detailed development roadmap and feature tracking.

### Current Status
- ✅ Project structure setup
- ✅ Django REST API with production endpoints
- ✅ React frontend with API communication  
- ✅ Environment configuration
- ✅ CORS setup
- ✅ Supabase database setup (2 tables: users + user_details)
- ✅ Database populated with real employee data (16 users, 15 profiles)
- ✅ Authentication system complete (signup, login, logout, session management)
- ✅ Django models aligned with Supabase schema
- ✅ Clean backend structure (removed unnecessary files/dependencies)
- 🔄 Dashboard with real user data (next phase)
- ⏳ Profile management API endpoints
- ⏳ User search and filtering
- ⏳ Profile editing functionality

## 🤝 Contributing

1. Follow the development workflow above
2. Update `plan.md` and `features.md` when implementing features
3. Test both backend and frontend before committing
4. Keep environment files (.env) secure and never commit them

## 📄 License

This project is for internal use.
