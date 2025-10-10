const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionById);
router.get('/subject/:subject', questionController.getQuestionsBySubject);
router.get('/topic/:topic', questionController.getQuestionsByTopic);

module.exports = router;
