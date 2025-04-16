// backend/models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  description: { type: String },
  assignedReliefRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReliefRequest' },
});

module.exports = mongoose.model('Donation', DonationSchema);