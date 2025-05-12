const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['affected', 'donor', 'volunteer', 'admin'],
    required: true,
    default: 'affected'
  },
  district: {
    type: String,
    required: true,
    enum: [
      "Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema",
      "East Godavari", "Eluru", "Guntur", "Kadapa", "Kakinada", "Krishna", "Kurnool", "Manyam",
      "Nandyal", "NTR", "Palnadu", "Prakasam", "Sri Potti Sriramulu Nellore", "Srikakulam",
      "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari"
    ]
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 &&
                 typeof v[0] === 'number' &&
                 typeof v[1] === 'number' &&
                 v[0] >= -180 && v[0] <= 180 &&
                 v[1] >= -90 && v[1] <= 90;
        },
        message: props => `${props.value} is not a valid coordinate pair!`
      }
    }
  }
}, {
  timestamps: true
});

UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);