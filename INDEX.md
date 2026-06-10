# Event Management System - Master Index

Welcome to the Event Management System! This file serves as your navigation guide to all project files and documentation.

## 📖 Documentation Files (Start Here!)

### For Quick Setup
1. **[QUICK_START.md](QUICK_START.md)** ⭐ **START HERE**
   - 5-minute setup guide
   - Minimum required steps
   - Test account creation
   - Common issues quick fix

2. **[README.md](README.md)** - Complete Documentation
   - Full feature list
   - Installation instructions
   - Configuration guide
   - API endpoints reference
   - Troubleshooting section
   - Deployment options

### For Understanding the Project
3. **[APPROACH_AND_WORKFLOW.md](APPROACH_AND_WORKFLOW.md)** - Architecture Guide
   - System architecture
   - Development workflow
   - Design decisions & rationale
   - Data flow diagrams
   - File structure explanation
   - Technology selection justification

4. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - What's Included
   - Complete feature checklist
   - Code statistics
   - Quality assurance details
   - Technology stack
   - Security features list
   - Browser support

### For API Testing
5. **[API_TESTING.md](API_TESTING.md)** - API Documentation
   - cURL examples
   - Postman instructions
   - Request/response formats
   - Status codes
   - Debugging tips

---

## 🚀 Setup Scripts

- **[setup.bat](setup.bat)** - Windows Setup Script
  - Automated Windows setup
  - Checks prerequisites
  - Installs dependencies
  - Creates .env file

- **[setup.sh](setup.sh)** - Unix/macOS Setup Script
  - Automated Linux/macOS setup
  - Checks prerequisites
  - Installs dependencies
  - Creates .env file

---

## 📁 File Structure Guide

### Backend Files (`server/` folder)

#### Entry Point
- **server.js** - Main application file
  - Lines: ~150
  - Initializes Express server
  - Sets up middleware
  - Connects to MongoDB
  - Registers routes
  - Handles errors

#### Configuration
- **config/db.js** - Database connection
  - Mongoose MongoDB connection
  - Connection string handling
  - Error management

- **.env.example** - Environment template
  - Database URI
  - JWT secrets
  - Email configuration
  - Server port
  - Node environment

#### Database Models (`models/` folder)
- **models/User.js** (~100 lines)
  - User schema definition
  - Password hashing hook
  - Authentication methods
  - Profile fields

- **models/Event.js** (~120 lines)
  - Event schema definition
  - Category validation
  - Status tracking
  - Performance indexes
  - Reference to User

- **models/Registration.js** (~80 lines)
  - Registration tracking
  - Unique constraint (userId+eventId)
  - Status management
  - Timestamps

#### Controllers (`controllers/` folder)
Business logic for each feature:

- **controllers/authController.js** (~250 lines)
  - register() - User registration
  - login() - User login
  - getMe() - Get current user
  - updateProfile() - Profile updates
  - changePassword() - Password change

- **controllers/eventController.js** (~300 lines)
  - getAllEvents() - List with filters
  - getEvent() - Single event details
  - createEvent() - Admin create
  - updateEvent() - Admin update
  - deleteEvent() - Admin delete
  - getCategories() - Category list

- **controllers/registrationController.js** (~280 lines)
  - registerEvent() - User registration
  - getUserRegistrations() - User's events
  - cancelRegistration() - Cancel event
  - getEventRegistrations() - Admin view
  - markAttendance() - Mark present

- **controllers/adminController.js** (~200 lines)
  - getDashboard() - Statistics
  - getAllUsers() - User management
  - getAllRegistrations() - All registrations
  - deleteUser() - User deletion
  - updateUserRole() - Role management

#### Routes (`routes/` folder)
API endpoint definitions:

- **routes/auth.js** (~80 lines)
  - POST /register
  - POST /login
  - POST /logout
  - GET /me
  - PUT /profile
  - PUT /change-password

- **routes/events.js** (~80 lines)
  - GET / (all events)
  - GET /:id (single)
  - POST / (admin)
  - PUT /:id (admin)
  - DELETE /:id (admin)
  - GET /categories

- **routes/registrations.js** (~70 lines)
  - POST / (register)
  - GET /user
  - DELETE /:id
  - GET /event/:id (admin)
  - PUT /:id/attendance (admin)

