// User-related API services
import api from './api';

const userService = {
  // Get user profile with all relations
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/profile', userData);
    return response.data;
  },

  // Add a skill
  addSkill: async (skillName) => {
    const response = await api.post('/user/skills', { skillName });
    return response.data;
  },

  // Get all users (admin/TPO access)
  getAllUsers: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  // Add experience
  addExperience: async (experienceData) => {
    const response = await api.post('/user/experiences', experienceData);
    return response.data;
  },

  // Add project
  addProject: async (projectName) => {
    const response = await api.post('/user/projects', { projectName });
    return response.data;
  },

  // Add certification
  addCertification: async (certificationName) => {
    const response = await api.post('/user/certifications', { certificationName });
    return response.data;
  },

  // Add interested role
  addInterestedRole: async (roleName) => {
    const response = await api.post('/user/roles', { roleName });
    return response.data;
  },

  // Add interested company
  addInterestedCompany: async (companyName) => {
    const response = await api.post('/user/companies', { companyName });
    return response.data;
  }
};

export default userService;