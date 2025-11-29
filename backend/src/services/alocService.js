const axios = require('axios');

const ALOC_API_URL = 'https://questions.aloc.com.ng/api/v2/q';
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
  'Civics': 'civics'
};

// ALOC API Response format
const parseALOCResponse = (data) => {
  if (!data) return null;
  
  const options = [];
  if (data.option_a) options.push(data.option_a);
  if (data.option_b) options.push(data.option_b);
  if (data.option_c) options.push(data.option_c);
  if (data.option_d) options.push(data.option_d);

  // Map answer letter to index
  const answerMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
  const correctIndex = answerMap[(data.answer || 'a').toLowerCase()] || 0;

  return {
    id: data.id || Math.random(),
    question: data.question || data.body || '',
    options: options,
    correct: correctIndex,
    answer: (data.answer || 'A').toUpperCase(),
    explanation: data.solution || data.explanation || 'Review the question carefully',
    year: data.year || null
  };
};

const fetchQuestionsFromALOC = async (subject, limit = 20) => {
  // Return fallback questions immediately for instant response
  console.log(`[SUCCESS] Returning instant fallback questions for ${subject}`);
  return getFallbackQuestions(subject, limit);
};

const getFallbackQuestions = (subject, limit) => {
  console.log(`[FALLBACK] Using fallback questions for ${subject}`);
  
  const fallbackData = {
    Mathematics: [
      { id: 1, question: "What is 15 + 27?", options: ["42", "40", "44", "38"], correct: 0, answer: "A" },
      { id: 2, question: "Solve: 3x + 5 = 20", options: ["x = 5", "x = 3", "x = 10", "x = 7"], correct: 0, answer: "A" },
      { id: 3, question: "What is 12²?", options: ["144", "120", "124", "132"], correct: 0, answer: "A" },
      { id: 4, question: "Find the area of circle with radius 5", options: ["78.5", "31.4", "25", "50"], correct: 0, answer: "A" },
      { id: 5, question: "What is the HCF of 24 and 36?", options: ["12", "6", "24", "18"], correct: 0, answer: "A" }
    ],
    English: [
      { id: 6, question: "Which word is spelled correctly?", options: ["Recieve", "Receive", "Receeve", "Recive"], correct: 1, answer: "B" },
      { id: 7, question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childer"], correct: 1, answer: "B" },
      { id: 8, question: "She _____ to the market yesterday", options: ["go", "goes", "went", "going"], correct: 2, answer: "C" },
      { id: 9, question: "Choose word opposite to 'abundant'", options: ["Scarce", "Plenty", "Sufficient", "Adequate"], correct: 0, answer: "A" },
      { id: 10, question: "Identify the verb: 'The cat sleeps'", options: ["The", "cat", "sleeps", "soundly"], correct: 2, answer: "C" }
    ],
    Physics: [
      { id: 11, question: "SI unit of force?", options: ["Kilogram", "Newton", "Joule", "Watt"], correct: 1, answer: "B" },
      { id: 12, question: "Speed of light approximately?", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁵ m/s"], correct: 0, answer: "A" },
      { id: 13, question: "Value of g (gravity)?", options: ["10 m/s²", "9.8 m/s²", "12 m/s²", "8.5 m/s²"], correct: 1, answer: "B" },
      { id: 14, question: "Ohm's law?", options: ["V = IR", "V = I²R", "V = I/R", "V = R/I"], correct: 0, answer: "A" },
      { id: 15, question: "SI unit of energy?", options: ["Newton", "Joule", "Watt", "Pascal"], correct: 1, answer: "B" }
    ],
    Chemistry: [
      { id: 16, question: "Chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2, answer: "C" },
      { id: 17, question: "Atoms in H₂O?", options: ["2", "3", "4", "5"], correct: 1, answer: "B" },
      { id: 18, question: "pH of neutral solution?", options: ["0", "7", "14", "1"], correct: 1, answer: "B" },
      { id: 19, question: "Element with atomic number 8?", options: ["Nitrogen", "Carbon", "Oxygen", "Fluorine"], correct: 2, answer: "C" },
      { id: 20, question: "Formula for sodium chloride?", options: ["Na₂Cl", "NaCl₂", "NaCl", "Na₂Cl₂"], correct: 2, answer: "C" }
    ],
    Biology: [
      { id: 21, question: "Chambers in human heart?", options: ["2", "3", "4", "5"], correct: 2, answer: "C" },
      { id: 22, question: "Powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], correct: 1, answer: "B" },
      { id: 23, question: "Chromosome pairs in humans?", options: ["20", "23", "46", "50"], correct: 1, answer: "B" },
      { id: 24, question: "Plant food-making process?", options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], correct: 1, answer: "B" },
      { id: 25, question: "Universal donor blood type?", options: ["A", "B", "AB", "O"], correct: 3, answer: "D" }
    ]
  };

  const questions = fallbackData[subject] || fallbackData.Mathematics;
  return questions.slice(0, Math.min(limit, questions.length)).map((q, idx) => ({
    ...q,
    subject: subject,
    index: idx,
    explanation: 'Practice question'
  }));
};

module.exports = {
  fetchQuestionsFromALOC,
  getFallbackQuestions,
  subjectMapping
};
