const axios = require('axios');

const ALOC_API_URL = 'https://questions.aloc.com.ng/api/v2';
const ALOC_ACCESS_TOKEN = 'QB-1e5c5f1553ccd8cd9e11';

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
  'IRK': 'irk',
  'Geography': 'geography',
  'Literature': 'literature',
  'History': 'history',
  'Civics': 'civics',
  'French': 'french',
  'Further Math': 'further-math',
  'Agriculture': 'agriculture',
  'Computer': 'computer'
};

const fetchQuestionsFromALOC = async (subject, limit = 20) => {
  try {
    const subjectKey = subjectMapping[subject] || subject.toLowerCase().replace(/\s+/g, '-');
    
    console.log(`Fetching ${limit} questions for subject: ${subjectKey}`);
    
    const response = await axios.get(`${ALOC_API_URL}/q/${limit}`, {
      params: {
        subject: subjectKey
      },
      headers: {
        'Accept': 'application/json',
        'AccessToken': ALOC_ACCESS_TOKEN,
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 15000
    });

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      console.log(`No questions found from ALOC for ${subject}, using fallback`);
      return getFallbackQuestions(subject, limit);
    }

    return response.data.data.map((q, idx) => {
      const options = [];
      if (q.option_a) options.push(q.option_a);
      if (q.option_b) options.push(q.option_b);
      if (q.option_c) options.push(q.option_c);
      if (q.option_d) options.push(q.option_d);

      const answerMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
      const correctIndex = answerMap[q.answer?.toLowerCase()] || 0;

      return {
        id: q.id || `${subject}-${idx}`,
        subject: subject,
        question: q.question || q.body || '',
        options: options,
        correct: correctIndex,
        answer: q.answer || 'A',
        explanation: q.solution || q.explanation || 'Review the question carefully',
        year: q.year || null,
        examType: q.examtype || 'UTME',
        difficulty: 'medium'
      };
    });
  } catch (error) {
    console.error(`Error fetching from ALOC for ${subject}:`, error.message);
    return getFallbackQuestions(subject, limit);
  }
};

const getFallbackQuestions = (subject, limit) => {
  const fallbackData = {
    Mathematics: [
      { id: 1, question: "Simplify: 3(2x - 5) - 2(3x + 4)", options: ["-23", "-7", "23", "7"], correct: 0, subject: "Mathematics" },
      { id: 2, question: "If y = 3x² - 2x + 1, find dy/dx", options: ["6x - 2", "3x - 2", "6x + 2", "3x + 2"], correct: 0, subject: "Mathematics" },
      { id: 3, question: "What is 15% of 80?", options: ["10", "12", "14", "16"], correct: 1, subject: "Mathematics" },
      { id: 4, question: "Solve: 2x + 5 = 13", options: ["x = 4", "x = 9", "x = 2", "x = 18"], correct: 0, subject: "Mathematics" },
      { id: 5, question: "Find the area of a circle with radius 5cm", options: ["78.5 cm²", "31.4 cm²", "25 cm²", "50 cm²"], correct: 0, subject: "Mathematics" }
    ],
    English: [
      { id: 6, question: "Which word is spelled correctly?", options: ["Recieve", "Receive", "Receeve", "Recive"], correct: 1, subject: "English" },
      { id: 7, question: "Choose the word opposite in meaning to 'abundant'", options: ["Scarce", "Plenty", "Sufficient", "Adequate"], correct: 0, subject: "English" },
      { id: 8, question: "She _____ to the market yesterday", options: ["go", "goes", "went", "going"], correct: 2, subject: "English" },
      { id: 9, question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childer"], correct: 1, subject: "English" },
      { id: 10, question: "Identify the verb: 'The cat sleeps soundly'", options: ["The", "cat", "sleeps", "soundly"], correct: 2, subject: "English" }
    ],
    Physics: [
      { id: 11, question: "What is the SI unit of force?", options: ["Kilogram", "Newton", "Joule", "Watt"], correct: 1, subject: "Physics" },
      { id: 12, question: "Speed of light is approximately", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁵ m/s"], correct: 0, subject: "Physics" },
      { id: 13, question: "What is the value of g?", options: ["10 m/s²", "9.8 m/s²", "12 m/s²", "8.5 m/s²"], correct: 1, subject: "Physics" },
      { id: 14, question: "Ohm's law states that", options: ["V = IR", "V = I²R", "V = I/R", "V = R/I"], correct: 0, subject: "Physics" },
      { id: 15, question: "What is the SI unit of energy?", options: ["Newton", "Joule", "Watt", "Pascal"], correct: 1, subject: "Physics" }
    ],
    Chemistry: [
      { id: 16, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2, subject: "Chemistry" },
      { id: 17, question: "How many atoms are in H₂O?", options: ["2", "3", "4", "5"], correct: 1, subject: "Chemistry" },
      { id: 18, question: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], correct: 1, subject: "Chemistry" },
      { id: 19, question: "Which element has atomic number 8?", options: ["Nitrogen", "Carbon", "Oxygen", "Fluorine"], correct: 2, subject: "Chemistry" },
      { id: 20, question: "What is the formula for sodium chloride?", options: ["Na₂Cl", "NaCl₂", "NaCl", "Na₂Cl₂"], correct: 2, subject: "Chemistry" }
    ],
    Biology: [
      { id: 21, question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2, subject: "Biology" },
      { id: 22, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], correct: 1, subject: "Biology" },
      { id: 23, question: "How many pairs of chromosomes do humans have?", options: ["20", "23", "46", "50"], correct: 1, subject: "Biology" },
      { id: 24, question: "What process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], correct: 1, subject: "Biology" },
      { id: 25, question: "Which blood type is the universal donor?", options: ["A", "B", "AB", "O"], correct: 3, subject: "Biology" }
    ]
  };

  const questions = fallbackData[subject] || fallbackData.Mathematics;
  return questions.slice(0, Math.min(limit, questions.length));
};

module.exports = {
  fetchQuestionsFromALOC,
  getFallbackQuestions,
  subjectMapping
};
