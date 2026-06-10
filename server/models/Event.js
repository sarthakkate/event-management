const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide event date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide event time'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format'],
  },
  location: {
    type: String,
    required: [true, 'Please provide event location'],
  },
  category: {
    type: String,
    enum: [
      'Conference',
      'Seminar',
      'Workshop',
      'Webinar',
      'Hackathon',
      'Cultural Event',
      'Sports Event',
      'Training Session',
    ],
    required: [true, 'Please provide event category'],
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide event capacity'],
    min: [1, 'Capacity must be at least 1'],
  },
  registeredCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/500x300?text=Event+Image',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ createdBy: 1 });
eventSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema);
