const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam ID is required']
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  submitTime: {
    type: Date,
    required: [true, 'Submit time is required']
  },
  timeSpent: {
    type: Number, // in minutes
    required: true,
    min: [0, 'Time spent cannot be negative']
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'abandoned', 'auto_submitted', 'expired'],
    default: 'in_progress'
  },
  mode: {
    type: String,
    enum: ['practice', 'exam', 'timed', 'untimed'],
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    selectedAnswer: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'E', null],
      default: null
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    },
    isFlagged: {
      type: Boolean,
      default: false
    },
    attempts: {
      type: Number,
      default: 0
    },
    confidence: {
      type: String,
      enum: ['very_low', 'low', 'medium', 'high', 'very_high'],
      default: 'medium'
    },
    order: {
      type: Number,
      required: true
    }
  }],
  score: {
    overall: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    bySubject: [{
      subject: {
        type: String,
        required: true
      },
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
      timeSpent: { type: Number, default: 0 }
    }],
    byDifficulty: {
      easy: {
        correct: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 }
      },
      medium: {
        correct: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 }
      },
      hard: {
        correct: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 }
      }
    }
  },
  grade: {
    letter: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F'],
      default: 'F'
    },
    points: {
      type: Number,
      min: [0, 'Grade points cannot be negative'],
      max: [4, 'Grade points cannot exceed 4']
    },
    description: {
      type: String,
      enum: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'],
      default: 'Poor'
    }
  },
  isPassed: {
    type: Boolean,
    default: false
  },
  passingScore: {
    type: Number,
    default: 50
  },
  rank: {
    overall: Number,
    inGroup: Number,
    percentile: Number
  },
  analytics: {
    averageTimePerQuestion: {
      type: Number,
      default: 0
    },
    questionsSkipped: {
      type: Number,
      default: 0
    },
    questionsFlagged: {
      type: Number,
      default: 0
    },
    accuracyTrend: [{
      questionNumber: Number,
      isCorrect: Boolean,
      runningAccuracy: Number
    }],
    speedTrend: [{
      questionNumber: Number,
      timeSpent: Number,
      averageTime: Number
    }],
    subjectTiming: [{
      subject: String,
      totalTime: Number,
      averageTime: Number,
      questionsCount: Number
    }],
    difficultyPerformance: [{
      difficulty: String,
      correct: Number,
      total: Number,
      averageTime: Number
    }]
  },
  feedback: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    nextSteps: [String]
  },
  certificateGenerated: {
    type: Boolean,
    default: false
  },
  certificateUrl: String,
  metadata: {
    userAgent: String,
    ipAddress: String,
    browserInfo: {
      name: String,
      version: String,
      os: String
    },
    screenResolution: String,
    deviceType: {
      type: String,
      enum: ['desktop', 'tablet', 'mobile'],
      default: 'desktop'
    }
  },
  violations: [{
    type: {
      type: String,
      enum: ['tab_change', 'window_blur', 'fullscreen_exit', 'copy_attempt', 'right_click', 'suspicious_behavior']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    details: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }],
  reviewRequested: {
    type: Boolean,
    default: false
  },
  reviewNotes: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  shared: {
    isShared: { type: Boolean, default: false },
    shareId: { type: String, unique: true, sparse: true },
    sharedAt: Date,
    viewCount: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
resultSchema.index({ userId: 1, examId: 1 });
resultSchema.index({ sessionId: 1 }, { unique: true });
resultSchema.index({ userId: 1, createdAt: -1 });
resultSchema.index({ examId: 1, 'score.overall.percentage': -1 });
resultSchema.index({ status: 1 });
resultSchema.index({ 'shared.shareId': 1 }, { sparse: true });
resultSchema.index({ createdAt: -1 });

// Compound indexes
resultSchema.index({ userId: 1, status: 1, createdAt: -1 });
resultSchema.index({ examId: 1, status: 1, 'score.overall.percentage': -1 });

// Virtual for duration in hours and minutes
resultSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.timeSpent / 60);
  const minutes = Math.round(this.timeSpent % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
});

