const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', questionController.getQuestions);
router.get('/subjects', questionController.getSubjects);
router.get('/subject/:subject', questionController.getQuestionsBySubject);

module.exports = router;