- **routes/admin.js** (~60 lines)
  - GET /dashboard
  - GET /users
  - GET /registrations
  - DELETE /users/:id
  - PUT /users/:id/role

#### Middleware (`middleware/` folder)
Cross-cutting concerns:

- **middleware/authMiddleware.js** (~50 lines)
  - authMiddleware() - JWT validation
  - adminMiddleware() - Admin check

- **middleware/errorHandler.js** (~80 lines)
  - Error formatting
  - Type-specific handling
  - Consistent responses

#### Utilities (`utils/` folder)
Helper functions:

- **utils/emailService.js** (~150 lines)
  - initializeEmailService() - Setup
  - sendRegistrationConfirmation()
  - sendEventReminder()
  - sendEventCancellation()
  - Nodemailer configuration

- **utils/validators.js** (~100 lines)
  - validateRegister() - Rules
  - validateLogin() - Rules
  - validateEvent() - Rules
  - handleValidationErrors()

#### Package Files
- **package.json** - Dependencies manifest
  - All npm packages
  - Scripts (start, dev)
  - Versions locked

---

### Frontend Files (`client/` folder)

#### HTML Pages (`pages/` folder)

**Navigation & Authentication:**
- **pages/index.html** (~150 lines)
  - Home page
  - Feature showcase
  - Statistics
  - Navigation bar

- **pages/login.html** (~100 lines)
  - Login form
  - Validation
  - Error handling
  - Link to signup

- **pages/register.html** (~120 lines)
  - Registration form
  - Password confirmation
  - Field validation
  - Link to login

**Event Management:**
- **pages/events.html** (~200 lines)
  - Event listing
  - Search & filter
  - Pagination
  - Event cards

- **pages/event-details.html** (~180 lines)
  - Full event info
  - Registration button
  - Capacity indicator
  - Organizer details

- **pages/my-events.html** (~180 lines)
  - User's registrations
  - Status filtering
  - Cancel option
  - Tabbed interface

**User Features:**
- **pages/profile.html** (~180 lines)
  - Profile information
  - Edit form
  - Change password
  - Settings menu

**Admin Interface:**
- **pages/admin-dashboard.html** (~500 lines)
  - Dashboard stats
  - Create event form
  - Event management table
  - Registration management
  - User management

#### CSS Files (`css/` folder)

- **css/style.css** (~600 lines)
  - CSS custom properties (variables)
  - Typography
  - Button styles
  - Form styling
  - Card layouts
  - Grid systems
  - Utility classes

- **css/responsive.css** (~350 lines)
  - Tablet breakpoints (≤768px)
  - Mobile breakpoints (≤480px)
  - Extra-small devices (≤320px)
  - Touch optimizations
  - Dark mode support
  - Accessibility features

- **css/animations.css** (~300 lines)
  - Fade, slide, scale animations
  - Hover effects
  - Loading spinners
  - Toast animations
  - Smooth transitions
  - Gradient effects

#### JavaScript Files (`js/` folder)

- **js/api.js** (~500 lines)
  - API client wrapper
  - All endpoint methods
  - Token management
  - Toast notifications
  - Form validation
  - Date utilities
  - Page navigation

- **js/utils.js** (~400 lines)
  - Utility functions
  - DOM manipulation
  - HTTP client
  - Event delegation
  - String/array helpers
  - Clipboard utilities

