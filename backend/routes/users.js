const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

// GET /api/users - list all users (Admin only, protected route)
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    // Only select the name and email fields for security and privacy
    const users = await User.find({}, 'name email').lean();

    res.json(users); // Returns an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
