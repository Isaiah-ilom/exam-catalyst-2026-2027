const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.createExam = async (userId, examData) => {
  const exam = await Exam.create({ ...examData, user: userId });
  return exam;
};

exports.getExamQuestions = async (examId) => {
  const exam = await Exam.findById(examId).populate('questions');
  return exam.questions;
};

exports.submitExam = async (examId, answers) => {
  const exam = await Exam.findById(examId).populate('questions');
  let score = 0;
  
  answers.forEach((answer, index) => {
    if (exam.questions[index] && exam.questions[index].correctAnswer === answer) {
      score++;
    }
  });
  
  exam.status = 'completed';
  exam.score = score;
  exam.answers = answers;
  await exam.save();
  
  return exam;
};
