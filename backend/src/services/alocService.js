const axios = require('axios');

const ALOC_API_URL = process.env.ALOC_API_URL || 'https://questions.aloc.com.ng/api/v2';
const ALOC_ACCESS_TOKEN = process.env.ALOC_ACCESS_TOKEN;

const subjectMapping = {
  'Mathematics': 'mathematics',
  'English': 'english',
  'Physics': 'physics',
  'Chemistry': 'chemistry',
  'Biology': 'biology',
  'Economics': 'economics',
  'Commerce': 'commerce',
  'Accounting': 'accounting',
  'Government': 'government',
  'CRK': 'crk',
  'Geography': 'geography',
  'Literature': 'literature',
  'History': 'history',
  'Civics': 'civics',
  'Insurance': 'insurance'
};

const fetchQuestionsFromALOC = async (subject, limit = 20) => {
  try {
    const subjectKey = subjectMapping[subject] || subject.toLowerCase();
    
    const response = await axios.get(`${ALOC_API_URL}/questions`, {
      params: {
        subject: subjectKey,
        limit: limit,
        type: 'utme'
      },
      headers: {
        'Authorization': `Bearer ${ALOC_ACCESS_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (response.data && response.data.data) {
      return response.data.data.map(q => ({
        id: q.id,
        subject: subject,
        question: q.question,
        options: [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean),
        correctAnswer: q.answer,
        explanation: q.solution || '',
        year: q.year || null,
        examType: q.examtype || 'UTME'
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching from ALOC:', error.message);
    return getFallbackQuestions(subject, limit);
  }
};

const getFallbackQuestions = (subject, limit) => {
  const fallbackQuestions = {
    'Mathematics': [
      {
        id: 1,
        subject: 'Mathematics',
        question: 'Simplify: 3(2x - 5) - 2(3x + 4)',
        options: ['-23', '-7', '23', '7'],
        correctAnswer: '-23',
        explanation: '3(2x - 5) - 2(3x + 4) = 6x - 15 - 6x - 8 = -23'
      },
      {
        id: 2,
        subject: 'Mathematics',
        question: 'If y = 3x² - 2x + 1, find dy/dx',
        options: ['6x - 2', '3x - 2', '6x + 2', '3x + 2'],
        correctAnswer: '6x - 2',
        explanation: 'dy/dx = 6x - 2'
      }
    ],
    'English': [
      {
        id: 1,
        subject: 'English',
        question: 'Choose the word that is opposite in meaning to "abundant"',
        options: ['Scarce', 'Plenty', 'Sufficient', 'Adequate'],
        correctAnswer: 'Scarce',
        explanation: 'Abundant means plentiful, opposite is scarce'
      },
      {
        id: 2,
        subject: 'English',
        question: 'Choose the correct spelling:',
        options: ['Recieve', 'Receive', 'Receeve', 'Recive'],
        correctAnswer: 'Receive',
        explanation: 'The correct spelling is "Receive"'
      }
    ],
    'Physics': [
      {
        id: 1,
        subject: 'Physics',
        question: 'What is the SI unit of force?',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        correctAnswer: 'Newton',
        explanation: 'The SI unit of force is Newton (N)'
      }
    ],
    'Chemistry': [
      {
        id: 1,
        subject: 'Chemistry',
        question: 'What is the atomic number of Carbon?',
        options: ['6', '12', '8', '14'],
        correctAnswer: '6',
        explanation: 'Carbon has atomic number 6'
      }
    ],
    'Biology': [
      {
        id: 1,
        subject: 'Biology',
        question: 'What is the powerhouse of the cell?',
        options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'],
        correctAnswer: 'Mitochondria',
        explanation: 'Mitochondria is the powerhouse of the cell'
      }
    ]
  };

  const questions = fallbackQuestions[subject] || fallbackQuestions['Mathematics'];
  return questions.slice(0, limit);
};

module.exports = {
  fetchQuestionsFromALOC,
  subjectMapping
};
