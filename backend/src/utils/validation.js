exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.isValidPassword = (password) => {
  return password && password.length >= 6;
};

exports.isValidMongoId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id);
};

exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};
