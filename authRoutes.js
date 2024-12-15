const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register/email', authController.registerEmail);
router.post('/register/mobile', authController.registerMobile);
router.post('/verify', authController.verifyOTP);
router.post('/login', authController.login);
router.post('/request-otp', authController.requestOTP);

// Protected route example
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;