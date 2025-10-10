exports.validateAuth = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email'
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }
  
  next();
};

exports.validateExam = (req, res, next) => {
  const { title, duration, subjects } = req.body;
  
  if (!title || !duration || !subjects) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }
  
  next();
};
