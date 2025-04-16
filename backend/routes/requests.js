// backend/routes/requests.js
const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const ReliefRequest = require('../models/ReliefRequest');

// Create a relief request
router.post('/', auth, async (req, res) => {
  try {
    const { description, location } = req.body;
    const newRequest = new ReliefRequest({
      userId: req.user.id,
      description,
      location,
    });
    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all relief requests
router.get('/', auth, async (req, res) => {
  try {
    const requests = await ReliefRequest.find().populate('userId', ['username']);
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get relief request by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await ReliefRequest.findById(req.params.id).populate('userId', ['username']);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update relief request
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await ReliefRequest.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete relief request
router.delete('/:id', auth, async (req, res) => {
  try {
    await ReliefRequest.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Request deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; // Ensure this is present and correct