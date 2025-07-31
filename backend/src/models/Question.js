const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters long']
  },
  questionType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'fill_in_blank', 'essay'],
    default: 'multiple_choice',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
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
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },
  subtopic: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    label: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D', 'E']
    }
  }],
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    enum: ['A', 'B', 'C', 'D', 'E']
  },
  explanation: {
    type: String,
    trim: true,
    minlength: [20, 'Explanation must be at least 20 characters long']
  },
  detailedSolution: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: [1990, 'Year must be from 1990 onwards'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  examType: {
    type: String,
    enum: ['UTME', 'POST_UTME', 'WAEC', 'NECO', 'JAMB', 'MOCK'],
    default: 'UTME'
  },
  source: {
    type: String,
    enum: ['JAMB', 'WAEC', 'NECO', 'ALOC_API', 'CUSTOM'],
    default: 'ALOC_API'
  },
  sourceId: {
    type: String,
    unique: true,
    sparse: true
  },
  images: [{
    url: String,
    caption: String,
    position: {
      type: String,
      enum: ['question', 'option_a', 'option_b', 'option_c', 'option_d', 'option_e', 'explanation']
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  statistics: {
    totalAttempts: { type: Number, default: 0 },
    correctAttempts: { type: Number, default: 0 },
    averageTime: { type: Number, default: 0 }, // in seconds
    difficultyRating: { type: Number, default: 0, min: 0, max: 5 },
    reportCount: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 }
  },
  reports: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reason: {
      type: String,
      enum: ['incorrect_answer', 'typo_error', 'inappropriate_content', 'duplicate_question', 'unclear_question', 'other'],
      required: true
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, 'Report description cannot exceed 500 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
      default: 'pending'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    estimatedTime: { type: Number, default: 60 }, // in seconds
    bloomTaxonomy: {
      type: String,
      enum: ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']
    },
    cognitiveLevel: {
      type: String,
      enum: ['knowledge', 'comprehension', 'application', 'analysis', 'synthesis', 'evaluation']
    },
    learningObjective: String,
    prerequisites: [String]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
questionSchema.index({ subject: 1, topic: 1 });
questionSchema.index({ difficulty: 1 });
questionSchema.index({ examType: 1, year: -1 });
questionSchema.index({ isActive: 1, isVerified: 1 });
questionSchema.index({ sourceId: 1 }, { unique: true, sparse: true });
questionSchema.index({ tags: 1 });
questionSchema.index({ 'statistics.difficultyRating': -1 });
questionSchema.index({ createdAt: -1 });

// Text search index
questionSchema.index({
  questionText: 'text',
  topic: 'text',
  subtopic: 'text',
  tags: 'text'
});

// Compound indexes
questionSchema.index({ subject: 1, difficulty: 1, isActive: 1 });
questionSchema.index({ examType: 1, year: -1, subject: 1 });

// Virtual for success rate
questionSchema.virtual('successRate').get(function() {
  if (this.statistics.totalAttempts === 0) return 0;
  return Math.round((this.statistics.correctAttempts / this.statistics.totalAttempts) * 100);
});

// Virtual for formatted difficulty
questionSchema.virtual('formattedDifficulty').get(function() {
  return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
});

// Pre-save middleware to validate options for multiple choice questions
questionSchema.pre('save', function(next) {
  if (this.questionType === 'multiple_choice') {
    if (!this.options || this.options.length < 2) {
      return next(new Error('Multiple choice questions must have at least 2 options'));
    }
    
    if (this.options.length > 5) {
      return next(new Error('Multiple choice questions cannot have more than 5 options'));
    }
    
    // Check if correct answer exists in options
    const correctOption = this.options.find(option => option.label === this.correctAnswer);
    if (!correctOption) {
      return next(new Error('Correct answer must match one of the option labels'));
    }
    
    // Validate unique option labels
    const labels = this.options.map(option => option.label);
    const uniqueLabels = [...new Set(labels)];
    if (labels.length !== uniqueLabels.length) {
      return next(new Error('Option labels must be unique'));
    }
  }
  
  next();
});

// Pre-save middleware to update lastModifiedBy
questionSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Method to update statistics
questionSchema.methods.updateStatistics = function(isCorrect, timeSpent) {
  this.statistics.totalAttempts += 1;
  
  if (isCorrect) {
    this.statistics.correctAttempts += 1;
  }
  
  // Update average time (exponential moving average)
  if (this.statistics.totalAttempts === 1) {
    this.statistics.averageTime = timeSpent;
  } else {
    const alpha = 0.1; // smoothing factor
    this.statistics.averageTime = (alpha * timeSpent) + ((1 - alpha) * this.statistics.averageTime);
  }
  
  return this.save();
};

// Method to add report
questionSchema.methods.addReport = function(userId, reason, description) {
  this.reports.push({
    userId,
    reason,
    description
  });
  
  this.statistics.reportCount += 1;
  
  return this.save();
};

// Method to resolve report
questionSchema.methods.resolveReport = function(reportId, reviewerId, status = 'resolved') {
  const report = this.reports.id(reportId);
  if (report) {
    report.status = status;
    report.reviewedBy = reviewerId;
    report.reviewedAt = new Date();
  }
  
  return this.save();
};

// Method to verify question
questionSchema.methods.verify = function(verifierId) {
  this.isVerified = true;
  this.verifiedBy = verifierId;
  this.verifiedAt = new Date();
  
  return this.save();
};

// Static method to get random questions
questionSchema.statics.getRandomQuestions = function(filters = {}, count = 10) {
  const pipeline = [
    { $match: { isActive: true, ...filters } },
    { $sample: { size: count } }
  ];
  
  return this.aggregate(pipeline);
};

// Static method to get questions by difficulty distribution
questionSchema.statics.getQuestionsByDifficulty = function(subject, easyCount = 3, mediumCount = 5, hardCount = 2) {
  const pipeline = [
    { $match: { subject, isActive: true } },
    {
      $facet: {
        easy: [
          { $match: { difficulty: 'easy' } },
          { $sample: { size: easyCount } }
        ],
        medium: [
          { $match: { difficulty: 'medium' } },
          { $sample: { size: mediumCount } }
        ],
        hard: [
          { $match: { difficulty: 'hard' } },
          { $sample: { size: hardCount } }
        ]
      }
    },
    {
      $project: {
        questions: { $concatArrays: ['$easy', '$medium', '$hard'] }
      }
    },
    { $unwind: '$questions' },
    { $replaceRoot: { newRoot: '$questions' } }
  ];
  
  return this.aggregate(pipeline);
};

// Static method to search questions
questionSchema.statics.searchQuestions = function(searchQuery, filters = {}, options = {}) {
  const {
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = -1
  } = options;
  
  const pipeline = [];
  
  // Text search stage
  if (searchQuery) {
    pipeline.push({
      $match: {
        $text: { $search: searchQuery },
        isActive: true,
        ...filters
      }
    });
    
    pipeline.push({
      $addFields: {
        score: { $meta: 'textScore' }
      }
    });
  } else {
    pipeline.push({
      $match: { isActive: true, ...filters }
    });
  }
  
  // Sort stage
  const sortStage = {};
  if (searchQuery) {
    sortStage.score = { $meta: 'textScore' };
  }
  sortStage[sortBy] = sortOrder;
  pipeline.push({ $sort: sortStage });
  
  // Pagination
  pipeline.push({ $skip: (page - 1) * limit });
  pipeline.push({ $limit: limit });
  
  return this.aggregate(pipeline);
};

// Static method to get statistics by subject
questionSchema.statics.getSubjectStatistics = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$subject',
        totalQuestions: { $sum: 1 },
        averageDifficulty: { $avg: { $cond: [
          { $eq: ['$difficulty', 'easy'] }, 1,
          { $cond: [{ $eq: ['$difficulty', 'medium'] }, 2, 3] }
        ]}},
        totalAttempts: { $sum: '$statistics.totalAttempts' },
        averageSuccessRate: { $avg: {
          $cond: [
            { $eq: ['$statistics.totalAttempts', 0] },
            0,
            { $multiply: [
              { $divide: ['$statistics.correctAttempts', '$statistics.totalAttempts'] },
              100
            ]}
          ]
        }}
      }
    },
    { $sort: { totalQuestions: -1 } }
  ]);
};

module.exports = mongoose.model('Question', questionSchema);