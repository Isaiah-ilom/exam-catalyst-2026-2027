const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateAuth } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

router.post('/register', validateAuth, authController.register);
router.post('/login', validateAuth, authController.login);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/logout', authenticate, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authenticate, authController.resendVerification);
router.put('/update-profile', authenticate, authController.updateProfile);
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;
