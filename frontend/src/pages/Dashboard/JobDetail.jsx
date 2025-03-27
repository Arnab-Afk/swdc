import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, 
         FaGraduationCap, FaLaptopCode, FaClock, FaFileAlt } from 'react-icons/fa';
import { useApi } from '../../contexts/ApiContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api, isLoading: apiLoading, userProfile } = useApi();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState('');
  const [userResumes, setUserResumes] = useState([]);
  const [applied, setApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const jobData = await api.jobs.getById(id);
        setJob(jobData);
        
        // If user profile is available, get their resumes
        if (userProfile && userProfile.resumes) {
          setUserResumes(userProfile.resumes);
        } else {
          // Otherwise fetch profile to get resumes
          const profileData = await api.user.getProfile();
          setUserResumes(profileData.resumes || []);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id, api, userProfile]);
  
  const handleApply = async () => {
    if (!selectedResume) {
      alert('Please select a resume');
      return;
    }
    
    try {
      await api.jobs.apply(id, selectedResume);
      setApplied(true);
      setShowModal(false);
      
      // Navigate to applications page after successful application
      setTimeout(() => {
        navigate('/dashboard/applications');
      }, 1500);
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to apply for this job. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (!job) {
    return <div className="text-center py-8">Job not found</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Job Header */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img 
                src={job.imgurl || 'https://via.placeholder.com/150'} 
                alt={job.companyName} 
                className="h-20 w-20 object-cover rounded-md border border-gray-200"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h1>
              <p className="text-lg text-gray-600 mt-1">{job.companyName}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {job.location}
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="mr-1" /> {job.salary}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> Posted: {new Date(job.postedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1 text-amber-500" /> 
                  <span className="text-amber-500 font-medium">Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              {applied ? (
                <div className="px-5 py-2.5 bg-green-100 rounded-lg text-green-700 text-center">
                  Applied Successfully
                </div>
              ) : (
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Job Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </section>

              {/* Skills Required */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span 
                      key={skill.id} 
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {skill.skillName}
                    </span>
                  ))}
                </div>
              </section>
              
              {/* Selection Process */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Selection Process</h2>
                <div className="relative">
                  {/* Process Timeline */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
                  
                  <div className="space-y-4 ml-2">
                    {job.processSteps.map((step, index) => (
                      <div key={step.id} className="relative pl-10">
                        <div className="absolute left-0 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-2 border-indigo-200 bg-white text-indigo-600 font-bold">
                          {step.stepNumber}
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <h3 className="font-medium">{step.stepName}</h3>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          <div className="flex flex-wrap gap-x-3 mt-2 text-xs text-gray-500">
                            {step.fromDate && step.tillDate && (
                              <span className="flex items-center">
                                <FaCalendarAlt className="mr-1" /> 
                                {new Date(step.fromDate).toLocaleDateString()} to {new Date(step.tillDate).toLocaleDateString()}
                              </span>
                            )}
                            {step.location && (
                              <span className="flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {step.location}
                              </span>
                            )}
                            {step.durationMinutes && (
                              <span className="flex items-center">
                                <FaClock className="mr-1" /> {step.durationMinutes} minutes
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
            
            {/* Sidebar - Job Qualifications & Company Info */}
            <div className="space-y-6">
              {/* Eligibility Criteria */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h2 className="text-lg font-semibold mb-3">Eligibility Criteria</h2>
                <ul className="space-y-3">
                  <li className="flex">
                    <FaGraduationCap className="mt-1 text-indigo-600 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Education</p>
                      <p className="text-sm text-gray-600">{job.degree}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <FaLaptopCode className="mt-1 text-indigo-600 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Branch</p>
                      <p className="text-sm text-gray-600">{job.branches.map(b => b.branchName).join(', ')}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <svg className="mt-1 h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Min. CGPA</p>
                      <p className="text-sm text-gray-600">{job.minCgpa}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <svg className="mt-1 h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Experience</p>
                      <p className="text-sm text-gray-600">{job.minExperienceMonths ? `${Math.floor(job.minExperienceMonths / 12)} years ${job.minExperienceMonths % 12} months` : 'No experience required'}</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Company Info */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h2 className="text-lg font-semibold mb-3">About Company</h2>
                <p className="text-sm text-gray-600">
                  {job.companyName} is a leading technology company specializing in software development
                  and digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Apply for {job.jobTitle}</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Resume</label>
              {userResumes.length > 0 ? (
                <select 
                  value={selectedResume}
                  onChange={(e) => setSelectedResume(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a resume</option>
                  {userResumes.map(resume => (
                    <option key={resume.id} value={resume.id}>
                      {resume.resumeName}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                  You haven't uploaded any resumes yet. Please go to your profile and upload a resume first.
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={!selectedResume}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;