# Event Management System

A complete full-stack Event Management System built with HTML5, CSS3, JavaScript, Node.js, Express.js, MongoDB, and JWT Authentication.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [User Guide](#user-guide)
- [Admin Guide](#admin-guide)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### User Features
- **User Authentication**: Secure registration and login with JWT
- **Event Browsing**: View all available events with filtering and search
- **Event Registration**: Register for events with capacity validation
- **My Events**: View all registered events and manage registrations
- **Event Details**: View comprehensive event information
- **Profile Management**: Update profile information and password
- **Email Notifications**: Receive confirmation and reminder emails

### Admin Features
- **Dashboard**: View statistics (users, events, registrations)
- **Event Management**: Create, update, and delete events
- **Registration Management**: View all registrations and mark attendance
- **User Management**: View users and manage roles
- **Event Categories**: Manage event categories

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive design with animations
- **JavaScript (Vanilla JS)** - No frameworks, pure JavaScript
- **LocalStorage** - Client-side state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email notifications

### Development Tools
- **Nodemon** - Auto-reload development server
- **dotenv** - Environment variables management

## 📁 Project Structure

```
Event Management/
├── client/                          # Frontend
│   ├── pages/                       # HTML pages
│   │   ├── index.html              # Home page
│   │   ├── login.html              # Login page
│   │   ├── register.html           # Registration page
│   │   ├── events.html             # Events listing
│   │   ├── event-details.html      # Event details
│   │   ├── my-events.html          # User's registered events
│   │   ├── profile.html            # User profile
│   │   ├── admin-dashboard.html    # Admin dashboard
│   │   └── [other pages]           # Additional pages
│   ├── css/                         # Stylesheets
│   │   ├── style.css               # Main styles
│   │   ├── responsive.css          # Responsive design
│   │   └── animations.css          # Animation effects
│   ├── js/                          # JavaScript files
│   │   ├── api.js                  # API client and utilities
│   │   └── utils.js                # Helper functions
│   └── images/                      # Image assets
│
├── server/                          # Backend
│   ├── config/
│   │   └── db.js                   # Database configuration
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── registrationController.js
│   │   └── adminController.js
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/                      # API routes
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── registrations.js
│   │   └── admin.js
│   ├── middleware/                  # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── utils/                       # Utility functions
│   │   ├── emailService.js
│   │   └── validators.js
│   ├── server.js                    # Main server file
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment variables template
│   └── .gitignore                   # Git ignore rules
│
├── APPROACH_AND_WORKFLOW.md         # Project approach documentation
└── README.md                        # This file
```

## 📦 Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR **MongoDB Atlas** (Cloud) - [Create Account](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## 🚀 Installation

### Step 1: Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd Event\ Management

# Or extract the ZIP file
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

This installs all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- nodemailer
- cors
- express-validator
- node-cron

### Step 3: Setup Environment Variables

```bash
# In the server directory, copy the example file
cp .env.example .env

# Edit .env file with your configuration
```

**Edit `.server/.env` file:**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/event-management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-management

# JWT
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=1h

# Server
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Client
CLIENT_URL=http://localhost:3000
```

### Step 4: Configure Frontend API URL

In `client/js/api.js`, the API_BASE_URL is set to:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Change this if your backend is running on a different port.

## 🗄️ Database Setup

### Option 1: Local MongoDB

```bash
# Windows
# Download and install MongoDB Community Edition
# Start MongoDB service

# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

**Connection String:**
```
mongodb://localhost:27017/event-management
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Add it to `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-management?retryWrites=true&w=majority
```

### Database Indexes

Indexes are automatically created by Mongoose when the server starts.

## ⚙️ Configuration Guide

### Email Configuration

#### Using Gmail

1. Enable 2-Factor Authentication on your Google Account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Add to `.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

#### Using SendGrid

1. Create a [SendGrid Account](https://sendgrid.com/)
2. Get your API Key
3. Add to `.env`:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

## 🏃 Running the Application

### Step 1: Start MongoDB

```bash
# Make sure MongoDB is running
# Windows: Use MongoDB service or run mongod
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Step 2: Start Backend Server

```bash
cd server
npm start

# OR for development with auto-reload:
npm run dev
```

Expected output:
```
Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

### Step 3: Open Frontend

In your browser, navigate to:
```
file:///path/to/Event Management/client/pages/index.html
```

Or set up a simple HTTP server:

```bash
# Using Python 3
cd client
python -m http.server 3000

# Using Node.js http-server (install first: npm install -g http-server)
http-server client -p 3000
```

Then visit: `http://localhost:3000/pages/index.html`

## 🔐 Default Test Accounts

After the first user registration, you can create a test admin account:

```
Email: admin@example.com
Password: password123
Role: admin (assign manually in database or update via admin panel)
```

## 📡 API Endpoints

### Authentication Routes

```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
POST   /api/auth/logout            Logout user
GET    /api/auth/me                Get current user
PUT    /api/auth/profile           Update profile
PUT    /api/auth/change-password   Change password
```

### Event Routes

```
GET    /api/events                 Get all events (with filters)
GET    /api/events/:id             Get event details
POST   /api/events                 Create event (admin)
PUT    /api/events/:id             Update event (admin)
DELETE /api/events/:id             Delete event (admin)
GET    /api/events/categories      Get event categories
```

### Registration Routes

```
POST   /api/registrations          Register for event
GET    /api/registrations/user     Get user's registrations
DELETE /api/registrations/:id      Cancel registration
GET    /api/registrations/event/:id  Get event registrations (admin)
PUT    /api/registrations/:id/attendance  Mark attendance (admin)
```

### Admin Routes

```
GET    /api/admin/dashboard        Get dashboard statistics
GET    /api/admin/users            Get all users
GET    /api/admin/registrations    Get all registrations
DELETE /api/admin/users/:id        Delete user
PUT    /api/admin/users/:id/role   Update user role
```

## 📖 User Guide

### Registering an Account

1. Click **Sign Up** on the home page
2. Fill in name, email, and password
3. Click **Create Account**
4. You'll be redirected to the events page

### Browsing Events

1. Go to **Events** page
2. Use **Search** to find specific events
3. Use **Filters** to filter by category
4. Click **View** on any event to see details

### Registering for an Event

1. Go to event details page
2. Click **Register Now**
3. Confirmation email will be sent
4. Event will appear in **My Events**

### Managing Registrations

1. Go to **My Events**
2. View all registered events
3. Click **Cancel** to cancel registration (before event date)

### Managing Profile

1. Go to **Profile**
2. Update information and click **Save Changes**
3. Change password in the **Change Password** section

## 👨‍💼 Admin Guide

### Accessing Admin Dashboard

- User must have **admin** role
- Navigate to **Admin Dashboard** from menu
- Or manually assign role in database

### Creating Events

1. Click **Create Event** in admin dashboard
2. Fill in all event details
3. Click **Create Event**
4. Event will be immediately available

### Managing Events

1. Go to **Manage Events**
2. View all events in table
3. Click **Edit** to modify event
4. Click **Delete** to remove event

### Managing Registrations

1. Go to **Registrations**
2. View all user registrations
3. Click **Mark Attended** to confirm attendance

### Managing Users

1. Go to **Users**
2. View all registered users
3. Click **Change Role** to promote/demote users
4. Click **Delete** to remove user

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- For Windows: Start MongoDB service

### Email Not Sending

```
Error: Invalid login: 535-5.7.8 Username and password not accepted
```

**Solution:**
- Use Gmail App Password (not regular password)
- Enable "Less secure app access" for Gmail
- Check EMAIL_USER and EMAIL_PASS in .env

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Check CLIENT_URL in server/.env
- Ensure frontend is being served from correct origin
- Update CORS configuration in server.js if needed

### 404 Not Found

- Check that frontend pages are in `client/pages/` folder
- Verify file paths in HTML links
- Clear browser cache

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Change PORT in .env
PORT=5001
```

Or kill the process using the port.

## 📝 Features Implementation Checklist

- [x] User Authentication (JWT)
- [x] User Registration & Login
- [x] Event Browsing & Search
- [x] Event Filtering by Category
- [x] Event Registration
- [x] User Profile Management
- [x] Admin Dashboard
- [x] Event Management (Create, Update, Delete)
- [x] Registration Management
- [x] User Management
- [x] Email Notifications
- [x] Responsive Design
- [x] Form Validation
- [x] Error Handling
- [x] Loading States
- [x] Toast Notifications

## 🚀 Deployment

### Backend (Node.js + Express)

Options:
- **Heroku** (Free tier available)
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS**

### Frontend (Static Files)

Options:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Database

- **MongoDB Atlas** (Recommended - Free tier available)

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Created with ❤️ - Event Management System**

**Last Updated:** June 2026
**Version:** 1.0.0
