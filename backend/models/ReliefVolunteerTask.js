const mongoose = require('mongoose');

const ReliefVolunteerTaskSchema = new mongoose.Schema({
  volunteerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  reliefRequestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ReliefRequest', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['assigned', 'in-progress', 'completed'], 
    default: 'assigned' 
  },
  description: { 
    type: String, 
    required: true 
  },
  hoursSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  completionDate: {
    type: Date
  }
}, { 
  timestamps: true 
});

ReliefVolunteerTaskSchema.index({ location: '2dsphere' });
ReliefVolunteerTaskSchema.index({ volunteerId: 1, status: 1 });
ReliefVolunteerTaskSchema.index({ reliefRequestId: 1 });

module.exports = mongoose.model('ReliefVolunteerTask', ReliefVolunteerTaskSchema);
