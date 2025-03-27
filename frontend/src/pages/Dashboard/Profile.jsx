import { useState, useEffect } from 'react';
import { useApi } from '../../contexts/ApiContext';

const Profile = () => {
  const { api, isLoading } = useApi();
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState(null);
  const [personalForm, setPersonalForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [educationForm, setEducationForm] = useState({
    degree: '',
    branch: '',
    yearOfGraduation: '',
    cgpa: '',
    rollno: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.user.getProfile();
        setProfile(data);
        
        // Set form state with user data
        setPersonalForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        });
        
        setEducationForm({
          degree: data.degree || '',
          branch: data.branch || '',
          yearOfGraduation: data.yearOfGraduation || '',
          cgpa: data.cgpa || '',
          rollno: data.rollno || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [api]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Update personal information
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.user.updateProfile(personalForm);
      alert('Personal information updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };
  
  // Update education information
  const handleEducationSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.user.updateProfile(educationForm);
      alert('Education information updated successfully');
    } catch (error) {
      console.error('Error updating education information:', error);
      alert('Failed to update education information');
    }
  };
  
  // Add a new skill
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    try {
      const addedSkill = await api.user.addSkill(newSkill);
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, addedSkill]
      }));
      setNewSkill('');
    } catch (error) {
      console.error('Error adding skill:', error);
      alert('Failed to add skill');
    }
  };
  
  // Delete skill
  const handleDeleteSkill = async (skillId) => {
    try {
      await api.user.deleteSkill(skillId);
      setProfile(prev => ({
        ...prev,
        skills: prev.skills.filter(skill => skill.id !== skillId)
      }));
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Failed to delete skill');
    }
  };
  
  // Add certification
  const handleAddCertification = async (e) => {
    e.preventDefault();
    if (!newCertification.trim()) return;
    
    try {
      const addedCertification = await api.user.addCertification(newCertification);
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, addedCertification]
      }));
      setNewCertification('');
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Failed to add certification');
    }
  };
  
  // Delete certification
  const handleDeleteCertification = async (certId) => {
    try {
      await api.user.deleteCertification(certId);
      setProfile(prev => ({
        ...prev,
        certifications: prev.certifications.filter(cert => cert.id !== certId)
      }));
    } catch (error) {
      console.error('Error deleting certification:', error);
      alert('Failed to delete certification');
    }
  };
  
  // Add project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    
    try {
      const addedProject = await api.user.addProject(newProject);
      setProfile(prev => ({
        ...prev,
        projects: [...prev.projects, addedProject]
      }));
      setNewProject('');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Profile Management</h2>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-center ${
              activeTab === 'personal' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleTabChange('personal')}
          >
            Personal Info
          </button>
          <button
            className={`px-6 py-3 text-center ${
              activeTab === 'education' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleTabChange('education')}
          >
            Education
          </button>
          <button
            className={`px-6 py-3 text-center ${
              activeTab === 'experience' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleTabChange('experience')}
          >
            Experience
          </button>
          <button
            className={`px-6 py-3 text-center ${
              activeTab === 'skills' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleTabChange('skills')}
          >
            Skills
          </button>
          <button
            className={`px-6 py-3 text-center ${
              activeTab === 'resume' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleTabChange('resume')}
          >
            Resume
          </button>
        </div>
        
        {/* Personal Info */}
        {activeTab === 'personal' && (
          <div className="p-6">
            <form onSubmit={handlePersonalSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={personalForm.firstName}
                    onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={personalForm.lastName}
                    onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={personalForm.email}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={personalForm.phone}
                    onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    value={personalForm.address}
                    onChange={(e) => setPersonalForm({ ...personalForm, address: e.target.value })}
                  ></textarea>
                </div>
              </div>
              <div className="mt-6">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Education */}
        {activeTab === 'education' && (
          <div className="p-6">
            <form onSubmit={handleEducationSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={educationForm.degree}
                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={educationForm.branch}
                    onChange={(e) => setEducationForm({ ...educationForm, branch: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Graduation</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={educationForm.yearOfGraduation}
                    onChange={(e) => setEducationForm({ ...educationForm, yearOfGraduation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={educationForm.cgpa}
                    onChange={(e) => setEducationForm({ ...educationForm, cgpa: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={educationForm.rollno}
                    onChange={(e) => setEducationForm({ ...educationForm, rollno: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-6">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Experience */}
        {activeTab === 'experience' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Work Experience</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Software Developer Intern</h4>
                    <p className="text-gray-600">Tech Corp</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    May 2024 - Aug 2024
                  </div>
                </div>
                <p className="text-gray-700">
                  Worked on developing and maintaining web applications using React and Node.js.
                </p>
                <div className="mt-2 flex justify-end">
                  <button className="text-indigo-600 hover:text-indigo-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
              
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mt-2"
              >
                + Add Experience
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Projects</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">E-commerce Platform</h4>
                  <div className="flex">
                    <button className="text-indigo-600 hover:text-indigo-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Task Management App</h4>
                  <div className="flex">
                    <button className="text-indigo-600 hover:text-indigo-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              </div>
              
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mt-2"
              >
                + Add Project
              </button>
            </div>
          </div>
        )}
        
        {/* Skills */}
        {activeTab === 'skills' && (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Skills</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {profile.skills.map(skill => (
                <div key={skill.id} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                  {skill.name}
                  <button className="ml-2 text-indigo-600 hover:text-indigo-800" onClick={() => handleDeleteSkill(skill.id)}>×</button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add a skill"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Certifications</h3>
              
              {profile.certifications.map(cert => (
                <div key={cert.id} className="bg-gray-50 p-4 rounded-lg mb-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{cert.name}</h4>
                    <div className="flex">
                      <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteCertification(cert.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex gap-2 mt-4">
                <input 
                  type="text" 
                  placeholder="Add a certification"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                />
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={handleAddCertification}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Resume */}
        {activeTab === 'resume' && (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Resume Management</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2">Current Resumes</h4>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Resume_Technical.pdf</span>
                  </div>
                  <div>
                    <button className="text-indigo-600 hover:text-indigo-800 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-800">Remove</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>Resume_Research.pdf</span>
                  </div>
                  <div>
                    <button className="text-indigo-600 hover:text-indigo-800 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-800">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Upload New Resume</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  Drag and drop your resume, or <span className="text-indigo-600 font-medium">browse</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">PDF, DOCX up to 5MB</p>
                <input type="file" className="hidden" />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Technical Resume"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <button 
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Upload Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;