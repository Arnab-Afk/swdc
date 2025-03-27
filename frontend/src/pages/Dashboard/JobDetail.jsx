import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, 
         FaGraduationCap, FaLaptopCode, FaClock, FaFileAlt } from 'react-icons/fa';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState('');
  const [userResumes, setUserResumes] = useState([]);
  const [applied, setApplied] = useState(false);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/jobs/${id}`);
        // const data = await response.json();
        
        // Simulate API response based on schema
        setTimeout(() => {
          setJob({
            id: parseInt(id),
            jobTitle: "Software Developer",
            companyId: "techcorp@example.com",
            companyName: "Tech Corp",
            description: "We are looking for a skilled software developer to join our team. The ideal candidate will have experience with React, Node.js, and database technologies.",
            location: "Remote / New York, NY",
            salary: "$80,000 - $100,000",
            postedDate: "Mar 20, 2025",
            applicationDeadline: "Apr 20, 2025",
            imgurl: "https://via.placeholder.com/150",
            active: true,
            verified: true,
            degree: "B.Tech / M.Tech",
            minCgpa: 7.5,
            minExperienceMonths: 0,
            branches: [
              { id: 1, branchName: "Computer Science" },
              { id: 2, branchName: "Information Technology" }
            ],
            skills: [
              { id: 1, skillName: "React" },
              { id: 2, skillName: "JavaScript" },
              { id: 3, skillName: "Node.js" },
              { id: 4, skillName: "SQL" }
            ],
            processSteps: [
              { 
                id: 1, 
                stepNumber: 1, 
                stepName: "Application Screening", 
                description: "Review of resumes and applications",
                fromDate: "Apr 21, 2025", 
                tillDate: "Apr 25, 2025" 
              },
              { 
                id: 2, 
                stepNumber: 2, 
                stepName: "Technical Assessment", 
                description: "Online coding test and technical questions",
                fromDate: "Apr 26, 2025", 
                tillDate: "Apr 28, 2025",
                location: "Online",
                durationMinutes: 120
              },
              { 
                id: 3, 
                stepNumber: 3, 
                stepName: "Technical Interview", 
                description: "Video interview with the technical team",
                fromDate: "May 1, 2025", 
                tillDate: "May 5, 2025",
                location: "Virtual - Zoom",
                durationMinutes: 60
              },
              { 
                id: 4, 
                stepNumber: 4, 
                stepName: "HR Interview", 
                description: "Interview with HR team",
                fromDate: "May 7, 2025", 
                tillDate: "May 10, 2025",
                location: "Virtual - Zoom",
                durationMinutes: 45
              }
            ]
          });
          
          // Simulate user resumes
          setUserResumes([
            { id: 1, resumeName: "Technical Resume", uploadDate: "Feb 15, 2025" },
            { id: 2, resumeName: "Resume with Projects", uploadDate: "Mar 10, 2025" }
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id]);
  
  const handleApply = async () => {
    if (!selectedResume) {
      alert('Please select a resume');
      return;
    }
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({
      //     jobId: id,
      //     resumeId: selectedResume
      //   })
      // });
      
      // Simulated success response
      console.log(`Applied to job ${id} with resume ${selectedResume}`);
      setApplied(true);
      
      // Navigate to applications page after successful application
      setTimeout(() => {
        navigate('/dashboard/applications');
      }, 1500);
    } catch (error) {
      console.error('Error applying to job:', error);
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
                src={job.imgurl} 
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
                  <FaCalendarAlt className="mr-1" /> Posted: {job.postedDate}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-1 text-amber-500" /> 
                  <span className="text-amber-500 font-medium">Deadline: {job.applicationDeadline}</span>
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
                  onClick={() => document.getElementById('applyModal').classList.remove('hidden')}
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
                                {step.fromDate} to {step.tillDate}
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
                    <FaFileAlt className="mt-1 text-indigo-600 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Minimum CGPA</p>
                      <p className="text-sm text-gray-600">{job.minCgpa}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <FaBuilding className="mt-1 text-indigo-600 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Experience</p>
                      <p className="text-sm text-gray-600">
                        {job.minExperienceMonths > 0 
                          ? `${job.minExperienceMonths} months` 
                          : 'No experience required'}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Company Info */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h2 className="text-lg font-semibold mb-3">About Company</h2>
                <p className="text-sm text-gray-600">
                  {job.companyName} is a leading technology company specializing in software development
                  and digital solutions. Visit their website for more information.
                </p>
                <a 
                  href="#" 
                  className="inline-block mt-3 text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Visit Company Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Modal */}
      <div id="applyModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Apply for {job.jobTitle}</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Resume</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              <option value="">Select a resume</option>
              {userResumes.map(resume => (
                <option key={resume.id} value={resume.id}>
                  {resume.resumeName} (Uploaded: {resume.uploadDate})
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Choose the resume that best matches this job's requirements
            </p>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              onClick={() => document.getElementById('applyModal').classList.add('hidden')}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;