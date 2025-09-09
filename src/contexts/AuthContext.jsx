// src/contexts/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  useEffect(() => {
    // Set base URL for all requests
    axios.defaults.baseURL = 'http://localhost:4000';
    
    // Add request interceptor to include auth token
    axios.interceptors.request.use(
      (config) => {
        const token = getStoredToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token refresh
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = getStoredRefreshToken();
            if (refreshToken) {
              const response = await axios.post('/api/auth/refresh', { refreshToken });
              const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
              
              // Store new tokens
              storeTokens(accessToken, newRefreshToken);
              
              // Retry original request
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  // Check authentication status on app load
  const checkAuthStatus = async () => {
    try {
      const token = getStoredToken();
      if (token) {
        const response = await axios.get('/api/auth/me');
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.log('No valid token found');
      clearStoredTokens();
    } finally {
      setLoading(false);
    }
  };

  // Store tokens in memory (not localStorage)
  const storeTokens = (accessToken, refreshToken) => {
    // Store in sessionStorage for the current session only
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  };

  // Get stored access token
  const getStoredToken = () => {
    return sessionStorage.getItem('accessToken');
  };

  // Get stored refresh token
  const getStoredRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
  };

  // Clear stored tokens
  const clearStoredTokens = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/login', { email, password });
      const { user: userData, tokens } = response.data.data;
      
      // Store tokens
      storeTokens(tokens.accessToken, tokens.refreshToken);
      
      // Set user
      setUser(userData);
      
      return userData;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/register', userData);
      const { user: newUser, tokens } = response.data.data;
      
      // Store tokens
      storeTokens(tokens.accessToken, tokens.refreshToken);
      
      // Set user
      setUser(newUser);
      
      return newUser;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if user is authenticated
      if (user) {
        await axios.post('/api/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user state and tokens
      setUser(null);
      clearStoredTokens();
      setError(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put('/api/auth/me', profileData);
      const updatedUser = response.data.data.user;
      
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.put('/api/auth/change-password', { currentPassword, newPassword });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.post('/api/auth/forgot-password', { email });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset request failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.put(`/api/auth/reset-password/${token}`, { newPassword });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    clearError,
    isAuthenticated: !!user,
    userRole: user?.role
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