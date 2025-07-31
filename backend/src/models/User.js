const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters'],
    minlength: [2, 'First name must be at least 2 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters'],
    minlength: [2, 'Last name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  phone: {
    type: String,
    trim: true,
    match: [/^(\+234|234|0)[789][01]\d{8}$/, 'Please provide a valid Nigerian phone number']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(date) {
        return date < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
    trim: true
  },
  school: {
    type: String,
    maxlength: [100, 'School name cannot be more than 100 characters'],
    trim: true
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot be more than 100 characters'],
    trim: true
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'instructor'],
    default: 'student'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      examReminders: { type: Boolean, default: true },
      resultNotifications: { type: Boolean, default: true },
      weeklyReports: { type: Boolean, default: true }
    },
    exam: {
      showTimer: { type: Boolean, default: true },
      autoSave: { type: Boolean, default: true },
      showProgress: { type: Boolean, default: true },
      allowCalculator: { type: Boolean, default: true },
      confirmSubmit: { type: Boolean, default: true }
    },
    privacy: {
      showProfile: { type: Boolean, default: true },
      showStats: { type: Boolean, default: true },
      allowMessages: { type: Boolean, default: true }
    }
  },
  stats: {
    totalExams: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    studyStreak: { type: Number, default: 0 },
    lastStudyDate: Date,
    totalStudyTime: { type: Number, default: 0 }, // in minutes
    bestScore: { type: Number, default: 0 },
    improvementRate: { type: Number, default: 0 }
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  badges: [{
    badgeId: mongoose.Schema.Types.ObjectId,
    earnedAt: { type: Date, default: Date.now },
    title: String,
    description: String,
    icon: String
  }],
  goals: [{
    type: {
      type: String,
      enum: ['daily_questions', 'weekly_hours', 'monthly_exams', 'subject_mastery', 'score_target'],
      required: true
    },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    deadline: Date,
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  subscriptions: [{
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    isActive: { type: Boolean, default: true }
  }],
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ 'stats.averageScore': -1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Virtual for account locked status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update study streak
userSchema.pre('save', function(next) {
  if (this.isModified('stats.lastStudyDate')) {
    const today = new Date();
    const lastStudy = new Date(this.stats.lastStudyDate);
    const diffTime = Math.abs(today - lastStudy);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      this.stats.studyStreak += 1;
    } else if (diffDays > 1) {
      this.stats.studyStreak = 1;
    }
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const crypto = require('crypto');
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const crypto = require('crypto');
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Method to increment login attempts
userSchema.methods.incrementLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1, loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
    $set: { lastLogin: new Date() }
  });
};

// Method to update stats
userSchema.methods.updateStats = function(examData) {
  this.stats.totalExams += 1;
  this.stats.totalQuestions += examData.totalQuestions || 0;
  this.stats.correctAnswers += examData.correctAnswers || 0;
  
  // Calculate new average score
  if (this.stats.totalExams > 0) {
    this.stats.averageScore = Math.round(
      (this.stats.correctAnswers / this.stats.totalQuestions) * 100
    );
  }
  
  // Update best score
  if (examData.score > this.stats.bestScore) {
    this.stats.bestScore = examData.score;
  }
  
  // Update study time
  this.stats.totalStudyTime += examData.timeSpent || 0;
  
  // Update last study date
  this.stats.lastStudyDate = new Date();
  
  return this.save();
};

// Method to add achievement
userSchema.methods.addAchievement = function(achievementId) {
  if (!this.achievements.includes(achievementId)) {
    this.achievements.push(achievementId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to add badge
userSchema.methods.addBadge = function(badge) {
  this.badges.push({
    badgeId: badge._id,
    title: badge.title,
    description: badge.description,
    icon: badge.icon
  });
  return this.save();
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to get leaderboard
userSchema.statics.getLeaderboard = function(limit = 10, timeframe = 'all') {
  const query = { isActive: true };
  
  return this.find(query)
    .select('firstName lastName avatar stats.averageScore stats.totalExams')
    .sort({ 'stats.averageScore': -1, 'stats.totalExams': -1 })
    .limit(limit);
};

module.exports = mongoose.model('User', userSchema);