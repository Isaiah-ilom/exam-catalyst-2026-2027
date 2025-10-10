const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/stats', userController.getStats);
router.get('/activities', userController.getActivities);

module.exports = router;
