const express = require('express');
const router = express.Router();
const {
  registerEvent,
  getUserRegistrations,
  cancelRegistration,
  getEventRegistrations,
  markAttendance,
} = require('../controllers/registrationController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Protected routes
router.post('/', authMiddleware, registerEvent);
router.get('/user', authMiddleware, getUserRegistrations);
router.delete('/:id', authMiddleware, cancelRegistration);

// Admin routes
router.get('/event/:eventId', authMiddleware, adminMiddleware, getEventRegistrations);
router.put('/:registrationId/attendance', authMiddleware, adminMiddleware, markAttendance);

module.exports = router;
