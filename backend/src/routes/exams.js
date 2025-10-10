const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', examController.getExams);
router.get('/:id', examController.getExamById);
router.post('/', examController.createExam);
router.post('/:id/start', examController.startExam);
router.post('/:id/submit', examController.submitExam);
router.get('/:id/results', examController.getExamResults);

module.exports = router;
