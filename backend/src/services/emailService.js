const logger = require('../utils/logger');

const sendVerificationEmail = async (email, token, firstName) => {
  logger.info(`Sending verification email to ${email}`);
  return Promise.resolve();
};

const sendPasswordResetEmail = async (email, token, firstName) => {
  logger.info(`Sending password reset email to ${email}`);
  return Promise.resolve();
};

const sendWelcomeEmail = async (email, firstName) => {
  logger.info(`Sending welcome email to ${email}`);
  return Promise.resolve();
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
