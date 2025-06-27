# UI Flow Plan - Employee Tracker

## Overview
This document outlines the user interface flow for the Employee Tracker application, starting from authentication through dashboard navigation and profile management.

## Current Implementation Status
✅ **Completed:**
- Login/Signup system with AuthPage
- Basic Dashboard with office layout visualization
- Authentication context and routing
- User data structure (user_details.csv)

🔄 **In Progress:**
- Profile view component
- Dashboard header profile integration

## User Flow Journey

### 1. Authentication Flow (Entry Point)
**Page:** `/` (AuthPage)
- **Initial State:** User lands on authentication page
- **Options Available:**
  - Login form (existing users)
  - Signup form (new users)
- **After Successful Auth:** Redirect to Dashboard
- **Data Handling:** Uses AuthContext for state management

### 2. Dashboard Flow (Main Hub)
**Page:** `/dashboard` (Dashboard)
- **Current Features:**
  - Welcome message with user name
  - Office floor plan showing who's at the office
  - Status indicators (On the road, Home Office, Vacation, Sick)
  - Weekly priorities tracker
  - Today's meetings calendar
  - Co-workers section
- **Header Layout:**
  - Left: Profile picture + Welcome message
  - Right: Notification bell + **Profile Avatar** (to be enhanced)

### 3. Profile View Flow (NEW - To be implemented)
**Component:** Profile modal/drawer
- **Trigger:** Click on profile picture/avatar in top-right corner of dashboard
- **Display Mode:** Modal overlay or slide-out drawer
- **Profile Data Fields** (from user_details.csv):
  - Personal Info:
    - Name (First Name + Last Name)
    - Role/Position
    - Location
    - Profile Picture
  - Work Details:
    - Office Days
    - Workload Status (green/yellow/red indicator)
    - Current Status (Today I'm in)
    - Time with company
  - Personal Touches:
    - Profile Bio
    - Skills
    - Interests
    - Favorite Recipes
    - Recommendations
- **Actions Available:**
  - View mode (read-only for now)
  - Close/dismiss profile view
  - Future: Edit profile functionality

## Implementation Priority

### Phase 1: Profile View Component (CURRENT FOCUS)
1. **Create Profile Component**
   - Design profile modal/drawer layout
   - Implement data fetching from user_details
   - Add proper styling and responsive design

2. **Integrate with Dashboard Header**
   - Make profile picture/avatar clickable
   - Add profile state management
   - Implement show/hide profile functionality

3. **Data Integration**
   - Connect to user_details.csv data structure
   - Handle data mapping and display
   - Add loading states and error handling

### Phase 2: Enhanced Profile Features (FUTURE)
1. **Edit Profile Functionality**
   - Allow users to update their information
   - Form validation and submission
   - Backend integration for data persistence

2. **Profile Picture Management**
   - Upload/change profile pictures
   - Image cropping and optimization
   - Default avatar system

## Technical Implementation Notes

### Data Structure
The user profile will use data from `user_details.csv` with the following key fields:
- `First Name`, `Last Name` → Full name display
- `Role` → Job title/position
- `Location` → Work location
- `Profile bio` → Personal description
- `Office days in the week` → Work schedule
- `Workload Status` → Current workload indicator
- `Today I'm in` → Current location status
- `Skills`, `Interests`, `Favorite recipes`, `I can recommend...` → Personal information sections

### Component Structure
```
Dashboard
├── Header
│   ├── ProfileSection (enhanced)
│   │   ├── ProfileAvatar (clickable)
│   │   └── WelcomeMessage
│   └── NotificationBell
├── MainContent (existing)
└── ProfileModal/Drawer (NEW)
    ├── ProfileHeader
    ├── PersonalInfo
    ├── WorkDetails
    └── PersonalTouches
```

### State Management
- Use existing AuthContext for user authentication
- Add ProfileContext or extend AuthContext for profile data
- Implement modal/drawer visibility state in Dashboard

## Next Steps
1. ✅ Create this UI flow document
2. 🔄 Implement Profile component
3. 🔄 Integrate Profile with Dashboard header
4. 🔄 Test profile data display and interaction
5. ⏳ Plan Phase 2 enhancements

---

*This document will be updated as we implement each phase of the UI flow.* 