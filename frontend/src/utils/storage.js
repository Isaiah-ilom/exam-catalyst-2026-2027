import { STORAGE_KEYS } from './constants';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  exists: (key) => {
    return localStorage.getItem(key) !== null;
  },

  // Session storage methods
  session: {
    get: (key, defaultValue = null) => {
      try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error(`Error getting ${key} from sessionStorage:`, error);
        return defaultValue;
      }
    },

    set: (key, value) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Error setting ${key} in sessionStorage:`, error);
        return false;
      }
    },

    remove: (key) => {
      try {
        sessionStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error(`Error removing ${key} from sessionStorage:`, error);
        return false;
      }
    },

    clear: () => {
      try {
        sessionStorage.clear();
        return true;
      } catch (error) {
        console.error('Error clearing sessionStorage:', error);
        return false;
      }
    },

    exists: (key) => {
      return sessionStorage.getItem(key) !== null;
    }
  }
};

// Application-specific storage helpers
export const userStorage = {
  getUser: () => storage.get(STORAGE_KEYS.USER),
  setUser: (user) => storage.set(STORAGE_KEYS.USER, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),
  
  getToken: () => storage.get(STORAGE_KEYS.TOKEN),
  setToken: (token) => storage.set(STORAGE_KEYS.TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),
  
  getPreferences: () => storage.get(STORAGE_KEYS.PREFERENCES, {
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSave: true
  }),
  setPreferences: (preferences) => storage.set(STORAGE_KEYS.PREFERENCES, preferences),
  
  getExamSettings: () => storage.get(STORAGE_KEYS.EXAM_SETTINGS, {
    autoSubmit: true,
    showTimer: true,
    allowReview: true,
    randomizeQuestions: false
  }),
  setExamSettings: (settings) => storage.set(STORAGE_KEYS.EXAM_SETTINGS, settings)
};

// Exam session storage (temporary data)
export const examStorage = {
  getCurrentExam: () => storage.session.get(STORAGE_KEYS.CURRENT_EXAM),
  setCurrentExam: (exam) => storage.session.set(STORAGE_KEYS.CURRENT_EXAM, exam),
  removeCurrentExam: () => storage.session.remove(STORAGE_KEYS.CURRENT_EXAM),
  
  getExamProgress: () => storage.session.get(STORAGE_KEYS.EXAM_PROGRESS, {
    currentQuestion: 0,
    answers: {},
    flagged: [],
    timeRemaining: 0,
    startTime: null
  }),
  setExamProgress: (progress) => storage.session.set(STORAGE_KEYS.EXAM_PROGRESS, progress),
  removeExamProgress: () => storage.session.remove(STORAGE_KEYS.EXAM_PROGRESS),
  
  getDraftAnswers: () => storage.session.get(STORAGE_KEYS.DRAFT_ANSWERS, {}),
  setDraftAnswers: (answers) => storage.session.set(STORAGE_KEYS.DRAFT_ANSWERS, answers),
  removeDraftAnswers: () => storage.session.remove(STORAGE_KEYS.DRAFT_ANSWERS)
};

// Study materials storage
export const studyStorage = {
  getBookmarks: () => storage.get(STORAGE_KEYS.BOOKMARKS, []),
  setBookmarks: (bookmarks) => storage.set(STORAGE_KEYS.BOOKMARKS, bookmarks),
  addBookmark: (bookmark) => {
    const bookmarks = studyStorage.getBookmarks();
    const updatedBookmarks = [...bookmarks, { ...bookmark, id: Date.now() }];
    return studyStorage.setBookmarks(updatedBookmarks);
  },
  removeBookmark: (bookmarkId) => {
    const bookmarks = studyStorage.getBookmarks();
    const filteredBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
    return studyStorage.setBookmarks(filteredBookmarks);
  },
  
  getNotes: () => storage.get(STORAGE_KEYS.NOTES, []),
  setNotes: (notes) => storage.set(STORAGE_KEYS.NOTES, notes),
  addNote: (note) => {
    const notes = studyStorage.getNotes();
    const newNote = {
      ...note,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedNotes = [...notes, newNote];
    return studyStorage.setNotes(updatedNotes);
  },
  updateNote: (noteId, updates) => {
    const notes = studyStorage.getNotes();
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    );
    return studyStorage.setNotes(updatedNotes);
  },
  removeNote: (noteId) => {
    const notes = studyStorage.getNotes();
    const filteredNotes = notes.filter(n => n.id !== noteId);
    return studyStorage.setNotes(filteredNotes);
  },
  
  getStudyPlans: () => storage.get(STORAGE_KEYS.STUDY_PLANS, []),
  setStudyPlans: (plans) => storage.set(STORAGE_KEYS.STUDY_PLANS, plans),
  
  getPerformanceData: () => storage.get(STORAGE_KEYS.PERFORMANCE_DATA, {
    totalExams: 0,
    averageScore: 0,
    bestScore: 0,
    subjectScores: {},
    weakTopics: [],
    studyTime: 0,
    streak: 0
  }),
  setPerformanceData: (data) => storage.set(STORAGE_KEYS.PERFORMANCE_DATA, data)
};

// Cache management
export const cacheStorage = {
  get: (key, maxAge = 3600000) => { // Default: 1 hour
    const cached = storage.get(`cache_${key}`);
    if (!cached) return null;
    
    const { data, timestamp } = cached;
    const now = Date.now();
    
    if (now - timestamp > maxAge) {
      storage.remove(`cache_${key}`);
      return null;
    }
    
    return data;
  },
  
  set: (key, data) => {
    return storage.set(`cache_${key}`, {
      data,
      timestamp: Date.now()
    });
  },
  
  remove: (key) => storage.remove(`cache_${key}`),
  
  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return false;
    }
  }
};

// Utility functions
export const storageUtils = {
  // Get storage size in bytes
  getStorageSize: () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  },
  
  // Format storage size for display
  formatStorageSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // Check if storage is available
  isStorageAvailable: (type = 'localStorage') => {
    try {
      const storage = window[type];
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },
  
  // Backup all application data
  backup: () => {
    const backup = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      if (storage.exists(key)) {
        backup[key] = storage.get(key);
      }
    });
    return backup;
  },
  
  // Restore from backup
  restore: (backupData) => {
    try {
      Object.entries(backupData).forEach(([key, value]) => {
        storage.set(key, value);
      });
      return true;
    } catch (error) {
      console.error('Error restoring backup:', error);
      return false;
    }
  },
  
  // Clean up expired cache and temporary data
  cleanup: () => {
    try {
      // Clear expired cache
      cacheStorage.clear();
      
      // Clear old session data if any
      const keys = Object.keys(sessionStorage);
      keys.forEach(key => {
        if (key.includes('temp_') || key.includes('draft_')) {
          sessionStorage.removeItem(key);
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error during cleanup:', error);
      return false;
    }
  }
};

export default storage;