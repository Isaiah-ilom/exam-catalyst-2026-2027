const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', resultController.getResults);
router.get('/:id', resultController.getResultById);
router.get('/analytics', resultController.getAnalytics);
router.get('/subject/:subject', resultController.getResultsBySubject);

module.exports = router;
