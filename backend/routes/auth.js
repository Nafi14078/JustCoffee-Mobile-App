const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin'); // Import admin check middleware
const router = express.Router();

console.log('Controllers imported:', { register, login, getMe });
console.log('Middleware imported:', { protect, isAdmin });

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

// Example Admin-only route (optional, add your admin routes here)
// router.get('/admin/dashboard', protect, isAdmin, (req, res) => {
//   res.json({ message: 'Welcome to the admin dashboard!' });
// });

module.exports = router;
