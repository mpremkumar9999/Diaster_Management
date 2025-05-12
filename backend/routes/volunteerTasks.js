const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const Donation = require('../models/Donation');
const DonationVolunteerTask = require('../models/DonationVolunteerTask');
const ReliefVolunteerTask = require('../models/ReliefVolunteerTask');

// Get available donation tasks
router.get('/available-tasks', auth, async (req, res) => {
  try {
    console.log(`[GET /available-tasks] Request received from user ${req.user.id} in district ${req.user.district}`);

    const query = {
      status: 'pending',
      district: req.user.district
    };

    const availableTasks = await Donation.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'username email');

    const responseData = {
      success: true,
      tasks: availableTasks.map(task => ({
        _id: task._id,
        type: task.type,
        quantity: task.quantity,
        deliveryMethod: task.deliveryMethod,
        status: task.status,
        donor: {
          username: task.userId?.username || 'Anonymous',
          email: task.userId?.email
        },
        createdAt: task.createdAt
      }))
    };

    res.json(responseData);
  } catch (error) {
    console.error('[GET /available-tasks] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
});

// Accept a donation task
router.post('/accept-task', auth, async (req, res) => {
  try {
    const { donationId } = req.body;
    if (!donationId) {
      return res.status(400).json({
        success: false,
        error: 'Donation ID is required'
      });
    }

    const filter = {
      _id: donationId,
      status: 'pending',
      district: req.user.district
    };

    const update = {
      status: 'assigned',
      assignedVolunteer: req.user.id
    };

    const donation = await Donation.findOneAndUpdate(filter, update, { new: true });

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Task no longer available or not in your district'
      });
    }

    const volunteerTask = new DonationVolunteerTask({
      volunteerId: req.user.id,
      donationId,
      taskType: donation.type,
      status: 'assigned'
    });

    await volunteerTask.save();

    const response = {
      success: true,
      message: 'Task accepted successfully',
      task: {
        ...volunteerTask.toObject(),
        donationDetails: donation
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
});

// Complete a task
router.put('/complete-task/:id', auth, async (req, res) => {
  try {
    const filter = {
      _id: req.params.id,
      volunteerId: req.user.id,
      status: { $in: ['assigned', 'in-progress'] }
    };

    const update = {
      status: 'completed',
      completionDate: new Date(),
      hoursSpent: req.body.hoursSpent || 2
    };

    const task = await DonationVolunteerTask.findOneAndUpdate(
      filter,
      update,
      { new: true }
    ).populate('donationId');

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found for completion'
      });
    }

    await Donation.findByIdAndUpdate(
      task.donationId,
      { status: 'completed', completionDate: new Date() }
    );

    const response = {
      success: true,
      task: {
        ...task.toObject(),
        hoursSpent: task.hoursSpent,
        completionDate: task.completionDate
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
});

// Get completed tasks
router.get('/completed-tasks', auth, async (req, res) => {
  try {
    const filter = {
      volunteerId: req.user.id,
      status: 'completed'
    };

    const tasks = await DonationVolunteerTask.find(filter)
      .populate('donationId')
      .sort({ completionDate: -1 });

    const totalHours = tasks.reduce((sum, task) => sum + (task.hoursSpent || 0), 0);

    const response = {
      success: true,
      tasks: tasks.map(task => ({
        _id: task._id,
        taskType: task.taskType,
        status: task.status,
        hoursSpent: task.hoursSpent,
        completionDate: task.completionDate,
        donationDetails: task.donationId
      })),
      totalHours
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
});

// Get upcoming tasks
router.get('/upcoming-tasks', auth, async (req, res) => {
  try {
    const filter = {
      volunteerId: req.user.id,
      status: { $in: ['assigned', 'in-progress'] }
    };

    const tasks = await DonationVolunteerTask.find(filter)
      .populate('donationId')
      .sort({ createdAt: -1 });

    const response = {
      success: true,
      tasks: tasks.map(task => ({
        _id: task._id,
        taskType: task.taskType,
        status: task.status,
        createdAt: task.createdAt,
        donationDetails: task.donationId
      }))
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: error.message
    });
  }
});

module.exports = router;