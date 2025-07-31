import api from './api';

export const userService = {
  async getUserProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user profile');
    }
  },

  async updateUserProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  async getUserSettings() {
    try {
      const response = await api.get('/users/settings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user settings');
    }
  },

  async updateUserSettings(settings) {
    try {
      const response = await api.put('/users/settings', settings);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update settings');
    }
  },

  async getUserStats() {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user stats');
    }
  },

  async getUserAchievements() {
    try {
      const response = await api.get('/users/achievements');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get achievements');
    }
  },

  async getUserBadges() {
    try {
      const response = await api.get('/users/badges');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get badges');
    }
  },

  async getUserStudyStreak() {
    try {
      const response = await api.get('/users/study-streak');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get study streak');
    }
  },

  async updateStudyStreak() {
    try {
      const response = await api.post('/users/study-streak');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update study streak');
    }
  },

  async getUserGoals() {
    try {
      const response = await api.get('/users/goals');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user goals');
    }
  },

  async setUserGoal(goal) {
    try {
      const response = await api.post('/users/goals', goal);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to set user goal');
    }
  },

  async updateUserGoal(goalId, updates) {
    try {
      const response = await api.put(`/users/goals/${goalId}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user goal');
    }
  },

  async deleteUserGoal(goalId) {
    try {
      const response = await api.delete(`/users/goals/${goalId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user goal');
    }
  },

  async getUserPreferences() {
    try {
      const response = await api.get('/users/preferences');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user preferences');
    }
  },

  async updateUserPreferences(preferences) {
    try {
      const response = await api.put('/users/preferences', preferences);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update preferences');
    }
  },

  async deleteAccount() {
    try {
      const response = await api.delete('/users/account');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  },

  async exportUserData() {
    try {
      const response = await api.get('/users/export', {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export user data');
    }
  },

  async getUserNotifications() {
    try {
      const response = await api.get('/users/notifications');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get notifications');
    }
  },

  async markNotificationAsRead(notificationId) {
    try {
      const response = await api.put(`/users/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
    }
  },

  async markAllNotificationsAsRead() {
    try {
      const response = await api.put('/users/notifications/read-all');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark all notifications as read');
    }
  },

  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(`/users/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete notification');
    }
  },

  async getUserActivity(timeframe = '7d') {
    try {
      const response = await api.get(`/users/activity?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user activity');
    }
  },

  async reportUser(userId, reason, description) {
    try {
      const response = await api.post('/users/report', {
        userId,
        reason,
        description
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to report user');
    }
  },

  async blockUser(userId) {
    try {
      const response = await api.post(`/users/${userId}/block`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to block user');
    }
  },

  async unblockUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}/block`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to unblock user');
    }
  },

  async getBlockedUsers() {
    try {
      const response = await api.get('/users/blocked');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get blocked users');
    }
  },

  async followUser(userId) {
    try {
      const response = await api.post(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to follow user');
    }
  },

  async unfollowUser(userId) {
    try {
      const response = await api.delete(`/users/${userId}/follow`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to unfollow user');
    }
  },

  async getFollowers() {
    try {
      const response = await api.get('/users/followers');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get followers');
    }
  },

  async getFollowing() {
    try {
      const response = await api.get('/users/following');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get following');
    }
  },
};