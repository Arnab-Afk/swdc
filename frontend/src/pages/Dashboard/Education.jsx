import { useState, useEffect, useCallback } from 'react';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaPen, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import { useApi } from '../../contexts/ApiContext';

const Education = () => {
  const { api } = useApi();
  const [educationInfo, setEducationInfo] = useState({
    degree: '',
    branch: '',
    yearOfGraduation: '',
    cgpa: '',
    rollno: '',
    universityName: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    organization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: ''
  });
  
  const [certificates, setCertificates] = useState([]);
  const [semesterMarks, setSemesterMarks] = useState([]);
  const [expandedSemester, setExpandedSemester] = useState(null);
  
  // Check if the API is properly initialized
  useEffect(() => {
    if (!api) {
      console.error('API context is not initialized');
      setError('API connection error. Please refresh the page or try again later.');
    } else if (!api.education) {
      console.error('Education API methods are not available');
      setError('Education API services are not available. Please contact support.');
    }
  }, [api]);

  // Update fetchEducationData to handle missing API
  const fetchEducationData = useCallback(async () => {
    if (!api?.education) {
      setError('API services are not available. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Check if each method exists before calling it
      if (typeof api.education.getEducationInfo === 'function') {
        const educationData = await api.education.getEducationInfo();
        setEducationInfo(educationData || {});
      }
      
      if (typeof api.education.getCertificates === 'function') {
        try {
          const certData = await api.education.getCertificates();
          // Ensure certificates is always an array
          setCertificates(Array.isArray(certData) ? certData : []);
        } catch (certError) {
          console.error('Error fetching certificates:', certError);
          setCertificates([]);
        }
      }
      
      if (typeof api.education.getSemesterMarks === 'function') {
        try {
          const marksData = await api.education.getSemesterMarks();
          // Ensure semester marks is always an array
          setSemesterMarks(Array.isArray(marksData) ? marksData : []);
        } catch (marksError) {
          console.error('Error fetching semester marks:', marksError);
          setSemesterMarks([]);
        }
      }
      
      setError(null);
    } catch (error) {
      console.error('Error fetching education data:', error);
      setError('Failed to load your education information. Please try again later.');
      // Ensure defaults are set even if the main request fails
      setCertificates([]);
      setSemesterMarks([]);
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Fetch education data from backend
  useEffect(() => {
    fetchEducationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!api?.education?.updateEducationInfo) {
      setError('Update service is not available. Please try again later.');
      return;
    }
    
    try {
      setLoading(true);
      
      // Ensure all numeric values are properly formatted
      const formattedData = {
        ...educationInfo,
        cgpa: parseFloat(educationInfo.cgpa || 0),
        yearOfGraduation: parseInt(educationInfo.yearOfGraduation || 0),
      };
      
      // Log the data for debugging
      console.log('Submitting education data:', formattedData);
      
      // Call the API with formatted data
      const response = await api.education.updateEducationInfo(formattedData);
      
      // Update local state with response data
      setEducationInfo(response || formattedData);
      setIsEditing(false);
      setError(null);
      
      // Show success message
      alert('Education information updated successfully!');
    } catch (error) {
      console.error('Error updating education info:', error);
      setError('Failed to update your education information. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newCert = await api.education.addCertificate(newCertificate);
      setCertificates([...certificates, newCert]);
      setNewCertificate({
        name: '',
        organization: '',
        issueDate: '',
        expiryDate: '',
        credentialId: ''
      });
      setShowCertModal(false);
      setError(null);
    } catch (error) {
      console.error('Error adding certificate:', error);
      setError('Failed to add certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCertificate = async (certId) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    
    try {
      setLoading(true);
      await api.education.deleteCertificate(certId);
      setCertificates(certificates.filter(cert => cert.id !== certId));
      setError(null);
    } catch (error) {
      console.error('Error deleting certificate:', error);
      setError('Failed to delete certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !isEditing) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Education Information</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          disabled={loading}
        >
          {isEditing ? (
            <>
              <span>Cancel</span>
            </>
          ) : (
            <>
              <FaPen size={14} />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input 
                  type="text" 
                  name="degree"
                  value={educationInfo.degree}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch/Major</label>
                <input 
                  type="text" 
                  name="branch"
                  value={educationInfo.branch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University/Institution</label>
                <input 
                  type="text" 
                  name="universityName"
                  value={educationInfo.universityName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Graduation</label>
                <input 
                  type="number" 
                  name="yearOfGraduation"
                  min="2000"
                  max="2100"
                  value={educationInfo.yearOfGraduation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                <input 
                  type="number" 
                  name="cgpa"
                  step="0.01"
                  min="0"
                  max="10"
                  value={educationInfo.cgpa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input 
                  type="text" 
                  name="rollno"
                  value={educationInfo.rollno}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaGraduationCap />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Degree</h3>
                  <p className="mt-1 text-base">{educationInfo.degree || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaUniversity />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Institution</h3>
                  <p className="mt-1 text-base">{educationInfo.universityName || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaCalendarAlt />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Graduation Year</h3>
                  <p className="mt-1 text-base">{educationInfo.yearOfGraduation || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <span className="font-bold">GPA</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">CGPA</h3>
                  <p className="mt-1 text-base">{educationInfo.cgpa || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <span className="font-bold">BR</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Branch/Major</h3>
                  <p className="mt-1 text-base">{educationInfo.branch || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <span className="font-bold">ID</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
                  <p className="mt-1 text-base">{educationInfo.rollno || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Certifications Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Certifications</h3>
          
          <button 
            onClick={() => setShowCertModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
            disabled={loading}
          >
            <FaPlus size={14} />
            <span>Add Certificate</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Replace the certificates mapping section with this safer version */}
          {Array.isArray(certificates) && certificates.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {certificates.map(cert => (
                <li key={cert.id || `cert-${Math.random()}`} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{cert.name || 'Unnamed Certificate'}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <p>Issued by: {cert.organization || 'Unknown organization'}</p>
                        <p>
                          Date: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                            day: 'numeric'
                          }) : 'Date not specified'}
                        </p>
                        {cert.credentialId && <p>Credential ID: {cert.credentialId}</p>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="p-1.5 text-gray-500 hover:text-red-600"
                        onClick={() => handleDeleteCertificate(cert.id)}
                        disabled={loading || !cert.id}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>You haven't added any certifications yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Semester Marks Section with enhanced safety */}
{Array.isArray(semesterMarks) && semesterMarks.length > 0 ? (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">Semester Marks</h3>
    
    <div className="space-y-4">
      {semesterMarks.map(semester => (
        <div key={semester.id || `sem-${Math.random()}`} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
            onClick={() => setExpandedSemester(expandedSemester === semester.id ? null : semester.id)}
          >
            <div>
              <h4 className="font-medium">{semester.semester || 'Unknown Semester'}</h4>
              <p className="text-sm text-gray-500">Academic Year: {semester.year || 'N/A'}</p>
            </div>
            <div className="flex items-center">
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                GPA: {semester.gpa || 'N/A'}
              </div>
            </div>
          </div>
          
          {expandedSemester === semester.id && (
            <div className="border-t border-gray-200 p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.isArray(semester.subjects) ? (
                    semester.subjects.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{subject.name || 'Unnamed Subject'}</td>
                        <td className="px-4 py-2">{subject.grade || 'N/A'}</td>
                        <td className="px-4 py-2">{subject.credits || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-center text-gray-500">No subject data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
) : null}

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Certificate</h3>
              <button onClick={() => setShowCertModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCertificate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={newCertificate.name}
                  onChange={handleCertificateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input 
                  type="text" 
                  name="organization"
                  value={newCertificate.organization}
                  onChange={handleCertificateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                <input 
                  type="date" 
                  name="issueDate"
                  value={newCertificate.issueDate}
                  onChange={handleCertificateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  name="expiryDate"
                  value={newCertificate.expiryDate}
                  onChange={handleCertificateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
                <input 
                  type="text" 
                  name="credentialId"
                  value={newCertificate.credentialId}
                  onChange={handleCertificateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;