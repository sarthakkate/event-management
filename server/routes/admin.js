const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getAllUsers,
  getAllRegistrations,
  deleteUser,
  updateUserRole,
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
router.get('/registrations', getAllRegistrations);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

module.exports = router;
