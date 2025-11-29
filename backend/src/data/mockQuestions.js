const mockQuestions = {
  Mathematics: [
    { id: 1, question: "What is 15 + 27?", options: ["42", "40", "44", "38"], correct: 0, subject: "Mathematics" },
    { id: 2, question: "Solve: 3x + 5 = 20", options: ["x = 5", "x = 3", "x = 10", "x = 7"], correct: 0, subject: "Mathematics" },
    { id: 3, question: "What is 12² ?", options: ["144", "120", "124", "132"], correct: 0, subject: "Mathematics" },
    { id: 4, question: "Find the area of a circle with radius 5", options: ["78.5", "31.4", "25", "50"], correct: 0, subject: "Mathematics" },
    { id: 5, question: "What is the HCF of 24 and 36?", options: ["12", "6", "24", "18"], correct: 0, subject: "Mathematics" },
  ],
  English: [
    { id: 6, question: "Which of the following is a noun?", options: ["Run", "Beautiful", "Book", "Quickly"], correct: 2, subject: "English" },
    { id: 7, question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childer"], correct: 1, subject: "English" },
    { id: 8, question: "Choose the correct spelling", options: ["Recieve", "Receive", "Recive", "Recieve"], correct: 1, subject: "English" },
    { id: 9, question: "What does 'benevolent' mean?", options: ["Evil", "Kind and generous", "Intelligent", "Rich"], correct: 1, subject: "English" },
    { id: 10, question: "Identify the verb in: 'The cat sleeps soundly'", options: ["The", "Cat", "Sleeps", "Soundly"], correct: 2, subject: "English" },
  ],
  Physics: [
    { id: 11, question: "What is the SI unit of force?", options: ["Kilogram", "Newton", "Joule", "Watt"], correct: 1, subject: "Physics" },
    { id: 12, question: "Speed of light is approximately", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁵ m/s"], correct: 0, subject: "Physics" },
    { id: 13, question: "What is the value of g (acceleration due to gravity)?", options: ["10 m/s²", "9.8 m/s²", "12 m/s²", "8.5 m/s²"], correct: 1, subject: "Physics" },
    { id: 14, question: "Ohm's law states that", options: ["V = IR", "V = I²R", "V = I/R", "V = R/I"], correct: 0, subject: "Physics" },
    { id: 15, question: "What is the SI unit of energy?", options: ["Newton", "Joule", "Watt", "Pascal"], correct: 1, subject: "Physics" },
  ],
  Chemistry: [
    { id: 16, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2, subject: "Chemistry" },
    { id: 17, question: "How many atoms are in H₂O?", options: ["2", "3", "4", "5"], correct: 1, subject: "Chemistry" },
    { id: 18, question: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], correct: 1, subject: "Chemistry" },
    { id: 19, question: "Which element has atomic number 8?", options: ["Nitrogen", "Carbon", "Oxygen", "Fluorine"], correct: 2, subject: "Chemistry" },
    { id: 20, question: "What is the formula for sodium chloride?", options: ["Na₂Cl", "NaCl₂", "NaCl", "Na₂Cl₂"], correct: 2, subject: "Chemistry" },
  ],
  Biology: [
    { id: 21, question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2, subject: "Biology" },
    { id: 22, question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], correct: 1, subject: "Biology" },
    { id: 23, question: "How many pairs of chromosomes do humans have?", options: ["20", "23", "46", "50"], correct: 1, subject: "Biology" },
    { id: 24, question: "What process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], correct: 1, subject: "Biology" },
    { id: 25, question: "Which blood type is the universal donor?", options: ["A", "B", "AB", "O"], correct: 3, subject: "Biology" },
  ],
};

module.exports = mockQuestions;
