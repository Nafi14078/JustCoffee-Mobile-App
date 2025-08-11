const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Make sure all functions are properly imported
console.log('Controllers imported:', { register, login, getMe });
console.log('Middleware imported:', { protect });

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
