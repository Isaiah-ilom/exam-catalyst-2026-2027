const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../../data/database.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    avatar TEXT,
    isEmailVerified INTEGER DEFAULT 0,
    loginAttempts INTEGER DEFAULT 0,
    lockUntil INTEGER,
    createdAt INTEGER DEFAULT (strftime('%s', 'now')),
    updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    subjects TEXT NOT NULL,
    duration INTEGER NOT NULL,
    totalQuestions INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    startTime INTEGER,
    endTime INTEGER,
    submittedAt INTEGER,
    score INTEGER,
    createdAt INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS exam_answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    examId INTEGER NOT NULL,
    questionId TEXT NOT NULL,
    answer TEXT,
    isCorrect INTEGER,
    timeSpent INTEGER,
    flagged INTEGER DEFAULT 0,
    FOREIGN KEY (examId) REFERENCES exams(id)
  );

  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    examId INTEGER NOT NULL,
    score REAL NOT NULL,
    totalQuestions INTEGER NOT NULL,
    correctAnswers INTEGER NOT NULL,
    wrongAnswers INTEGER NOT NULL,
    unanswered INTEGER NOT NULL,
    timeSpent INTEGER NOT NULL,
    percentage REAL NOT NULL,
    subjects TEXT,
    createdAt INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (examId) REFERENCES exams(id)
  );

  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_exams_userId ON exams(userId);
  CREATE INDEX IF NOT EXISTS idx_results_userId ON results(userId);
`);

const userQueries = {
  create: db.prepare(`
    INSERT INTO users (name, email, password, role, avatar)
    VALUES (?, ?, ?, ?, ?)
  `),
  
  findByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),
  
  findById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),
  
  updateLoginAttempts: db.prepare(`
    UPDATE users SET loginAttempts = ?, lockUntil = ?, updatedAt = strftime('%s', 'now')
    WHERE id = ?
  `),
  
  resetLoginAttempts: db.prepare(`
    UPDATE users SET loginAttempts = 0, lockUntil = NULL, updatedAt = strftime('%s', 'now')
    WHERE id = ?
  `),
  
  update: db.prepare(`
    UPDATE users SET name = ?, avatar = ?, updatedAt = strftime('%s', 'now')
    WHERE id = ?
  `),
  
  updatePassword: db.prepare(`
    UPDATE users SET password = ?, updatedAt = strftime('%s', 'now')
    WHERE id = ?
  `)
};

const examQueries = {
  create: db.prepare(`
    INSERT INTO exams (userId, title, subjects, duration, totalQuestions, status, startTime)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  
  findById: db.prepare(`
    SELECT * FROM exams WHERE id = ?
  `),
  
  findByUserId: db.prepare(`
    SELECT * FROM exams WHERE userId = ? ORDER BY createdAt DESC
  `),
  
  updateStatus: db.prepare(`
    UPDATE exams SET status = ?, endTime = ?, submittedAt = ?, score = ?
    WHERE id = ?
  `)
};

const answerQueries = {
  create: db.prepare(`
    INSERT INTO exam_answers (examId, questionId, answer, isCorrect, timeSpent, flagged)
    VALUES (?, ?, ?, ?, ?, ?)
  `),
  
  findByExamId: db.prepare(`
    SELECT * FROM exam_answers WHERE examId = ?
  `),
  
  updateAnswer: db.prepare(`
    UPDATE exam_answers SET answer = ?, isCorrect = ?, timeSpent = ?
    WHERE examId = ? AND questionId = ?
  `)
};

const resultQueries = {
  create: db.prepare(`
    INSERT INTO results (userId, examId, score, totalQuestions, correctAnswers, wrongAnswers, unanswered, timeSpent, percentage, subjects)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  
  findById: db.prepare(`
    SELECT * FROM results WHERE id = ?
  `),
  
  findByUserId: db.prepare(`
    SELECT * FROM results WHERE userId = ? ORDER BY createdAt DESC
  `),
  
  getStats: db.prepare(`
    SELECT 
      COUNT(*) as totalExams,
      AVG(percentage) as avgPercentage,
      MAX(percentage) as highestScore,
      SUM(timeSpent) as totalTimeSpent
    FROM results
    WHERE userId = ?
  `)
};

module.exports = {
  db,
  userQueries,
  examQueries,
  answerQueries,
  resultQueries
};
