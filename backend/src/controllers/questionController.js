const mockQuestions = require('../data/mockQuestions');

exports.getQuestions = async (req, res) => {
  try {
    const { subject, limit = 20 } = req.query;
    
    if (!subject) {
      return res.status(400).json({ 
        success: false, 
        message: 'Subject is required' 
      });
    }

    const questions = mockQuestions[subject] || [];
    const limitedQuestions = questions.slice(0, Math.min(parseInt(limit), questions.length));
    
    res.json({ 
      success: true, 
      data: limitedQuestions, 
      count: limitedQuestions.length 
    });
  } catch (error) {
    console.error('Error in getQuestions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch questions' 
    });
  }
};

exports.getQuestionsBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const { limit = 20 } = req.query;
    
    const questions = mockQuestions[subject] || [];
    const limitedQuestions = questions.slice(0, Math.min(parseInt(limit), questions.length));
    
    res.json({ 
      success: true, 
      data: limitedQuestions, 
      count: limitedQuestions.length 
    });
  } catch (error) {
    console.error('Error in getQuestionsBySubject:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch questions' 
    });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = [
      { name: 'Mathematics', code: 'mathematics', category: 'Science' },
      { name: 'English', code: 'english', category: 'Arts' },
      { name: 'Physics', code: 'physics', category: 'Science' },
      { name: 'Chemistry', code: 'chemistry', category: 'Science' },
      { name: 'Biology', code: 'biology', category: 'Science' },
      { name: 'Economics', code: 'economics', category: 'Social Science' },
      { name: 'Commerce', code: 'commerce', category: 'Social Science' },
      { name: 'Accounting', code: 'accounting', category: 'Social Science' },
      { name: 'Government', code: 'government', category: 'Social Science' },
      { name: 'CRK', code: 'crk', category: 'Arts' },
      { name: 'Geography', code: 'geography', category: 'Social Science' },
      { name: 'Literature', code: 'literature', category: 'Arts' },
      { name: 'History', code: 'history', category: 'Arts' },
      { name: 'Civics', code: 'civics', category: 'Social Science' },
      { name: 'Insurance', code: 'insurance', category: 'Social Science' }
    ];
    
    res.json({ 
      success: true, 
      data: subjects 
    });
  } catch (error) {
    console.error('Error in getSubjects:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch subjects' 
    });
  }
};
