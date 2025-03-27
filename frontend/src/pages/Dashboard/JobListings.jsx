import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import { FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaSearch, FaFilter, FaBriefcase, FaBuilding } from 'react-icons/fa';

const JobListings = () => {
  const { api } = useApi();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTypeFilter, setLocationTypeFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  
  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Create filters object based on selected filters
        const filters = {};
        if (locationTypeFilter) filters.locationType = locationTypeFilter;
        if (jobTypeFilter) filters.jobType = jobTypeFilter;
        
        const jobsData = await api.jobs.getAll(filters);
        setJobs(jobsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to only run once on mount
  
  // Filtered jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      (job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });
  
  // Format job type for display (convert "FULL-TIME" to "Full-time")
  const formatJobType = (type) => {
    if (!type) return '';
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('-');
  };
  
  // Format location type for display (convert "REMOTE" to "Remote")
  const formatLocationType = (type) => {
    if (!type) return '';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Apply filters and search
  const applyFilters = async () => {
    try {
      setLoading(true);
      const filters = {
        search: searchTerm,
        locationType: locationTypeFilter,
        jobType: jobTypeFilter
      };
      
      const jobsData = await api.jobs.getAll(filters);
      setJobs(jobsData);
      setError(null);
    } catch (error) {
      console.error('Error applying filters:', error);
      setError('Failed to apply filters. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format salary value for display
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <select 
                value={locationTypeFilter}
                onChange={(e) => setLocationTypeFilter(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Location Types</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ONSITE">On-site</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBriefcase className="text-gray-400" />
              </div>
              <select 
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Job Types</option>
                <option value="FULL-TIME">Full-time</option>
                <option value="PART-TIME">Part-time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={applyFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Job count */}
          <p className="text-gray-600 mb-4">{filteredJobs.length} jobs found</p>
          
          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search filters or check back later for new opportunities.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                      <img 
                        src={job.imgurl || 'https://via.placeholder.com/50'} 
                        alt={job.companyName} 
                        className="h-12 w-12 rounded object-cover border border-gray-200"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                      <p className="text-gray-600">{job.companyName}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.location && (
                          <span className="flex items-center text-sm text-gray-500">
                            <FaBuilding className="mr-1" /> {job.location}
                          </span>
                        )}
                        
                        {job.locationType && (
                          <>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="flex items-center text-sm text-gray-500">
                              <FaMapMarkerAlt className="mr-1" /> 
                              {formatLocationType(job.locationType)}
                            </span>
                          </>
                        )}
                        
                        {job.jobType && (
                          <>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="flex items-center text-sm text-gray-500">
                              <FaBriefcase className="mr-1" /> 
                              {formatJobType(job.jobType)}
                            </span>
                          </>
                        )}
                        
                        {job.salary && (
                          <>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="flex items-center text-sm text-gray-500">
                              <FaMoneyBillWave className="mr-1" /> {formatSalary(job.salary)}
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Skills badges */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.skills.slice(0, 3).map((skill) => (
                            <span 
                              key={skill.id} 
                              className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                            >
                              {skill.skillName}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end space-y-2">
                      <Link 
                        to={`/dashboard/jobs/${job.id}`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        View Details
                      </Link>
                      <div className="text-sm text-gray-500">
                        <p className="flex items-center">
                          <FaCalendarAlt className="mr-1" /> 
                          Posted: {new Date(job.postedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="flex items-center text-amber-600 font-medium">
                          <FaCalendarAlt className="mr-1" /> 
                          Deadline: {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobListings;