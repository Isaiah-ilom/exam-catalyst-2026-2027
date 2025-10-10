const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide subject name'],
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    default: ''
  },
  topics: [{
    name: String,
    description: String
  }],
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subject', SubjectSchema);
