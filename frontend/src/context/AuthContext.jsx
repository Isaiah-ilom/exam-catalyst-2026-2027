import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        dispatch({ type: 'AUTH_FAILURE', payload: null });
        return;
      }

      const userData = await authService.getCurrentUser();
      dispatch({ type: 'AUTH_SUCCESS', payload: userData });
    } catch (error) {
      localStorage.removeItem('authToken');
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.register(userData);
      
      localStorage.setItem('authToken', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
      
      toast.success('Registration successful! Welcome to Exam Catalyst 2026!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login(credentials);
      
      localStorage.setItem('authToken', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
      
      toast.success(`Welcome back, ${response.user.firstName}!`);
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('authToken');
      dispatch({ type: 'LOGOUT' });
      toast.success('Logged out successfully');
    } catch (error) {
      localStorage.removeItem('authToken');
      dispatch({ type: 'LOGOUT' });
      toast.error('Logout failed');
    }
  };

  const forgotPassword = async (email) => {
    try {
      dispatch({ type: 'AUTH_START' });
      await authService.forgotPassword(email);
      dispatch({ type: 'CLEAR_ERROR' });
      toast.success('Password reset link sent to your email');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      toast.error(error.message || 'Failed to send reset link');
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      dispatch({ type: 'AUTH_START' });
      await authService.resetPassword(token, newPassword);
      dispatch({ type: 'CLEAR_ERROR' });
      toast.success('Password reset successful');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      toast.error(error.message || 'Password reset failed');
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const updatedUser = await authService.updateProfile(userData);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Profile update failed');
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authService.changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Password change failed');
      return { success: false, error: error.message };
    }
  };

  const value = {
    ...state,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};