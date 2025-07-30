import api from './api';

export const examService = {
  async createExam(examConfig) {
    try {
      const response = await api.post('/exams/create', examConfig);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create exam');
    }
  },

  async getExam(examId) {
    try {
      const response = await api.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get exam');
    }
  },

  async submitExam(examData) {
    try {
      const response = await api.post('/exams/submit', examData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit exam');
    }
  },

  async getUserResults(page = 1, limit = 10) {
    try {
      const response = await api.get(`/results?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get results');
    }
  },

  async getResult(resultId) {
    try {
      const response = await api.get(`/results/${resultId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get result');
    }
  },

  async getUserAnalytics() {
    try {
      const response = await api.get('/analytics/user');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get analytics');
    }
  },

  async getSubjectAnalytics(subject) {
    try {
      const response = await api.get(`/analytics/subject/${subject}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get subject analytics');
    }
  },

  async getPerformanceHistory(timeframe = '30d') {
    try {
      const response = await api.get(`/analytics/performance?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get performance history');
    }
  },

  async getLeaderboard(type = 'overall', timeframe = 'monthly') {
    try {
      const response = await api.get(`/leaderboard?type=${type}&timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get leaderboard');
    }
  },

  async getExamTypes() {
    try {
      const response = await api.get('/exams/types');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get exam types');
    }
  },

  async saveProgress(examId, progressData) {
    try {
      const response = await api.post(`/exams/${examId}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save progress');
    }
  },

  async getProgress(examId) {
    try {
      const response = await api.get(`/exams/${examId}/progress`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get progress');
    }
  },

  async extendExamTime(examId, additionalTime) {
    try {
      const response = await api.post(`/exams/${examId}/extend-time`, {
        additionalTime,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to extend exam time');
    }
  },

  async reportQuestion(questionId, reason, description) {
    try {
      const response = await api.post('/questions/report', {
        questionId,
        reason,
        description,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to report question');
    }
  },

  async getDashboardStats() {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get dashboard stats');
    }
  },

  async getRecentActivities() {
    try {
      const response = await api.get('/dashboard/activities');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get recent activities');
    }
  },
};