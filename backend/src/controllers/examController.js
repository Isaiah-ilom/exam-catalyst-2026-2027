const Exam = require('../models/Exam');

exports.getExams = async (req, res, next) => {
  try {
    const exams = await Exam.find({ user: req.user.id }).sort('-createdAt');
    res.json({ success: true, data: exams });
  } catch (error) {
    next(error);
  }
};

exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
    res.json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

exports.startExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { status: 'in-progress', startedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

exports.submitExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { status: 'completed', completedAt: new Date(), answers: req.body.answers },
      { new: true }
    );
    res.json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};

exports.getExamResults = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.json({ success: true, data: exam });
  } catch (error) {
    next(error);
  }
};
