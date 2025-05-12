const mongoose = require('mongoose');

const DonationVolunteerTaskSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
    required: true
  },
  taskType: {
    type: String,
    required: true,
    enum: ['food', 'clothing', 'medical', 'other']
  },
  hoursSpent: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['assigned', 'in-progress', 'completed'],
    default: 'assigned'
  },
  completionDate: {
    type: Date
  }
}, { 
  timestamps: true 
});

DonationVolunteerTaskSchema.index({ volunteerId: 1, status: 1 });
DonationVolunteerTaskSchema.index({ donationId: 1 });

module.exports = mongoose.model('DonationVolunteerTask', DonationVolunteerTaskSchema);
