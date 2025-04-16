// backend/routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../utils/auth');
const geocoder = require('node-geocoder')({ provider: 'openstreetmap' }); // Import geocoder

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, district } = req.body; // Change location to district

    if (!username || !email || !password || !role || !district) { // Change location check
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Geocode the district
    const geocoded = await geocoder.geocode(district + ', Andhra Pradesh, India');

    if (!geocoded || geocoded.length === 0) {
        return res.status(400).json({ msg: 'Invalid district' });
    }

    const coordinates = [geocoded[0].longitude, geocoded[0].latitude];

    user = new User({
      username,
      email,
      password,
      role,
      district, // Store the district
      location: {
        type: 'Point',
        coordinates: coordinates, // Store coordinates
      },
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user by token
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;