import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import { FaSearch, FaFilter, FaExternalLinkAlt } from 'react-icons/fa';

const MyApplications = () => {
  const { api } = useApi();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await api.applications.getMyApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Filter applications based on search term and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      app.jobPosting?.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobPosting?.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || getApplicationStatus(app).toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Helper function to determine application status
  function getApplicationStatus(application) {
    if (application.statusOfferAccepted) return 'Accepted';
    if (application.statusOfferMade) return 'Offer';
    if (application.statusTechnicalRound) return 'Technical';
    if (application.statusInterviewScheduled) return 'Interview';
    if (application.statusShortlisted) return 'Shortlisted';
    if (application.statusApplied) return 'Applied';
    return 'Unknown';
  }
  
  // Helper function to get status badge color classes
  function getStatusColorClasses(status) {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Offer': return 'bg-purple-100 text-purple-800';
      case 'Technical': return 'bg-yellow-100 text-yellow-800';
      case 'Interview': return 'bg-blue-100 text-blue-800';
      case 'Shortlisted': return 'bg-indigo-100 text-indigo-800';
      case 'Applied': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Applications</h2>
      
      {/* Filter/Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search by job title or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Technical">Technical Round</option>
                <option value="Offer">Offer</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No applications found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter 
              ? "No applications match your search criteria. Try adjusting your filters." 
              : "You haven't applied to any jobs yet."}
          </p>
          <Link to="/dashboard/jobs" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 font-semibold">Company</th>
                  <th className="py-3 px-4 font-semibold">Position</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Applied On</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(app => {
                  const status = getApplicationStatus(app);
                  const statusColorClasses = getStatusColorClasses(status);
                  
                  return (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{app.jobPosting?.companyName}</td>
                      <td className="py-3 px-4">{app.jobPosting?.jobTitle}</td>
                      <td className="py-3 px-4">{app.jobPosting?.location}</td>
                      <td className="py-3 px-4">
                        {new Date(app.applicationDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`${statusColorClasses} px-2 py-1 rounded text-sm`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <Link 
                          to={`/dashboard/jobs/${app.jobId}`} 
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                        >
                          <span>View Job</span>
                          <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                        </Link>
                        
                        {app.statusOfferMade && !app.statusOfferAccepted && (
                          <button
                            onClick={async () => {
                              if (confirm('Do you want to accept this job offer?')) {
                                try {
                                  await api.applications.updateStatus(app.id, 'statusOfferAccepted', true);
                                  // Update local state
                                  setApplications(prev => 
                                    prev.map(a => a.id === app.id ? {...a, statusOfferAccepted: true} : a)
                                  );
                                } catch (error) {
                                  console.error('Error accepting offer:', error);
                                }
                              }
                            }}
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Accept Offer
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Application Steps Progress Section */}
      {filteredApplications.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Application Process</h3>
          <p className="text-gray-600 mb-6">
            Track your application progress through the recruitment stages. Each application follows its own process defined by the company.
          </p>
          
          <div className="space-y-6">
            {filteredApplications.slice(0, 3).map(app => {
              const status = getApplicationStatus(app);
              return (
                <div key={`process-${app.id}`} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{app.jobPosting?.jobTitle} at {app.jobPosting?.companyName}</h4>
                    <span className={`${getStatusColorClasses(status)} px-2 py-1 rounded text-xs`}>
                      {status}
                    </span>
                  </div>
                  
                  <div className="relative">
                    {/* Process Progress Bar */}
                    <div className="h-1 bg-gray-200 absolute top-4 left-0 right-0 z-0">
                      <div 
                        className="h-1 bg-indigo-500" 
                        style={{ 
                          width: `${app.statusShortlisted ? 20 : 0}${app.statusInterviewScheduled ? 40 : 0}${app.statusTechnicalRound ? 60 : 0}${app.statusOfferMade ? 80 : 0}${app.statusOfferAccepted ? 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between relative z-10">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${app.statusApplied ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          1
                        </div>
                        <span className="text-xs mt-1">Applied</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${app.statusShortlisted ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          2
                        </div>
                        <span className="text-xs mt-1">Shortlisted</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${app.statusInterviewScheduled ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          3
                        </div>
                        <span className="text-xs mt-1">Interview</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${app.statusTechnicalRound ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          4
                        </div>
                        <span className="text-xs mt-1">Technical</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${app.statusOfferMade ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          5
                        </div>
                        <span className="text-xs mt-1">Offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;