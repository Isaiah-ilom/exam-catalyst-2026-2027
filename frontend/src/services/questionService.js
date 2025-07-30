import api from './api';

export const questionService = {
  async getQuestions(params) {
    try {
      const response = await api.get('/questions', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get questions');
    }
  },

  async getPracticeQuestions(params) {
    try {
      const response = await api.get('/questions/practice', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get practice questions');
    }
  },

  async getQuestionsBySubject(subject, params = {}) {
    try {
      const response = await api.get(`/questions/subject/${subject}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get questions by subject');
    }
  },

  async getQuestionsByTopic(subject, topic, params = {}) {
    try {
      const response = await api.get(`/questions/topic/${subject}/${topic}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get questions by topic');
    }
  },

  async getQuestion(questionId) {
    try {
      const response = await api.get(`/questions/${questionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get question');
    }
  },

  async getSubjects() {
    try {
      const response = await api.get('/subjects');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get subjects');
    }
  },

  async getTopics(subject) {
    try {
      const response = await api.get(`/subjects/${subject}/topics`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get topics');
    }
  },

  async searchQuestions(query, filters = {}) {
    try {
      const response = await api.get('/questions/search', {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search questions');
    }
  },

  async getQuestionExplanation(questionId) {
    try {
      const response = await api.get(`/questions/${questionId}/explanation`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get explanation');
    }
  },

  async bookmarkQuestion(questionId) {
    try {
      const response = await api.post(`/questions/${questionId}/bookmark`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to bookmark question');
    }
  },

  async unbookmarkQuestion(questionId) {
    try {
      const response = await api.delete(`/questions/${questionId}/bookmark`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to unbookmark question');
    }
  },

  async getBookmarkedQuestions(params = {}) {
    try {
      const response = await api.get('/questions/bookmarked', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get bookmarked questions');
    }
  },

  async getQuestionStats(questionId) {
    try {
      const response = await api.get(`/questions/${questionId}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get question stats');
    }
  },

  async getRecommendedQuestions(params = {}) {
    try {
      const response = await api.get('/questions/recommended', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get recommended questions');
    }
  },

  async getMissedQuestions(params = {}) {
    try {
      const response = await api.get('/questions/missed', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get missed questions');
    }
  },

  async generateQuestionSet(config) {
    try {
      const response = await api.post('/questions/generate-set', config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to generate question set');
    }
  },

  async getQuestionDifficulty(questionId) {
    try {
      const response = await api.get(`/questions/${questionId}/difficulty`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get question difficulty');
    }
  },

  async updateQuestionDifficulty(questionId, difficulty) {
    try {
      const response = await api.put(`/questions/${questionId}/difficulty`, {
        difficulty
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update question difficulty');
    }
  },

  async getYearQuestions(year, subject = null) {
    try {
      const params = subject ? { subject } : {};
      const response = await api.get(`/questions/year/${year}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get year questions');
    }
  },

  async getAvailableYears() {
    try {
      const response = await api.get('/questions/years');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get available years');
    }
  },
};