# Quick Start Guide

Follow these steps to get the Event Management System up and running quickly.

## ⚡ 5-Minute Setup

### Prerequisites Check
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git (optional)

### Step 1: Install Backend Dependencies (1 min)

```bash
cd server
npm install
```

### Step 2: Configure Environment (1 min)

```bash
# Copy example file
cp .env.example .env

# Edit .env with your settings
```

**Minimum required in .env:**
```
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=anysecretkey
PORT=5000
```

### Step 3: Start MongoDB (1 min)

```bash
# Windows - Start MongoDB service
# macOS - brew services start mongodb-community
# Linux - sudo systemctl start mongod

# Or use MongoDB Atlas (Cloud) - no local setup needed
```

### Step 4: Start Server (1 min)

```bash
# In server directory
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Step 5: Open Frontend (1 min)

```bash
# Option 1: Direct file open
open client/pages/index.html  # macOS
start client/pages/index.html # Windows

# Option 2: Use Python server
cd client
python -m http.server 3000
# Then visit: http://localhost:3000/pages/index.html
```

## 🎯 Test the Application

### Create Test Account

1. Go to **Sign Up** page
2. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. Click **Create Account**

### Explore Events

1. You'll see the **Events** page
2. Browse available events
3. Click **View** on any event
4. Click **Register Now**

### Make Admin (Optional)

To create an admin account, you'll need to modify the database directly:

```javascript
// Using MongoDB shell or Atlas
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or register normally and promote yourself:
```bash
# MongoDB shell
use event-management
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

## 📧 Email Configuration (Optional)

### For Development (No Email Setup)

Leave EMAIL_SERVICE empty in .env - emails will be logged to console.

### For Production (Gmail)

1. Create a Gmail account
2. Enable 2-Factor Authentication
3. Get [App Password](https://myaccount.google.com/apppasswords)
4. Add to .env:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
```

## 🛠️ Development Tips

### Auto-reload Server
```bash
npm run dev  # Uses nodemon
```

### Common Issues

**"MongoDB Connection Failed"**
- Make sure MongoDB is running
- Check MONGODB_URI in .env

**"Port 5000 already in use"**
- Change PORT in .env to 5001
- Or kill process: `lsof -i :5000` then `kill -9 <PID>`

**"CORS Error"**
- Check CLIENT_URL matches your frontend URL
- Restart server after changes

## 📁 File Structure Quick Reference

```
client/
  ├── pages/           ← HTML files (open in browser)
  ├── css/             ← Stylesheets
  └── js/              ← JavaScript files

server/
  ├── server.js        ← Main server file
  ├── models/          ← Database schemas
  ├── routes/          ← API endpoints
  ├── controllers/     ← Business logic
  ├── .env             ← Configuration
  └── package.json     ← Dependencies
```

## 🎓 Next Steps

After basic setup:

1. **Read full README.md** for complete documentation
2. **Check APPROACH_AND_WORKFLOW.md** for architecture details
3. **Explore admin dashboard** for advanced features
4. **Customize styling** in client/css/ files
5. **Deploy** to production

## 🆘 Need Help?

Check these sections in README.md:
- Troubleshooting
- Configuration Guide
- API Endpoints
- Database Setup

---

**Happy Event Managing! 🎉**