// Virtual for efficiency score
resultSchema.virtual('efficiency').get(function() {
  if (this.analytics.averageTimePerQuestion === 0) return 0;
  
  const expectedTime = 90; // 1.5 minutes per question in seconds
  const actualTime = this.analytics.averageTimePerQuestion;
  
  return Math.max(0, Math.min(100, Math.round((expectedTime / actualTime) * 100)));
});

// Virtual for performance category
resultSchema.virtual('performanceCategory').get(function() {
  const percentage = this.score.overall.percentage;
  
  if (percentage >= 90) return 'Outstanding';
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 70) return 'Very Good';
  if (percentage >= 60) return 'Good';
  if (percentage >= 50) return 'Fair';
  return 'Needs Improvement';
});

// Pre-save middleware to calculate scores and analytics
resultSchema.pre('save', async function(next) {
  if (this.isModified('answers') || this.isNew) {
    await this.calculateScores();
    await this.calculateAnalytics();
    this.determineGrade();
  }
  
  // Generate session ID if not provided
  if (!this.sessionId) {
    this.sessionId = this.generateSessionId();
  }
  
  next();
});

// Method to calculate scores
resultSchema.methods.calculateScores = async function() {
  const Question = mongoose.model('Question');
  
  // Get question details
  const questionIds = this.answers.map(a => a.questionId);
  const questions = await Question.find({ _id: { $in: questionIds } });
  const questionMap = new Map(questions.map(q => [q._id.toString(), q]));
  
  // Initialize counters
  let totalCorrect = 0;
  const subjectScores = new Map();
  const difficultyScores = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 }
  };
  
  // Calculate scores for each answer
  this.answers.forEach(answer => {
    const question = questionMap.get(answer.questionId.toString());
    if (!question) return;
    
    const isCorrect = answer.selectedAnswer === question.correctAnswer;
    answer.isCorrect = isCorrect;
    
    if (isCorrect) {
      totalCorrect++;
    }
    
    // Subject scores
    if (!subjectScores.has(question.subject)) {
      subjectScores.set(question.subject, { correct: 0, total: 0, timeSpent: 0 });
    }
    const subjectScore = subjectScores.get(question.subject);
    subjectScore.total++;
    subjectScore.timeSpent += answer.timeSpent || 0;
    if (isCorrect) {
      subjectScore.correct++;
    }
    
    // Difficulty scores
    if (difficultyScores[question.difficulty]) {
      difficultyScores[question.difficulty].total++;
      if (isCorrect) {
        difficultyScores[question.difficulty].correct++;
      }
    }
  });
  
  // Set overall score
  this.score.overall = {
    correct: totalCorrect,
    total: this.answers.length,
    percentage: this.answers.length > 0 ? Math.round((totalCorrect / this.answers.length) * 100) : 0
  };
  
  // Set subject scores
  this.score.bySubject = Array.from(subjectScores.entries()).map(([subject, data]) => ({
    subject,
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    timeSpent: Math.round(data.timeSpent / 60) // convert to minutes
  }));
  
  // Set difficulty scores
  Object.keys(difficultyScores).forEach(difficulty => {
    const data = difficultyScores[difficulty];
    this.score.byDifficulty[difficulty] = {
      correct: data.correct,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    };
  });
  
  // Check if passed
  this.isPassed = this.score.overall.percentage >= this.passingScore;
};

// Method to calculate analytics
resultSchema.methods.calculateAnalytics = function() {
  if (this.answers.length === 0) return;
  
  // Average time per question
  const totalTime = this.answers.reduce((sum, answer) => sum + (answer.timeSpent || 0), 0);
  this.analytics.averageTimePerQuestion = Math.round(totalTime / this.answers.length);
  
  // Questions skipped and flagged
  this.analytics.questionsSkipped = this.answers.filter(a => !a.selectedAnswer).length;
  this.analytics.questionsFlagged = this.answers.filter(a => a.isFlagged).length;
  
  // Accuracy trend
  let runningCorrect = 0;
  this.analytics.accuracyTrend = this.answers.map((answer, index) => {
    if (answer.isCorrect) runningCorrect++;
    return {
      questionNumber: index + 1,
      isCorrect: answer.isCorrect,
      runningAccuracy: Math.round((runningCorrect / (index + 1)) * 100)
    };
  });
  
  // Speed trend
  let runningTime = 0;
  this.analytics.speedTrend = this.answers.map((answer, index) => {
    runningTime += answer.timeSpent || 0;
    return {
      questionNumber: index + 1,
      timeSpent: answer.timeSpent || 0,
      averageTime: Math.round(runningTime / (index + 1))
    };
  });
};

