const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['food', 'shelter', 'medical', 'clothing', 'other']
  },
  description: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 // Set minimum quantity to 1 (or adjust as needed)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', RequestSchema);
