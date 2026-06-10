const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { initializeEmailService } = require('./utils/emailService');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Initialize Email Service
initializeEmailService();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration — allow file:// origins and all localhost ports in development
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (file://, curl, Postman, etc.)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
      process.env.NODE_ENV === 'development'
    ) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/admin', require('./routes/admin'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// Serve static client files from the correct path
const path = require('path');
const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));

// Also serve pages/ directory at root so login.html, events.html etc.
// are reachable at localhost:5000/login.html (not just /pages/login.html)
app.use(express.static(path.join(clientPath, 'pages')));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'pages', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});
