import { useState } from 'react';
import { Link } from 'react-router-dom';

const JobListings = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: 'Tech Corp',
      title: 'Software Developer',
      location: 'Remote',
      salary: '$80,000 - $100,000',
      postedDate: 'Mar 20, 2025',
      deadline: 'Apr 20, 2025',
      logo: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      company: 'Data Systems',
      title: 'Full Stack Engineer',
      location: 'New York, NY',
      salary: '$90,000 - $120,000',
      postedDate: 'Mar 18, 2025',
      deadline: 'Apr 18, 2025',
      logo: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      company: 'InnoTech',
      title: 'Frontend Developer',
      location: 'San Francisco, CA',
      salary: '$85,000 - $110,000',
      postedDate: 'Mar 15, 2025',
      deadline: 'Apr 15, 2025',
      logo: 'https://via.placeholder.com/50'
    },
    {
      id: 4,
      company: 'Global Solutions',
      title: 'Backend Engineer',
      location: 'Chicago, IL',
      salary: '$95,000 - $125,000',
      postedDate: 'Mar 22, 2025',
      deadline: 'Apr 22, 2025',
      logo: 'https://via.placeholder.com/50'
    },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Available Jobs</h2>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Job title or keyword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All Types</option>
              <option value="fulltime">Full-time</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                <img src={job.logo} alt={job.company} className="h-12 w-12 rounded" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">{job.location}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{job.salary}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end space-y-2">
                <Link 
                  to={`/dashboard/jobs/${job.id}`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </Link>
                <div className="text-sm text-gray-500">
                  <p>Posted: {job.postedDate}</p>
                  <p>Deadline: {job.deadline}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;