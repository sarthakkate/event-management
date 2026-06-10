const Event = require('../models/Event');
const Registration = require('../models/Registration');

// Get All Events (with filtering)
exports.getAllEvents = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10, sortBy = 'date' } = req.query;

    let filter = { status: { $ne: 'cancelled' } };

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Search by title or description
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(filter)
      .sort({ [sortBy]: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      success: true,
      events,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalEvents: total,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Event
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Get number of registrations
    const registrationCount = await Registration.countDocuments({
      eventId: event._id,
      status: 'registered',
    });

    const eventData = event.toObject();
    eventData.registeredCount = registrationCount;

    res.status(200).json({
      success: true,
      event: eventData,
    });
  } catch (error) {
    next(error);
  }
};

// Create Event (Admin Only)
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, location, category, capacity, image } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity,
      image: image || 'https://via.placeholder.com/500x300?text=Event+Image',
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    next(error);
  }
};

// Update Event (Admin Only)
exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, category, capacity, image, status } = req.body;

    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if user is event creator
    if (event.createdBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event',
      });
    }

    event = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        time,
        location,
        category,
        capacity,
        image,
        status,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Event (Admin Only)
exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if user is event creator
    if (event.createdBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event',
      });
    }

    // Delete event and all registrations
    await Event.findByIdAndDelete(id);
    await Registration.deleteMany({ eventId: id });

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get Event Categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = [
      'Conference',
      'Seminar',
      'Workshop',
      'Webinar',
      'Hackathon',
      'Cultural Event',
      'Sports Event',
      'Training Session',
    ];

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
