// backend/models/VolunteerTask.js
const mongoose = require('mongoose');

const VolunteerTaskSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reliefRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReliefRequest', required: true },
  status: { type: String, enum: ['assigned', 'in progress', 'completed'], default: 'assigned' },
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VolunteerTask', VolunteerTaskSchema);