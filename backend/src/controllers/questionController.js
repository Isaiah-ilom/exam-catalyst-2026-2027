const Question = require('../models/Question');

exports.getQuestions = async (req, res, next) => {
  try {
    const { subject, topic, limit = 50 } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    
    const questions = await Question.find(filter).limit(parseInt(limit));
    res.json({ success: true, data: questions, count: questions.length });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, data: question });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionsBySubject = async (req, res, next) => {
  try {
    const questions = await Question.find({ subject: req.params.subject });
    res.json({ success: true, data: questions, count: questions.length });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionsByTopic = async (req, res, next) => {
  try {
    const questions = await Question.find({ topic: req.params.topic });
    res.json({ success: true, data: questions, count: questions.length });
  } catch (error) {
    next(error);
  }
};
