// backend/models/Alert.js
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
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
  radius: { type: Number, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Alert', AlertSchema);