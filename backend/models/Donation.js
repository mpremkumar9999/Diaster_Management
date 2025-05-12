// models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['food', 'clothing', 'medical', 'monetary'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  deliveryMethod: {
    type: String,
    enum: ['drop-off', 'pick-up'],
    default: 'drop-off',
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'completed'],
    default: 'pending',
  },
  // ADD THIS FIELD:
  district: {
    type: String,
    required: true // Or adjust the validation as needed
  },
  assignedVolunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  completionDate: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);