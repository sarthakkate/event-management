const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');
const { sendRegistrationConfirmation, sendEventCancellation } = require('../utils/emailService');

// Register for Event
exports.registerEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const userId = req.userId;

    // Check if event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      userId,
      eventId,
      status: 'registered',
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event',
      });
    }

    // Check event capacity
    const registrationCount = await Registration.countDocuments({
      eventId,
      status: 'registered',
    });

    if (registrationCount >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full. Registration closed.',
      });
    }

    // Create registration
    const registration = await Registration.create({
      userId,
      eventId,
      status: 'registered',
    });

    // Update event registered count
    await Event.findByIdAndUpdate(eventId, {
      registeredCount: registrationCount + 1,
    });

    // Send confirmation email
    const user = await User.findById(userId);
    await sendRegistrationConfirmation(user.email, user.name, event.title);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      registration,
    });
  } catch (error) {
    next(error);
  }
};

// Get User's Registrations
exports.getUserRegistrations = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const registrations = await Registration.find({ userId })
      .populate('eventId')
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Registration.countDocuments({ userId });

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

// Cancel Registration
exports.cancelRegistration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const registration = await Registration.findById(id).populate('eventId userId');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Check if user owns this registration
    if (registration.userId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this registration',
      });
    }

    // Check if event has already started
    const eventDate = new Date(registration.eventId.date);
    if (eventDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel registration for a past event',
      });
    }

    // Update registration status
    registration.status = 'cancelled';
    await registration.save();

    // Update event registered count
    const registrationCount = await Registration.countDocuments({
      eventId: registration.eventId._id,
      status: 'registered',
    });

    await Event.findByIdAndUpdate(registration.eventId._id, {
      registeredCount: registrationCount,
    });

    res.status(200).json({
      success: true,
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get Event Registrations (Admin Only)
exports.getEventRegistrations = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    const skip = (page - 1) * limit;

    const registrations = await Registration.find({
      eventId,
      status: 'registered',
    })
      .populate('userId', 'name email phone')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Registration.countDocuments({
      eventId,
      status: 'registered',
    });

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

// Mark Attendance (Admin Only)
exports.markAttendance = async (req, res, next) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findByIdAndUpdate(
      registrationId,
      { status: 'attended' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance marked',
      registration,
    });
  } catch (error) {
    next(error);
  }
};
