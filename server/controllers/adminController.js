const User = require('../models/User');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Get Admin Dashboard Statistics
exports.getDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
      status: { $ne: 'cancelled' },
    });

    // Get events by category
    const eventsByCategory = await Event.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get registrations by status
    const registrationsByStatus = await Registration.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get recent events
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalEvents,
        totalRegistrations,
        upcomingEvents,
        eventsByCategory,
        registrationsByStatus,
        recentEvents,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role } = req.query;

    let filter = {};

    if (role) {
      filter.role = role;
    }

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalUsers: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Registrations
exports.getAllRegistrations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const registrations = await Registration.find(filter)
      .populate('userId', 'name email')
      .populate('eventId', 'title date')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ registrationDate: -1 });

    const total = await Registration.countDocuments(filter);

    res.status(200).json({
      success: true,
      registrations,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalRegistrations: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete User (Admin Only)
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete user's registrations
    await Registration.deleteMany({ userId: id });

    // Delete user's created events
    await Event.deleteMany({ createdBy: id });

    // Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Update User Role (Admin Only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};
