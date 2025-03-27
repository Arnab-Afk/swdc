import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

// Create context
const ApiContext = createContext(null);

// Custom hook to use the API context
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
  const [userProfile, setUserProfile] = useState(null);
  const [profileLastFetched, setProfileLastFetched] = useState(0);
  
  // Cache timeout (5 minutes in milliseconds)
  const CACHE_TIMEOUT = 5 * 60 * 1000;
  
  // Create axios instance with default config
  const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add request interceptor to include auth token
  api.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('auth_token');
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
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );
  
  // Create a memoized function for fetching profile
  const fetchProfileData = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    
    // Check if cache is valid (unless forceRefresh is true)
    if (!forceRefresh && 
        userProfile && 
        now - profileLastFetched < CACHE_TIMEOUT) {
      return userProfile;
    }
    
    try {
      setIsLoading(true);
      const response = await api.get('/api/users/profile');
      setUserProfile(response);
      setProfileLastFetched(now);
      return response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [userProfile, profileLastFetched]);
  
  // Initial profile fetch when user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !userProfile) {
      fetchProfileData().catch(err => console.error('Initial profile fetch failed:', err));
    }
  }, [fetchProfileData]);
  
  // API endpoints grouped by resource
  const endpoints = {
    auth: {
      login: (token) => api.post('/api/users/auth/validate', { token }),
      getProfile: () => api.get('/api/users/profile'),
    },
    user: {
      // Use cached profile data with the option to force refresh
      getProfile: (forceRefresh = false) => fetchProfileData(forceRefresh),
      updateProfile: async (userData) => {
        const result = await api.put('/api/users/profile', userData);
        // Update cache after successful update
        setUserProfile({...userProfile, ...userData});
        setProfileLastFetched(Date.now());
        return result;
      },
      addSkill: async (skillName) => {
        const result = await api.post('/api/users/skills', { skillName });
        // Update cache after adding skill
        if (userProfile && userProfile.skills) {
          setUserProfile({
            ...userProfile,
            skills: [...userProfile.skills, result]
          });
        }
        return result;
      },
      deleteSkill: async (skillId) => {
        const result = await api.delete(`/api/users/skills/${skillId}`);
        // Update cache after deleting skill
        if (userProfile && userProfile.skills) {
          setUserProfile({
            ...userProfile,
            skills: userProfile.skills.filter(skill => skill.id !== skillId)
          });
        }
        return result;
      },
      // Similar pattern for other user data modification methods
      addProject: async (projectName) => {
        const result = await api.post('/api/users/projects', { projectName });
        if (userProfile && userProfile.projects) {
          setUserProfile({
            ...userProfile,
            projects: [...userProfile.projects, result]
          });
        }
        return result;
      },
      deleteProject: async (projectId) => {
        const result = await api.delete(`/api/users/projects/${projectId}`);
        if (userProfile && userProfile.projects) {
          setUserProfile({
            ...userProfile,
            projects: userProfile.projects.filter(project => project.id !== projectId)
          });
        }
        return result;
      },
      addCertification: async (certificationName) => {
        const result = await api.post('/api/users/certifications', { certificationName });
        if (userProfile && userProfile.certifications) {
          setUserProfile({
            ...userProfile,
            certifications: [...userProfile.certifications, result]
          });
        }
        return result;
      },
      deleteCertification: async (certId) => {
        const result = await api.delete(`/api/users/certifications/${certId}`);
        if (userProfile && userProfile.certifications) {
          setUserProfile({
            ...userProfile,
            certifications: userProfile.certifications.filter(cert => cert.id !== certId)
          });
        }
        return result;
      },
      addExperience: async (data) => {
        const result = await api.post('/api/users/experiences', data);
        if (userProfile && userProfile.experiences) {
          setUserProfile({
            ...userProfile,
            experiences: [...userProfile.experiences, result]
          });
        }
        return result;
      },
      updateExperience: async (id, data) => {
        const result = await api.put(`/api/users/experiences/${id}`, data);
        if (userProfile && userProfile.experiences) {
          setUserProfile({
            ...userProfile,
            experiences: userProfile.experiences.map(exp => 
              exp.id === id ? {...exp, ...data} : exp
            )
          });
        }
        return result;
      },
      deleteExperience: async (id) => {
        const result = await api.delete(`/api/users/experiences/${id}`);
        if (userProfile && userProfile.experiences) {
          setUserProfile({
            ...userProfile,
            experiences: userProfile.experiences.filter(exp => exp.id !== id)
          });
        }
        return result;
      },
      getNotifications: () => api.get('/api/users/notifications'),
      markNotificationAsRead: (notificationId) => api.put(`/api/users/notifications/${notificationId}/read`),
      markAllNotificationsAsRead: () => api.put('/api/users/notifications/read-all'),
    },
    jobs: {
      getAll: (filters) => api.get('/api/jobs', { params: filters }),
      getById: (id) => api.get(`/api/jobs/${id}`),
      apply: (jobId, resumeId) => api.post('/api/applications', { jobId, resumeId }),
    },
    applications: {
      getAll: () => api.get('/api/applications'),
      getById: (id) => api.get(`/api/applications/${id}`),
    }
  };
  
  // Value to be provided by context
  const value = {
    api: endpoints,
    isLoading,
    error,
    clearError: () => setError(null),
    userProfile,  // Expose the cached profile directly
    refreshProfile: () => fetchProfileData(true), // Method to force refresh
  };
  
  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};