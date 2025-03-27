import { useState, useEffect } from 'react';
import { FaBriefcase, FaPlus, FaPen, FaTrash, FaCalendarAlt, FaBuilding, FaLayerGroup, FaLink, FaCode } from 'react-icons/fa';
import { useApi } from '../../contexts/ApiContext';

const Experience = () => {
  const { api, isLoading: apiLoading } = useApi();
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    id: null,
    company: '',
    profile: '',
    fromDate: '',
    toDate: '',
    description: '',
    isEditing: false
  });
  const [currentProject, setCurrentProject] = useState({
    id: null,
    projectName: '',
    description: '',
    technologies: '',
    url: '',
    isEditing: false
  });
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profileData = await api.user.getProfile();
        
        // Extract experiences and projects from profile data
        setExperiences(profileData.experiences || []);
        setProjects(profileData.projects || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [api]);
  
  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { isEditing, ...experienceData } = currentExperience;
      
      if (isEditing) {
        // Update existing experience
        await api.user.updateExperience(experienceData.id, experienceData);
        setExperiences(prev => prev.map(exp => 
          exp.id === experienceData.id ? experienceData : exp
        ));
      } else {
        // Add new experience
        const newExperience = await api.user.addExperience(experienceData);
        setExperiences(prev => [...prev, newExperience]);
      }
      
      // Reset form and close modal
      setCurrentExperience({
        id: null,
        company: '',
        profile: '',
        fromDate: '',
        toDate: '',
        description: '',
        isEditing: false
      });
      setIsAddingExperience(false);
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };
  
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { isEditing, ...projectData } = currentProject;
      
      if (isEditing) {
        // Update existing project
        await api.user.updateProject(projectData.id, projectData);
        setProjects(prev => prev.map(proj => 
          proj.id === projectData.id ? projectData : proj
        ));
      } else {
        // Add new project
        const newProject = await api.user.addProject(projectData);
        setProjects(prev => [...prev, newProject]);
      }
      
      // Reset form and close modal
      setCurrentProject({
        id: null,
        projectName: '',
        description: '',
        technologies: '',
        url: '',
        isEditing: false
      });
      setIsAddingProject(false);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };
  
  const editExperience = (experience) => {
    setCurrentExperience({ ...experience, isEditing: true });
    setIsAddingExperience(true);
  };
  
  const editProject = (project) => {
    setCurrentProject({ ...project, isEditing: true });
    setIsAddingProject(true);
  };
  
  const deleteExperience = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      // Delete experience from API
      await api.user.deleteExperience(id);
      
      // Remove from state
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };
  
  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      // Delete project from API
      await api.user.deleteProject(id);
      
      // Remove from state
      setProjects(prev => prev.filter(proj => proj.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Work Experience Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          <button 
            onClick={() => {
              setCurrentExperience({
                id: null,
                company: '',
                profile: '',
                fromDate: '',
                toDate: '',
                description: '',
                isEditing: false
              });
              setIsAddingExperience(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add Experience</span>
          </button>
        </div>
        
        {experiences.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaBriefcase className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="font-medium text-gray-700 mb-1">No work experience added yet</h3>
            <p className="text-gray-500 text-sm">Add your internships or job experiences to showcase your professional background</p>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map(experience => (
              <div key={experience.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{experience.profile}</h3>
                      <p className="text-indigo-600">{experience.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(experience.fromDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                        {experience.toDate ? new Date(experience.toDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => editExperience(experience)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600"
                      >
                        <FaPen size={14} />
                      </button>
                      <button 
                        onClick={() => deleteExperience(experience.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{experience.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <button 
            onClick={() => {
              setCurrentProject({
                id: null,
                projectName: '',
                description: '',
                technologies: '',
                url: '',
                isEditing: false
              });
              setIsAddingProject(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add Project</span>
          </button>
        </div>
        
        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaLayerGroup className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="font-medium text-gray-700 mb-1">No projects added yet</h3>
            <p className="text-gray-500 text-sm">Showcase your skills by adding projects you've worked on</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{project.projectName}</h3>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => editProject(project)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600"
                      >
                        <FaPen size={14} />
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 line-clamp-3">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.split(',').map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Experience Modal */}
      {isAddingExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {currentExperience.isEditing ? 'Edit Experience' : 'Add New Experience'}
            </h2>
            
            <form onSubmit={handleExperienceSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="company"
                      value={currentExperience.company}
                      onChange={handleExperienceChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title/Profile</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBriefcase className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="profile"
                      value={currentExperience.profile}
                      onChange={handleExperienceChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        name="fromDate"
                        value={currentExperience.fromDate}
                        onChange={handleExperienceChange}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        name="toDate"
                        value={currentExperience.toDate}
                        onChange={handleExperienceChange}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave empty if currently working</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description"
                    value={currentExperience.description}
                    onChange={handleExperienceChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Describe your responsibilities and achievements"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsAddingExperience(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {currentExperience.isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {currentProject.isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleProjectSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLayerGroup className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="projectName"
                      value={currentProject.projectName}
                      onChange={handleProjectChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description"
                    value={currentProject.description}
                    onChange={handleProjectChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Describe your project and its features"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCode className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="technologies"
                      value={currentProject.technologies}
                      onChange={handleProjectChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLink className="text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      name="url"
                      value={currentProject.url}
                      onChange={handleProjectChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., GitHub repo or live demo URL"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsAddingProject(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {currentProject.isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;