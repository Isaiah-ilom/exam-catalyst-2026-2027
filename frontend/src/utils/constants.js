export const SUBJECTS = {
  MATHEMATICS: 'Mathematics',
  ENGLISH: 'English Language',
  PHYSICS: 'Physics',
  CHEMISTRY: 'Chemistry',
  BIOLOGY: 'Biology',
  GEOGRAPHY: 'Geography',
  ECONOMICS: 'Economics',
  GOVERNMENT: 'Government',
  LITERATURE: 'Literature in English',
  HISTORY: 'History',
  CRS: 'Christian Religious Studies',
  IRS: 'Islamic Religious Studies',
  COMMERCE: 'Commerce',
  ACCOUNTING: 'Financial Accounting',
  CIVIC_EDUCATION: 'Civic Education',
  FRENCH: 'French',
  HAUSA: 'Hausa',
  IGBO: 'Igbo',
  YORUBA: 'Yoruba',
};

export const CORE_SUBJECTS = [
  SUBJECTS.MATHEMATICS,
  SUBJECTS.ENGLISH,
  SUBJECTS.PHYSICS,
  SUBJECTS.CHEMISTRY,
];

export const OPTIONAL_SUBJECTS = Object.values(SUBJECTS).filter(
  subject => !CORE_SUBJECTS.includes(subject)
);

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  MIXED: 'mixed',
};

export const EXAM_TYPES = {
  UTME: 'utme',
  POST_UTME: 'post_utme',
  PRACTICE: 'practice',
  MOCK: 'mock',
  CHALLENGE: 'challenge',
  CUSTOM: 'custom',
};

export const EXAM_MODES = {
  TIMED: 'timed',
  UNTIMED: 'untimed',
  PRACTICE: 'practice',
  EXAM: 'exam',
};

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  FILL_IN_BLANK: 'fill_in_blank',
  ESSAY: 'essay',
};

export const EXAM_DURATIONS = {
  PRACTICE: 30, // minutes
  MOCK: 120,
  UTME: 180,
  POST_UTME: 90,
  CHALLENGE: 15,
  CUSTOM: 60,
};

export const QUESTIONS_PER_SUBJECT = {
  UTME: 40,
  POST_UTME: 20,
  MOCK: 40,
  PRACTICE: 20,
  CHALLENGE: 10,
  CUSTOM: 20,
};

export const EXAM_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
  SUBMITTED: 'submitted',
};

export const RESULT_STATUS = {
  PENDING: 'pending',
  GRADED: 'graded',
  REVIEWED: 'reviewed',
};

export const PERFORMANCE_GRADES = {
  EXCELLENT: { min: 80, max: 100, label: 'Excellent', color: 'green' },
  VERY_GOOD: { min: 70, max: 79, label: 'Very Good', color: 'blue' },
  GOOD: { min: 60, max: 69, label: 'Good', color: 'yellow' },
  FAIR: { min: 50, max: 59, label: 'Fair', color: 'orange' },
  POOR: { min: 0, max: 49, label: 'Poor', color: 'red' },
};

export const STUDY_GOALS = {
  DAILY_QUESTIONS: 'daily_questions',
  WEEKLY_HOURS: 'weekly_hours',
  MONTHLY_EXAMS: 'monthly_exams',
  SUBJECT_MASTERY: 'subject_mastery',
  SCORE_TARGET: 'score_target',
};

export const ACHIEVEMENT_TYPES = {
  STREAK: 'streak',
  QUESTIONS_ANSWERED: 'questions_answered',
  EXAMS_COMPLETED: 'exams_completed',
  PERFECT_SCORE: 'perfect_score',
  IMPROVEMENT: 'improvement',
  CONSISTENCY: 'consistency',
  SPEED: 'speed',
  ACCURACY: 'accuracy',
};

export const BADGE_CATEGORIES = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
  MASTER: 'master',
};

export const NOTIFICATION_TYPES = {
  EXAM_REMINDER: 'exam_reminder',
  RESULT_READY: 'result_ready',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  STUDY_STREAK: 'study_streak',
  WEEKLY_REPORT: 'weekly_report',
  SYSTEM_UPDATE: 'system_update',
  CHALLENGE_INVITE: 'challenge_invite',
};

export const CHART_COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#64748b',
  ACCENT: '#d946ef',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  EXAMS: '/exams',
  QUESTIONS: '/questions',
  RESULTS: '/results',
  SUBJECTS: '/subjects',
  ANALYTICS: '/analytics',
  LEADERBOARD: '/leaderboard',
  DASHBOARD: '/dashboard',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  EXAM_TIME_UP: 'Time is up! Your exam has been submitted automatically.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTRATION_SUCCESS: 'Registration successful! Welcome to Exam Catalyst 2026!',
  EXAM_SUBMITTED: 'Exam submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^(\+234|234|0)[789][01]\d{8}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/,
};

export const DEFAULT_SETTINGS = {
  theme: 'light',
  notifications: {
    email: true,
    push: true,
    examReminders: true,
    resultNotifications: true,
    weeklyReports: true,
  },
  exam: {
    showTimer: true,
    autoSave: true,
    showProgress: true,
    allowCalculator: true,
    confirmSubmit: true,
  },
  privacy: {
    showProfile: true,
    showStats: true,
    allowMessages: true,
  },
};

export const GAMIFICATION = {
  POINTS: {
    QUESTION_CORRECT: 10,
    QUESTION_STREAK: 5,
    EXAM_COMPLETION: 50,
    PERFECT_SCORE: 100,
    DAILY_LOGIN: 5,
    STUDY_STREAK: 20,
  },
  LEVELS: {
    BRONZE: { min: 0, max: 499 },
    SILVER: { min: 500, max: 1499 },
    GOLD: { min: 1500, max: 2999 },
    PLATINUM: { min: 3000, max: 4999 },
    DIAMOND: { min: 5000, max: 9999 },
    MASTER: { min: 10000, max: Infinity },
  },
};

export const STORAGE_KEYS = {
  // Authentication & User Data
  AUTH_TOKEN: 'authToken',
  USER: 'exam_catalyst_user',
  TOKEN: 'exam_catalyst_token', // Alternative token key
  USER_PREFERENCES: 'userPreferences',
  PREFERENCES: 'exam_catalyst_preferences', // Extended preferences
  
  // Exam & Session Data
  EXAM_PROGRESS: 'examProgress',
  CURRENT_EXAM: 'exam_catalyst_current_exam',
  DRAFT_ANSWERS: 'exam_catalyst_draft_answers',
  EXAM_SETTINGS: 'exam_catalyst_exam_settings',
  
  // UI & Display Settings
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebarCollapsed',
  
  // Study Materials & Progress
  BOOKMARKS: 'exam_catalyst_bookmarks',
  NOTES: 'exam_catalyst_notes',
  STUDY_PLANS: 'exam_catalyst_study_plans',
  PERFORMANCE_DATA: 'exam_catalyst_performance_data',
  
  // Tools & Utilities
  CALCULATOR_HISTORY: 'calculatorHistory',
  
  // Cache & Temporary Data
  CACHE_PREFIX: 'cache_',
  TEMP_PREFIX: 'temp_',
  
  // Analytics & Tracking
  USER_ANALYTICS: 'exam_catalyst_analytics',
  STUDY_STREAKS: 'exam_catalyst_streaks',
  ACHIEVEMENTS: 'exam_catalyst_achievements',
};