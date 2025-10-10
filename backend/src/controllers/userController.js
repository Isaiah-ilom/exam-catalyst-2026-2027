const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, phone },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    res.json({ success: true, data: { totalExams: 0, averageScore: 0, totalTime: 0 } });
  } catch (error) {
    next(error);
  }
};

exports.getActivities = async (req, res, next) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};
