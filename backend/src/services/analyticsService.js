const Result = require('../models/Result');

exports.getUserAnalytics = async (userId) => {
  const results = await Result.find({ user: userId });
  
  const analytics = {
    totalExams: results.length,
    averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length || 0,
    totalTime: results.reduce((sum, r) => sum + r.timeSpent, 0),
    subjectBreakdown: {}
  };
  
  return analytics;
};

exports.getSubjectAnalytics = async (userId, subject) => {
  const results = await Result.find({ user: userId, subject });
  
  return {
    totalAttempts: results.length,
    averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length || 0,
    bestScore: Math.max(...results.map(r => r.score), 0)
  };
};
