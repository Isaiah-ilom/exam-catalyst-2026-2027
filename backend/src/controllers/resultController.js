const Result = require('../models/Result');

exports.getResults = async (req, res, next) => {
  try {
    const results = await Result.find({ user: req.user.id }).sort('-createdAt');
    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

exports.getResultById = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const analytics = await Result.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: '$subject',
          averageScore: { $avg: '$score' },
          totalAttempts: { $sum: 1 },
          totalTime: { $sum: '$timeSpent' }
        }
      }
    ]);
    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

exports.getResultsBySubject = async (req, res, next) => {
  try {
    const results = await Result.find({ 
      user: req.user.id, 
      subject: req.params.subject 
    }).sort('-createdAt');
    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};
