import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const ApiContext = createContext(null);

// Custom hook to use the context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tpoProfile, setTpoProfile] = useState(null);
  const [profileLastFetched, setProfileLastFetched] = useState(0);
  
  // Create base axios instance
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add request interceptor to include auth token
  api.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('tpo_auth_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      setIsLoading(false);
      setError(error.message);
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => {
      setIsLoading(false);
      return response.data;
    },
    (error) => {
      setIsLoading(false);
      
      // Set error message based on response
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      
      // Handle authentication errors
      if (error.response?.status === 401) {
        localStorage.removeItem('tpo_auth_token');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );

  // Function to fetch profile data with caching
  const fetchProfileData = async (forceRefresh = false) => {
    // Check if we already have the profile and it's not too old
    const now = Date.now();
    const cacheTime = 5 * 60 * 1000; // 5 minutes cache
    
    if (
      !forceRefresh && 
      tpoProfile && 
      now - profileLastFetched < cacheTime
    ) {
      return tpoProfile;
    }
    
    try {
      const profileData = await api.get('/api/tpo/profile');
      setTpoProfile(profileData);
      setProfileLastFetched(now);
      return profileData;
    } catch (error) {
      console.error('Failed to fetch TPO profile:', error);
      throw error;
    }
  };

  // API endpoints grouped by resource
  const endpoints = {
    auth: {
      login: (credentials) => api.post('/api/tpo/auth/login', credentials),
      getCurrentUser: () => api.get('/api/tpo/auth/me'),
    },
    
    profile: {
      getProfile: (forceRefresh = false) => fetchProfileData(forceRefresh),
      updateProfile: async (userData) => {
        const result = await api.put('/api/tpo/profile', userData);
        setTpoProfile(prev => ({...prev, ...userData}));
        setProfileLastFetched(Date.now());
        return result;
      },
    },
    
    students: {
      getAll: (filters = {}) => api.get('/api/tpo/students', { params: filters }),
      getById: (id) => api.get(`/api/tpo/students/${id}`),
      update: (id, data) => api.put(`/api/tpo/students/${id}`, data),
      getPlacementStats: () => api.get('/api/tpo/reports/placement-stats'),
    },
    
    companies: {
      getAll: () => api.get('/api/tpo/companies'),
      getById: (id) => api.get(`/api/tpo/companies/${id}`),
      create: (data) => api.post('/api/tpo/companies', data),
      update: (id, data) => api.put(`/api/tpo/companies/${id}`, data),
      delete: (id) => api.delete(`/api/tpo/companies/${id}`),
    },
    
    jobs: {
      getAll: (filters = {}) => api.get('/api/tpo/jobs', { params: filters }),
      getById: (id) => api.get(`/api/tpo/jobs/${id}`),
      approve: (id) => api.put(`/api/tpo/jobs/${id}/approve`),
      reject: (id) => api.put(`/api/tpo/jobs/${id}/reject`),
      create: (data) => api.post('/api/tpo/jobs', data),
      update: (id, data) => api.put(`/api/tpo/jobs/${id}`, data),
    },
    
    applications: {
      getAll: (filters = {}) => api.get('/api/tpo/applications', { params: filters }),
      getById: (id) => api.get(`/api/tpo/applications/${id}`),
      updateStatus: (id, status) => api.put(`/api/tpo/applications/${id}/status`, { status }),
    },
    
    dashboard: {
      getStats: () => api.get('/api/tpo/dashboard/stats'),
      getRecentActivities: () => api.get('/api/tpo/dashboard/activities'),
      getUpcomingEvents: () => api.get('/api/tpo/dashboard/events'),
    },
  };

  // Expose the API and related state to consumers
  const value = {
    api: endpoints,
    isLoading,
    error,
    clearError: () => setError(null),
    tpoProfile,
    refreshProfile: () => fetchProfileData(true),
  };
  
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};