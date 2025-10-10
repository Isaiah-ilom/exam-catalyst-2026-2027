const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.generateToken = (length = 32) => {
  return require('crypto').randomBytes(length).toString('hex');
};
