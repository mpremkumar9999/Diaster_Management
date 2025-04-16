const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Route to send district-based alerts via email (admin only)
router.post('/send-district', auth, async (req, res) => {
    console.log('✅ /send-district endpoint triggered');

    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: Only admins can send alerts.' });
        }

        const { district, message } = req.body;
        console.log(`📍 District: ${district}`);
        console.log(`📨 Message: ${message}`);

        // Find users in the given district
        const usersToSendAlert = await User.find({ district });

        if (!usersToSendAlert || usersToSendAlert.length === 0) {
            console.log(`⚠️ No users found in district: ${district}`);
            return res.status(200).json({ message: `No users found in ${district} to send the alert.` });
        }

        const sentEmails = [];
        const failedEmails = [];

        for (const user of usersToSendAlert) {
            if (user.email) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: `Important Weather Alert for ${district}`,
                    text: `Dear ${user.username},\n\nPlease be advised of the following weather alert for ${district}:\n\n${message}\n\nPlease take necessary precautions.\n\nSincerely,\nThe Andhra Pradesh Weather Team`,
                };

                console.log(`⏳ Sending email to ${user.username} <${user.email}>...`);

                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log(`✅ Email sent to ${user.email}: ${info.messageId}`);
                    sentEmails.push({ email: user.email, username: user.username });
                } catch (error) {
                    console.error(`❌ Error sending email to ${user.email}:`, error.message);
                    failedEmails.push({ email: user.email, error: error.message });
                }
            } else {
                console.warn(`⚠️ User ${user.username} has no email address.`);
            }
        }

        // Log final summary
        console.log('\n📬 Summary of Sent Emails:');
        sentEmails.forEach(entry => {
            console.log(`✔️ ${entry.username} <${entry.email}>`);
        });

        if (failedEmails.length > 0) {
            console.log('\n❗ Summary of Failed Emails:');
            failedEmails.forEach(entry => {
                console.log(`❌ ${entry.email} - ${entry.error}`);
            });

            return res.status(207).json({
                message: `Alert emails sent to ${sentEmails.length} users in ${district} with some failures.`,
                sent: sentEmails,
                failed: failedEmails,
            });
        }

        return res.status(200).json({
            message: `Alert emails sent successfully to ${sentEmails.length} users in ${district}.`,
            sent: sentEmails,
        });

    } catch (error) {
        console.error('🚨 Error in /send-district route:', error);
        return res.status(500).json({ message: 'Failed to send alert emails.' });
    }
});

// Optional: placeholder for in-app alerts
router.get('/user-alerts', auth, async (req, res) => {
    try {
        res.status(200).json([]);
    } catch (error) {
        console.error('Error fetching user alerts:', error);
        res.status(500).json({ message: 'Failed to fetch user alerts.' });
    }
});

module.exports = router;
