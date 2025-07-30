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
      throw new Error