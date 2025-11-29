const axios = require('axios');

const ALOC_API_URL = process.env.ALOC_API_URL || 'https://questions.aloc.com.ng/api/v2';
const ALOC_ACCESS_TOKEN = process.env.ALOC_ACCESS_TOKEN;

const subjectMapping = {
  'Mathematics': 'mathematics',
  'English Language': 'english',
  'Physics': 'physics',
  'Chemistry': 'chemistry',
  'Biology': 'biology',
  'Economics': 'economics',
  'Commerce': 'commerce',
  'Financial Accounting': 'accounting',
  'Government': 'government',
  'Christian Religious Studies': 'crk',
  'Islamic Religious Studies': 'irk',
  'Geography': 'geography',
  'Literature in English': 'literature',
  'History': 'history',
  'Civic Education': 'civics',
  'French': 'french',
  'Hausa': 'hausa',
  'Igbo': 'igbo',
  'Yoruba': 'yoruba'
};

const fallbackQuestions = {
  'Mathematics': [
    { id: 'm1', subject: 'Mathematics', question: 'Simplify: 3(2x - 5) - 2(3x + 4)', options: ['-23', '-7', '23', '7'], correctAnswer: 'A', explanation: '3(2x - 5) - 2(3x + 4) = 6x - 15 - 6x - 8 = -23', difficulty: 'medium' },
    { id: 'm2', subject: 'Mathematics', question: 'If y = 3x² - 2x + 1, find dy/dx', options: ['6x - 2', '3x - 2', '6x + 2', '3x + 2'], correctAnswer: 'A', explanation: 'dy/dx = 6x - 2', difficulty: 'hard' },
    { id: 'm3', subject: 'Mathematics', question: 'What is 15% of 80?', options: ['10', '12', '14', '16'], correctAnswer: 'B', explanation: '15% of 80 = 0.15 × 80 = 12', difficulty: 'easy' }
  ],
  'English Language': [
    { id: 'e1', subject: 'English Language', question: 'Choose the word opposite in meaning to "abundant"', options: ['Scarce', 'Plenty', 'Sufficient', 'Adequate'], correctAnswer: 'A', explanation: 'Abundant means plentiful, opposite is scarce', difficulty: 'easy' },
    { id: 'e2', subject: 'English Language', question: 'Which word is spelled correctly?', options: ['Recieve', 'Receive', 'Receeve', 'Recive'], correctAnswer: 'B', explanation: 'The correct spelling is "Receive"', difficulty: 'easy' },
    { id: 'e3', subject: 'English Language', question: 'She _____ to the market yesterday.', options: ['go', 'goes', 'went', 'going'], correctAnswer: 'C', explanation: 'Past tense is "went"', difficulty: 'medium' }
  ],
  'Physics': [
    { id: 'p1', subject: 'Physics', question: 'What is the SI unit of force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correctAnswer: 'A', explanation: 'The SI unit of force is Newton (N)', difficulty: 'easy' },
    { id: 'p2', subject: 'Physics', question: 'Calculate the velocity of an object that travels 100m in 5s', options: ['20 m/s', '25 m/s', '15 m/s', '30 m/s'], correctAnswer: 'A', explanation: 'Velocity = Distance/Time = 100/5 = 20 m/s', difficulty: 'medium' }
  ],
  'Chemistry': [
    { id: 'c1', subject: 'Chemistry', question: 'What is the atomic number of Carbon?', options: ['6', '12', '8', '14'], correctAnswer: 'A', explanation: 'Carbon has atomic number 6', difficulty: 'easy' },
    { id: 'c2', subject: 'Chemistry', question: 'How many valence electrons does Oxygen have?', options: ['2', '4', '6', '8'], correctAnswer: 'C', explanation: 'Oxygen has 6 valence electrons', difficulty: 'medium' }
  ],
  'Biology': [
    { id: 'b1', subject: 'Biology', question: 'What is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'], correctAnswer: 'A', explanation: 'Mitochondria is the powerhouse of the cell', difficulty: 'easy' },
    { id: 'b2', subject: 'Biology', question: 'How many chromosomes does a human have?', options: ['23', '46', '48', '50'], correctAnswer: 'B', explanation: 'Humans have 46 chromosomes (23 pairs)', difficulty: 'medium' }
  ]
};

const fetchQuestionsFromALOC = async (subject, limit = 20) => {
  try {
    if (!ALOC_ACCESS_TOKEN) {
      console.log('ALOC_ACCESS_TOKEN not set, using fallback questions');
      return getFallbackQuestions(subject, limit);
    }

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
      },
      timeout: 10000
    });

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data.map(q => ({
        id: q.id,
        subject: subject,
        question: q.question,
        options: [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean),
        correctAnswer: q.answer || 'A',
        explanation: q.solution || q.explanation || 'See explanation',
        year: q.year || null,
        examType: q.examtype || 'UTME',
        difficulty: q.difficulty || 'medium'
      }));
    }

    return getFallbackQuestions(subject, limit);
  } catch (error) {
    console.error('Error fetching from ALOC:', error.message);
    return getFallbackQuestions(subject, limit);
  }
};

const getFallbackQuestions = (subject, limit) => {
  const questions = fallbackQuestions[subject] || fallbackQuestions['Mathematics'];
  return questions.slice(0, limit);
};

module.exports = {
  fetchQuestionsFromALOC,
  getFallbackQuestions,
  subjectMapping
};