// Method to determine grade
resultSchema.methods.determineGrade = function() {
  const percentage = this.score.overall.percentage;
  
  if (percentage >= 90) {
    this.grade = { letter: 'A', points: 4.0, description: 'Excellent' };
  } else if (percentage >= 80) {
    this.grade = { letter: 'B', points: 3.0, description: 'Very Good' };
  } else if (percentage >= 70) {
    this.grade = { letter: 'C', points: 2.0, description: 'Good' };
  } else if (percentage >= 60) {
    this.grade = { letter: 'D', points: 1.0, description: 'Fair' };
  } else {
    this.grade = { letter: 'F', points: 0.0, description: 'Poor' };
  }
};

// Method to generate session ID
resultSchema.methods.generateSessionId = function() {
  const crypto = require('crypto');
  return crypto.randomBytes(16).toString('hex');
};

// Method to generate feedback
resultSchema.methods.generateFeedback = async function() {
  const Question = mongoose.model('Question');
  
  const strengths = [];
  const weaknesses = [];
  const recommendations = [];
  const nextSteps = [];
  
  // Analyze subject performance
  this.score.bySubject.forEach(subject => {
    if (subject.percentage >= 80) {
      strengths.push(`Strong performance in ${subject.subject} (${subject.percentage}%)`);
    } else if (subject.percentage < 50) {
      weaknesses.push(`Need improvement in ${subject.subject} (${subject.percentage}%)`);
      recommendations.push(`Focus more practice time on ${subject.subject} fundamentals`);
    }
  });
  
  // Analyze difficulty performance
  const { easy, medium, hard } = this.score.byDifficulty;
  
  if (easy.percentage > medium.percentage + 20) {
    recommendations.push('Challenge yourself with more medium and hard level questions');
  }
  
  if (hard.percentage > 0 && hard.percentage >= medium.percentage) {
    strengths.push('Good analytical and problem-solving skills');
  }
  
  // Time management analysis
  if (this.analytics.averageTimePerQuestion > 120) { // More than 2 minutes per question
    weaknesses.push('Time management needs improvement');
    recommendations.push('Practice timed sessions to improve speed');
  } else if (this.analytics.averageTimePerQuestion < 30) { // Less than 30 seconds per question
    recommendations.push('Take more time to carefully read questions');
  }
  
  // Generate next steps based on performance
  if (this.score.overall.percentage < 50) {
    nextSteps.push('Focus on understanding basic concepts');
    nextSteps.push('Take untimed practice tests first');
  } else if (this.score.overall.percentage < 70) {
    nextSteps.push('Practice more challenging questions');
    nextSteps.push('Work on time management skills');
  } else {
    nextSteps.push('Maintain consistent practice schedule');
    nextSteps.push('Focus on perfecting weak subject areas');
  }
  
  this.feedback = {
    strengths,
    weaknesses,
    recommendations,
    nextSteps
  };
  
  return this.save();
};

// Method to calculate rank
resultSchema.methods.calculateRank = async function() {
  const totalResults = await this.constructor.countDocuments({
    examId: this.examId,
    status: 'completed'
  });
  
  const betterResults = await this.constructor.countDocuments({
    examId: this.examId,
    status: 'completed',
    'score.overall.percentage': { $gt: this.score.overall.percentage }
  });
  
  this.rank.overall = betterResults + 1;
  this.rank.percentile = totalResults > 0 ? Math.round(((totalResults - betterResults) / totalResults) * 100) : 0;
  
  return this.save();
};

