const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Exam title is required'],
    trim: true,
    maxlength: [200, 'Exam title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['utme', 'post_utme', 'practice', 'mock', 'challenge', 'custom'],
    required: [true, 'Exam type is required']
  },
  mode: {
    type: String,
    enum: ['timed', 'untimed', 'practice', 'exam'],
    default: 'timed'
  },
  subjects: [{
    name: {
      type: String,
      required: true,
      enum: [
        'Mathematics',
        'English Language',
        'Physics', 
        'Chemistry',
        'Biology',
        'Geography',
        'Economics',
        'Government',
        'Literature in English',
        'History',
        'Christian Religious Studies',
        'Islamic Religious Studies',
        'Commerce',
        'Financial Accounting',
        'Civic Education',
        'French',
        'Hausa',
        'Igbo',
        'Yoruba'
      ]
    },
    questionCount: {
      type: Number,
      required: true,
      min: [1, 'Question count must be at least 1']
    },
    timeAllocation: {
      type: Number, // in minutes
      required: true,
      min: [1, 'Time allocation must be at least 1 minute']
    }
  }],
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      default: 1,
      min: [0, 'Points cannot be negative']
    }
  }],
  duration: {
    type: Number, // Total duration in minutes
    required: [true, 'Exam duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
    max: [300, 'Duration cannot exceed 300 minutes']
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: [1, 'Must have at least 1 question']
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'mixed'],
    default: 'mixed'
  },
  passingScore: {
    type: Number,
    default: 50,
    min: [0, 'Passing score cannot be negative'],
    max: [100, 'Passing score cannot exceed 100']
  },
  instructions: {
    type: String,
    trim: true,
    default: 'Read all questions carefully before answering. Select the best option from the choices provided.'
  },
  settings: {
    showTimer: { type: Boolean, default: true },
    showProgress: { type: Boolean, default: true },
    allowNavigation: { type: Boolean, default: true },
    allowFlagging: { type: Boolean, default: true },
    allowCalculator: { type: Boolean, default: true },
    shuffleQuestions: { type: Boolean, default: false },
    shuffleOptions: { type: Boolean, default: false },
    showExplanations: { type: Boolean, default: false },
    autoSubmit: { type: Boolean, default: true },
    warningTime: { type: Number, default: 5 }, // minutes before auto-submit warning
    gracePeriod: { type: Number, default: 2 }, // minutes after time expires
    attemptsAllowed: { type: Number, default: 1 },
    randomizeQuestions: { type: Boolean, default: false }
  },
  accessibility: {
    allowScreenReader: { type: Boolean, default: true },
    allowZoom: { type: Boolean, default: true },
    highContrast: { type: Boolean, default: false },
    fontSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    }
  },
  scheduling: {
    startDate: Date,
    endDate: Date,
    timeZone: {
      type: String,
      default: 'Africa/Lagos'
    },
    isScheduled: { type: Boolean, default: false }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  templateFor: {
    type: String,
    enum: ['utme', 'post_utme', 'waec', 'neco']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  statistics: {
    totalAttempts: { type: Number, default: 0 },
    totalCompletions: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    averageTime: { type: Number, default: 0 }, // in minutes
    highestScore: { type: Number, default: 0 },
    lowestScore: { type: Number, default: 100 },
    passRate: { type: Number, default: 0 }
  },
  analytics: {
    subjectPerformance: [{
      subject: String,
      averageScore: Number,
      totalQuestions: Number,
      correctAnswers: Number
    }],
    difficultyBreakdown: {
      easy: { correct: Number, total: Number },
      medium: { correct: Number, total: Number },
      hard: { correct: Number, total: Number }
    },
    timeAnalysis: {
      averageTimePerQuestion: Number,
      fastestCompletion: Number,
      slowestCompletion: Number
    }
  },
  feedback: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Feedback comment cannot exceed 500 characters']
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    version: { type: String, default: '1.0' },
    lastModified: { type: Date, default: Date.now },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    estimatedDuration: Number, // calculated based on questions
    blueprint: {
      knowledgeLevel: Number,
      comprehensionLevel: Number,
      applicationLevel: Number,
      analysisLevel: Number
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
examSchema.index({ type: 1, isActive: 1 });
examSchema.index({ creator: 1 });
examSchema.index({ 'scheduling.startDate': 1, 'scheduling.endDate': 1 });
examSchema.index({ isPublic: 1, isActive: 1 });
examSchema.index({ tags: 1 });
examSchema.index({ createdAt: -1 });
examSchema.index({ 'statistics.averageScore': -1 });

// Virtual for formatted duration
examSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
});

// Virtual for completion rate
examSchema.virtual('completionRate').get(function() {
  if (this.statistics.totalAttempts === 0) return 0;
  return Math.round((this.statistics.totalCompletions / this.statistics.totalAttempts) * 100);
});

// Virtual for difficulty distribution
examSchema.virtual('difficultyDistribution').get(function() {
  const total = this.totalQuestions;
  const easy = this.analytics?.difficultyBreakdown?.easy?.total || 0;
  const medium = this.analytics?.difficultyBreakdown?.medium?.total || 0;
  const hard = this.analytics?.difficultyBreakdown?.hard?.total || 0;
  
  return {
    easy: Math.round((easy / total) * 100),
    medium: Math.round((medium / total) * 100),
    hard: Math.round((hard / total) * 100)
  };
});

// Pre-save middleware to calculate total points
examSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    this.totalPoints = this.questions.reduce((sum, q) => sum + (q.points || 1), 0);
    this.totalQuestions = this.questions.length;
  }
  
  // Update metadata
  if (this.isModified() && !this.isNew) {
    this.metadata.lastModified = new Date();
  }
  
  next();
});

