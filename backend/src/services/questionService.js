const Question = require('../models/Question');
const logger = require('../utils/logger');

exports.getQuestions = async (filters = {}) => {
  const { subject, topic, limit = 50, difficulty } = filters;
  const query = {};
  
  if (subject) query.subject = subject;
  if (topic) query.topic = topic;
  if (difficulty) query.difficulty = difficulty;
  
  const questions = await Question.find(query).limit(parseInt(limit));
  return questions;
};

exports.getRandomQuestions = async (subject, count = 10) => {
  const questions = await Question.aggregate([
    { $match: { subject } },
    { $sample: { size: count } }
  ]);
  return questions;
};

exports.importQuestions = async (questionsData) => {
  logger.info(`Importing ${questionsData.length} questions`);
  const questions = await Question.insertMany(questionsData);
  return questions;
};