// Method to share result
resultSchema.methods.shareResult = function() {
  const crypto = require('crypto');
  
  if (!this.shared.isShared) {
    this.shared.shareId = crypto.randomBytes(16).toString('hex');
    this.shared.isShared = true;
    this.shared.sharedAt = new Date();
  }
  
  return this.save();
};

// Method to unshare result
resultSchema.methods.unshareResult = function() {
  this.shared.isShared = false;
  this.shared.shareId = undefined;
  this.shared.sharedAt = undefined;
  
  return this.save();
};

// Method to add violation
resultSchema.methods.addViolation = function(type, details, severity = 'medium') {
  this.violations.push({
    type,
    details,
    severity,
    timestamp: new Date()
  });
  
  return this.save();
};

// Static method to get user statistics
resultSchema.statics.getUserStatistics = function(userId, timeframe = '30d') {
  const startDate = new Date();
  
  switch (timeframe) {
    case '7d':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(startDate.getDate() - 90);
      break;
    case '1y':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }
  
  return this.aggregate([
    {
      $match: {
        userId: mongoose.Types.ObjectId(userId),
        status: 'completed',
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalExams: { $sum: 1 },
        averageScore: { $avg: '$score.overall.percentage' },
        bestScore: { $max: '$score.overall.percentage' },
        totalTimeSpent: { $sum: '$timeSpent' },
        totalQuestions: { $sum: '$score.overall.total' },
        totalCorrect: { $sum: '$score.overall.correct' },
        examsPassed: {
          $sum: { $cond: ['$isPassed', 1, 0] }
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalExams: 1,
        averageScore: { $round: ['$averageScore', 1] },
        bestScore: 1,
        totalTimeSpent: 1,
        totalQuestions: 1,
        totalCorrect: 1,
        examsPassed: 1,
        passRate: {
          $round: [
            { $multiply: [{ $divide: ['$examsPassed', '$totalExams'] }, 100] },
            1
          ]
        },
        accuracy: {
          $round: [
            { $multiply: [{ $divide: ['$totalCorrect', '$totalQuestions'] }, 100] },
            1
          ]
        }
      }
    }
  ]);
};

// Static method to get performance trend
resultSchema.statics.getPerformanceTrend = function(userId, subject = null, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const matchStage = {
    userId: mongoose.Types.ObjectId(userId),
    status: 'completed',
    createdAt: { $gte: startDate }
  };
  
  if (subject) {
    matchStage['score.bySubject.subject'] = subject;
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $project: {
        date: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt'
          }
        },
        score: '$score.overall.percentage',
        timeSpent: '$timeSpent'
      }
    },
    {
      $group: {
        _id: '$date',
        averageScore: { $avg: '$score' },
        examCount: { $sum: 1 },
        totalTime: { $sum: '$timeSpent' }
      }
    },
    {
      $sort: { _id: 1 }
    },
    {
      $project: {
        date: '$_id',
        averageScore: { $round: ['$averageScore', 1] },
        examCount: 1,
        averageTime: { $round: [{ $divide: ['$totalTime', '$examCount'] }, 1] },
        _id: 0
      }
    }
  ]);
};

// Static method to get leaderboard
resultSchema.statics.getLeaderboard = function(examId, limit = 10) {
  return this.aggregate([
    {
      $match: {
        examId: mongoose.Types.ObjectId(examId),
        status: 'completed'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        userId: 1,
        userName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
        userAvatar: '$user.avatar',
        score: '$score.overall.percentage',
        timeSpent: '$timeSpent',
        createdAt: 1
      }
    },
    {
      $sort: {
        score: -1,
        timeSpent: 1,
        createdAt: 1
      }
    },
    {
      $limit: limit
    },
    {
      $group: {
        _id: null,
        results: { $push: '$$ROOT' }
      }
    },
    {
      $unwind: {
        path: '$results',
        includeArrayIndex: 'rank'
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            '$results',
            { rank: { $add: ['$rank', 1] } }
          ]
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Result', resultSchema);