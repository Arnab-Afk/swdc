import { useState, useEffect } from 'react';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaPen, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

const Education = () => {
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
  const [showCertModal, setShowCertModal] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    organization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: ''
  });
  const [certificates, setCertificates] = useState([
    { id: 1, name: 'AWS Certified Developer', organization: 'Amazon', issueDate: 'Jan 2025' },
    { id: 2, name: 'React Certification', organization: 'Meta', issueDate: 'Nov 2024' }
  ]);
  
  const [semesterMarks, setSemesterMarks] = useState([
    { 
      id: 1, 
      semester: '1st Semester', 
      gpa: '8.7', 
      year: '2021-22', 
      subjects: [
        { name: 'Data Structures', grade: 'A', credits: 4 },
        { name: 'Computer Networks', grade: 'A-', credits: 3 },
        { name: 'Database Systems', grade: 'B+', credits: 4 }
      ]
    },
    { 
      id: 2, 
      semester: '2nd Semester', 
      gpa: '8.9', 
      year: '2022-23', 
      subjects: [
        { name: 'Algorithms', grade: 'A', credits: 4 },
        { name: 'Operating Systems', grade: 'A', credits: 4 },
        { name: 'Web Technologies', grade: 'A-', credits: 3 }
      ]
    }
  ]);
  const [expandedSemester, setExpandedSemester] = useState(null);
  
  // Simulated data fetch - would be an API call in production
  useEffect(() => {
    const fetchEducationInfo = async () => {
      try {
        // Simulated API response
        setTimeout(() => {
          setEducationInfo({
            degree: 'Bachelor of Technology',
            branch: 'Computer Science',
            yearOfGraduation: 2025,
            cgpa: 8.5,
            rollno: 'CS2023001',
            universityName: 'National Institute of Technology',
          });
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching education info:', error);
        setLoading(false);
      }
    };
    
    fetchEducationInfo();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this would be an API call
      // await fetch('/api/users/education', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(educationInfo)
      // });
      
      console.log('Updated education info:', educationInfo);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating education info:', error);
    }
  };
  
  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();
    const newCert = {
      id: certificates.length + 1,
      ...newCertificate
    };
    setCertificates([...certificates, newCert]);
    setNewCertificate({
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      credentialId: ''
    });
    setShowCertModal(false);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Education Information</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
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
              >
                Save Changes
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
                  <p className="mt-1 text-base">{educationInfo.degree}</p>
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
                  <p className="mt-1 text-base">{educationInfo.universityName}</p>
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
                  <p className="mt-1 text-base">{educationInfo.yearOfGraduation}</p>
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
                  <p className="mt-1 text-base">{educationInfo.cgpa}</p>
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
                  <p className="mt-1 text-base">{educationInfo.branch}</p>
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
                  <p className="mt-1 text-base">{educationInfo.rollno}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional Certificates Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Certifications</h3>
          
          <button 
            onClick={() => setShowCertModal(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add Certificate</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {certificates.map(cert => (
              <li key={cert.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-500">Issued: {cert.issueDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-gray-500 hover:text-indigo-600">
                      <FaPen size={14} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-red-600">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
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
                >
                  Add Certificate
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