#### Images Folder
- **images/** - Place your images here
  - Event images
  - User avatars
  - Icons
  - Logos

---

## 🎯 Quick Navigation by Task

### I want to...

**...set up the project**
→ [QUICK_START.md](QUICK_START.md) or run `setup.bat` / `setup.sh`

**...understand the architecture**
→ [APPROACH_AND_WORKFLOW.md](APPROACH_AND_WORKFLOW.md)

**...see all features**
→ [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

**...test the API**
→ [API_TESTING.md](API_TESTING.md)

**...configure the project**
→ [README.md](README.md) - Configuration section

**...troubleshoot issues**
→ [README.md](README.md) - Troubleshooting section

**...deploy to production**
→ [README.md](README.md) - Deployment section

**...modify a specific page**
→ Find file in `client/pages/` folder

**...add a new API endpoint**
→ Create controller in `server/controllers/`
→ Add routes in `server/routes/`
→ Add API wrapper in `client/js/api.js`

**...customize styling**
→ Edit files in `client/css/` folder

**...change business logic**
→ Find file in `server/controllers/` folder

---

## 📊 File Statistics

| Component | Files | Lines | Folder |
|-----------|-------|-------|--------|
| HTML Pages | 8 | 2,500+ | client/pages/ |
| CSS Files | 3 | 2,000+ | client/css/ |
| JavaScript | 2 | 900+ | client/js/ |
| Controllers | 4 | 1,200+ | server/controllers/ |
| Models | 3 | 300+ | server/models/ |
| Routes | 4 | 150+ | server/routes/ |
| Middleware | 2 | 100+ | server/middleware/ |
| Utils | 2 | 200+ | server/utils/ |
| Config | 1 | 50+ | server/config/ |
| Documentation | 5 | 2,500+ | root/ |
| **Total** | **40+** | **9,800+** | - |

---

## 🔗 File Dependencies

```
server.js (Entry Point)
├── config/db.js (MongoDB)
├── models/ (Schemas)
│   ├── User.js
│   ├── Event.js
│   └── Registration.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── utils/
│   ├── emailService.js
│   └── validators.js
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── registrationController.js
│   └── adminController.js
└── routes/
    ├── auth.js
    ├── events.js
    ├── registrations.js
    └── admin.js

client/pages/
├── index.html
├── login.html
├── register.html
├── events.html
├── event-details.html
├── my-events.html
├── profile.html
└── admin-dashboard.html
    ├── css/
    │   ├── style.css
    │   ├── responsive.css
    │   └── animations.css
    └── js/
        ├── api.js
        └── utils.js
```

---

## 🎓 Learning Path

1. **Start**: Read [QUICK_START.md](QUICK_START.md) (15 min)
2. **Run**: Follow setup instructions (10 min)
3. **Test**: Create account and browse events (5 min)
4. **Understand**: Read [APPROACH_AND_WORKFLOW.md](APPROACH_AND_WORKFLOW.md) (30 min)
5. **Explore**: Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) (20 min)
6. **Code**: Review files in this order:
   - server.js
   - models/User.js
   - controllers/authController.js
   - routes/auth.js
   - client/pages/login.html
   - client/js/api.js

---

## ✅ Pre-Deployment Checklist

- [ ] All files downloaded/extracted
- [ ] Node.js installed
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created and configured
- [ ] Server starts without errors
- [ ] Frontend pages load in browser
- [ ] Can register and login
- [ ] Can create events (as admin)
- [ ] Can register for events
- [ ] Email notifications working (optional)
- [ ] Read [README.md](README.md) deployment section

---

## 🆘 Help & Support

**Stuck?** Check these in order:
1. [QUICK_START.md](QUICK_START.md) - Common solutions
2. [README.md](README.md) - Troubleshooting section
3. [APPROACH_AND_WORKFLOW.md](APPROACH_AND_WORKFLOW.md) - Architecture help
4. [API_TESTING.md](API_TESTING.md) - API documentation

---

## 📝 File Modification Guide

### Safe to Modify
- ✅ `client/css/` - Change styling
- ✅ `client/js/api.js` - Add new API calls
- ✅ `client/pages/` - Modify pages
- ✅ `server/.env` - Change configuration
- ✅ `server/controllers/` - Add business logic

### Careful with These
- ⚠️ `server/models/` - Schema changes might break data
- ⚠️ `server/routes/` - Path changes break API clients
- ⚠️ `server/middleware/` - Can affect all routes

### Don't Modify
- ❌ `server/server.js` - Without understanding impact
- ❌ `package.json` - Unless adding dependencies
- ❌ `.env.example` - Keep as template

---

## 🚀 Next Steps

1. **Run QUICK_START** (5 minutes)
2. **Read APPROACH_AND_WORKFLOW** (30 minutes)
3. **Explore the code** (1 hour)
4. **Customize as needed** (varies)
5. **Deploy** (2-4 hours)

---

**Event Management System - Master Index**
**Version:** 1.0.0
**Last Updated:** June 2026
**Status:** Complete & Ready ✅
