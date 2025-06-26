import axios from 'axios';

// Base API configuration
const API_BASE_URL = `${process.env.VITE_API_URL || 'http://localhost:8000'}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Service functions
export const apiService = {
  // Basic endpoints
  getStatus: () => api.get('/status/'),
  
  // Authentication endpoints
  signup: (userData) => api.post('/auth/signup/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  getCurrentUser: () => api.get('/auth/me/'),

  // Employee endpoints
  getEmployees: () => api.get('/employees/'),
  getUserDetails: (userId) => api.get(`/user-details/${userId}/`),
  getCurrentUserDetails: () => api.get('/user-details/me/'),
};

export default api; 