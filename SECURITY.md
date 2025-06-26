# Security Guidelines

## 🔒 Environment Variables & Sensitive Data

### ⚠️ NEVER COMMIT THESE FILES:
- `.env` (backend and frontend)
- `.env.local`, `.env.production`, etc.
- Any file containing real API keys, passwords, or secrets
- Database files (`db.sqlite3`)
- `node_modules/` directories
- Build artifacts

### ✅ Safe to Commit:
- `example.env` files (with dummy values only)
- `.gitignore` files
- Configuration templates

## 🛡️ Supabase Security

### Backend Environment Variables:
```bash
# backend/.env (NEVER COMMIT THIS FILE)
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_API_KEY=your_actual_service_role_key_here
SUPABASE_JWT_SECRET=your_actual_jwt_secret_here
SUPABASE_DB_PASSWORD=your_actual_database_password
```

### Frontend Environment Variables:
```bash
# frontend/.env (NEVER COMMIT THIS FILE)
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## 🔧 Setup Instructions

### 1. Backend Setup:
```bash
cd backend
cp example.env .env
# Edit .env with your actual Supabase credentials
```

### 2. Frontend Setup:
```bash
cd frontend
cp example.env .env
# Edit .env with your actual configuration
```

## 🚨 Security Checklist

- [ ] All `.env` files are in `.gitignore`
- [ ] Only dummy values in `example.env` files
- [ ] Real credentials never committed to version control
- [ ] Supabase RLS (Row Level Security) policies enabled
- [ ] API keys have appropriate permissions (not full admin access)
- [ ] Database passwords are strong and unique
- [ ] CORS is properly configured for production

## 🔍 Files Protected by .gitignore

### Environment Files:
- `.env`, `.env.*` (all environment files)
- `backend/.env`, `backend/.env.*`
- `frontend/.env`, `frontend/.env.*`

### Database Files:
- `backend/db.sqlite3`
- `backend/db.sqlite3-journal`

### Build & Dependencies:
- `node_modules/`
- `build/`, `dist/`, `out/`
- `coverage/`

### IDE & System Files:
- `.vscode/`, `.idea/`
- `.DS_Store`, `Thumbs.db`
- `*.log`, `*.tmp`

## 🆘 If Credentials Are Accidentally Committed

1. **Immediately revoke/regenerate** all exposed credentials in Supabase
2. Update your local `.env` files with new credentials
3. Use `git filter-branch` or BFG Repo-Cleaner to remove from git history
4. Force push the cleaned repository
5. Notify team members to re-clone the repository

## 📞 Emergency Contacts

- Supabase Dashboard: https://supabase.com/dashboard
- Regenerate API keys in: Project Settings → API
- Reset database password in: Project Settings → Database 