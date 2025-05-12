const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const Donation = require('../models/Donation');
const User = require('../models/User');
const { sendVolunteerAlerts } = require('./alerts');

router.post('/', auth, async (req, res) => {
  console.log('--- POST /api/donations ---');
  console.log('Headers:', req.headers);
  console.log('User from auth:', req.user);
  console.log('Request body:', req.body);

  try {
    const { type, quantity, delivery } = req.body;

    if (!type || !quantity || !delivery) {
      console.log('Validation error: Missing fields');
      return res.status(400).json({ msg: 'Please provide donation type, quantity, and delivery method' });
    }

    if (!['food', 'clothing', 'medical', 'monetary'].includes(type)) {
      console.log('Validation error: Invalid donation type');
      return res.status(400).json({ msg: 'Invalid donation type' });
    }

    if (!['drop-off', 'pick-up'].includes(delivery)) {
      console.log('Validation error: Invalid delivery method');
      return res.status(400).json({ msg: 'Invalid delivery method' });
    }

    const user = await User.findById(req.user.id);
    console.log('User found:', user);
    if (!user) {
      console.log('Error: User not found for ID:', req.user.id);
      return res.status(404).json({ msg: 'User not found' });
    }

    const newDonation = new Donation({
      userId: req.user.id,
      username: user.username,
      type,
      quantity: parseInt(quantity),
      deliveryMethod: delivery,
      district: user.district, // Assuming User model has a 'district' field
    });
    console.log('New donation object:', newDonation);

    const donation = await newDonation.save();
    sendVolunteerAlerts(
      user.district,
      `👐 A generous donation just came in! ${user.username} has donated ${quantity} ${type}${quantity > 1 ? 's' : ''} in ${user.district}. Your help might be needed there. Thank you for being there!`
    )
      .then(result => console.log(result))
      .catch(error => console.error(error));

    console.log('Donation saved successfully:', donation);
    res.status(201).json(donation);
  } catch (err) {
    console.error('Error saving donation:', err);
    res.status(500).send('Server error');
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id }).sort({ donationDate: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;