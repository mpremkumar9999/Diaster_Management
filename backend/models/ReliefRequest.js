// backend/models/ReliefRequest.js
const mongoose = require('mongoose');

const ReliefRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  timestamp: { type: Date, default: Date.now },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('ReliefRequest', ReliefRequestSchema);