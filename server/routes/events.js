const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getCategories,
} = require('../controllers/eventController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { validateEvent, handleValidationErrors } = require('../utils/validators');

// Public routes
router.get('/', getAllEvents);
router.get('/categories', getCategories);
router.get('/:id', getEvent);

// Protected routes — any authenticated user can create events
router.post('/', authMiddleware, validateEvent, handleValidationErrors, createEvent);
// Update/Delete: only event creator or admin (enforced in controller)
router.put('/:id', authMiddleware, validateEvent, handleValidationErrors, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