// Method to add question
examSchema.methods.addQuestion = function(questionId, subject, points = 1) {
  const order = this.questions.length + 1;
  
  this.questions.push({
    questionId,
    subject,
    order,
    points
  });
  
  this.totalQuestions = this.questions.length;
  this.totalPoints = this.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  
  return this.save();
};

// Method to remove question
examSchema.methods.removeQuestion = function(questionId) {
  this.questions = this.questions.filter(q => !q.questionId.equals(questionId));
  
  // Reorder questions
  this.questions.forEach((q, index) => {
    q.order = index + 1;
  });
  
  this.totalQuestions = this.questions.length;
  this.totalPoints = this.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  
  return this.save();
};

// Method to reorder questions
examSchema.methods.reorderQuestions = function(newOrder) {
  const reorderedQuestions = [];
  
  newOrder.forEach((questionId, index) => {
    const question = this.questions.find(q => q.questionId.equals(questionId));
    if (question) {
      question.order = index + 1;
      reorderedQuestions.push(question);
    }
  });
  
  this.questions = reorderedQuestions;
  return this.save();
};

// Method to update statistics
examSchema.methods.updateStatistics = function(resultData) {
  this.statistics.totalAttempts += 1;
  
  if (resultData.isCompleted) {
    this.statistics.totalCompletions += 1;
  }
  
  // Update average score
  if (this.statistics.totalCompletions > 0) {
    const newAverage = ((this.statistics.averageScore * (this.statistics.totalCompletions - 1)) + resultData.score) / this.statistics.totalCompletions;
    this.statistics.averageScore = Math.round(newAverage * 100) / 100;
  }
  
  // Update average time
  if (resultData.timeSpent && this.statistics.totalCompletions > 0) {
    const newAverageTime = ((this.statistics.averageTime * (this.statistics.totalCompletions - 1)) + resultData.timeSpent) / this.statistics.totalCompletions;
    this.statistics.averageTime = Math.round(newAverageTime * 100) / 100;
  }
  
  // Update highest and lowest scores
  if (resultData.score > this.statistics.highestScore) {
    this.statistics.highestScore = resultData.score;
  }
  
  if (resultData.score < this.statistics.lowestScore) {
    this.statistics.lowestScore = resultData.score;
  }
  
  // Update pass rate
  const passCount = await this.model('ExamResult').countDocuments({
    examId: this._id,
    score: { $gte: this.passingScore }
  });
  
  this.statistics.passRate = this.statistics.totalCompletions > 0 
    ? Math.round((passCount / this.statistics.totalCompletions) * 100)
    : 0;
  
  return this.save();
};

// Method to generate exam variant
examSchema.methods.generateVariant = function(options = {}) {
  const variant = this.toObject();
  delete variant._id;
  delete variant.createdAt;
  delete variant.updatedAt;
  
  variant.title = `${this.title} - Variant`;
  variant.statistics = {
    totalAttempts: 0,
    totalCompletions: 0,
    averageScore: 0,
    averageTime: 0,
    highestScore: 0,
    lowestScore: 100,
    passRate: 0
  };
  
  // Shuffle questions if requested
  if (options.shuffleQuestions) {
    variant.questions = this.shuffleArray(variant.questions);
    variant.questions.forEach((q, index) => {
      q.order = index + 1;
    });
  }
  
  return new this.constructor(variant);
};

// Method to clone exam
examSchema.methods.clone = function(title, creatorId) {
  const cloned = this.toObject();
  delete cloned._id;
  delete cloned.createdAt;
  delete cloned.updatedAt;
  
  cloned.title = title || `${this.title} - Copy`;
  cloned.creator = creatorId;
  cloned.statistics = {
    totalAttempts: 0,
    totalCompletions: 0,
    averageScore: 0,
    averageTime: 0,
    highestScore: 0,
    lowestScore: 100,
    passRate: 0
  };
  
  return new this.constructor(cloned);
};

// Method to validate exam structure
examSchema.methods.validateStructure = function() {
  const errors = [];
  
  if (this.questions.length === 0) {
    errors.push('Exam must have at least one question');
  }
  
  if (this.duration <= 0) {
    errors.push('Exam duration must be greater than 0');
  }
  
  // Check if all subjects have questions
  const subjectQuestions = {};
  this.questions.forEach(q => {
    subjectQuestions[q.subject] = (subjectQuestions[q.subject] || 0) + 1;
  });
  
  this.subjects.forEach(subject => {
    const actualCount = subjectQuestions[subject.name] || 0;
    if (actualCount !== subject.questionCount) {
      errors.push(`Subject ${subject.name} should have ${subject.questionCount} questions but has ${actualCount}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Static method to get exam templates
examSchema.statics.getTemplates = function(type) {
  const query = { isTemplate: true, isActive: true };
  if (type) {
    query.templateFor = type;
  }
  
  return this.find(query).select('title description type subjects duration totalQuestions');
};

// Static method to create from template
examSchema.statics.createFromTemplate = function(templateId, creatorId, customizations = {}) {
  return this.findById(templateId).then(template => {
    if (!template || !template.isTemplate) {
      throw new Error('Template not found');
    }
    
    const exam = template.clone(customizations.title, creatorId);
    
    // Apply customizations
    Object.keys(customizations).forEach(key => {
      if (key !== 'title' && exam[key] !== undefined) {
        exam[key] = customizations[key];
      }
    });
    
    exam.isTemplate = false;
    return exam.save();
  });
};

// Helper method to shuffle array
examSchema.methods.shuffleArray = function(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

module.exports = mongoose.model('Exam', examSchema);