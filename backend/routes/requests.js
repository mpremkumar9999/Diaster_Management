const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const Request = require('../models/Request');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Send request alerts to admins, volunteers AND donors in the same district
 * @param {string} district - The district to notify
 * @param {object} requestDetails - The request details
 */
async function sendRequestAlertsToAll(district, requestDetails) {
  try {
    // Find all recipients: admins, volunteers AND donors in the same district
    const recipients = await User.find({
      district,
      role: { $in: ['admin', 'volunteer', 'donor'] }
    });

    const emailPromises = recipients.map(recipient => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient.email,
        subject: `Urgent: ${requestDetails.type} Needed in ${district}`,
        html: `
          <h2>New Assistance Request</h2>
          <p><strong>From:</strong> ${requestDetails.username} (${requestDetails.email})</p>
          <p><strong>Type:</strong> ${requestDetails.type}</p>
          <p><strong>Quantity:</strong> ${requestDetails.quantity}</p>
          <p><strong>Urgency:</strong> ${requestDetails.urgency}</p>
          <p><strong>Description:</strong> ${requestDetails.description}</p>
          <p><strong>District:</strong> ${district}</p>
          ${recipient.role === 'donor' ?
            '<p>As a donor in this district, your help would be greatly appreciated.</p>' :
            '<p>Please coordinate assistance for this request.</p>'}
          <p>Thank you for your support!</p>
        `
      };

      return transporter.sendMail(mailOptions)
        .then(info => ({ success: true, email: recipient.email, role: recipient.role }))
        .catch(err => ({
          success: false,
          email: recipient.email,
          role: recipient.role,
          error: err.message
        }));
    });

    const results = await Promise.all(emailPromises);

    // Log results
    const stats = {
      admins: results.filter(r => r.role === 'admin'),
      volunteers: results.filter(r => r.role === 'volunteer'),
      donors: results.filter(r => r.role === 'donor')
    };

    console.log('Email notification stats:', {
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
      ...stats
    });

    return results;
  } catch (error) {
    console.error('Error in sendRequestAlertsToAll:', error);
    throw error;
  }
}

// Create a new request (affected user)
router.post('/', auth, async (req, res) => {
  try {
    // Only affected users can create requests
    if (req.user.role !== 'affected') {
      return res.status(403).json({ message: 'Only affected users can create requests' });
    }

    const { type, description, urgency, quantity } = req.body;

    // Create new request
    const newRequest = new Request({
      name: req.user.username, // ✅ Populate the 'name' field with the username
      email: req.user.email,
      district: req.user.district,
      type,
      description,
      urgency: urgency || 'medium',
      quantity: parseInt(quantity) || 1
    });

    const savedRequest = await newRequest.save();

    // Send alerts to admins, volunteers AND donors
    sendRequestAlertsToAll(req.user.district, {
      username: req.user.username, // Use username for the email content
      email: req.user.email,
      type,
      description,
      urgency: urgency || 'medium',
      quantity: parseInt(quantity) || 1
    }).catch(err => {
      console.error('Background alert sending failed:', err);
      // Don't fail the request if email fails
    });

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Failed to create request' });
  }
});

// Get request history (affected user)
router.get('/history', auth, async (req, res) => {
  try {
    if (req.user.role !== 'affected') {
      return res.status(403).json({ message: 'Only affected users can view request history' });
    }

    const requests = await Request.find({ email: req.user.email })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(requests);
  } catch (error) {
    console.error('Error fetching request history:', error);
    res.status(500).json({ message: 'Failed to fetch request history' });
  }
});

module.exports = router;