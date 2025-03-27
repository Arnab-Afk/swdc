import { useState } from 'react';

const MyApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Software Developer',
      location: 'Remote',
      appliedDate: 'Mar 24, 2025',
      status: 'Applied',
      statusColor: 'blue'
    },
    {
      id: 2,
      company: 'Data Systems',
      position: 'Full Stack Engineer',
      location: 'New York, NY',
      appliedDate: 'Mar 20, 2025',
      status: 'Interview',
      statusColor: 'yellow'
    },
    {
      id: 3,
      company: 'InnoTech',
      position: 'Frontend Developer',
      location: 'San Francisco, CA',
      appliedDate: 'Mar 15, 2025',
      status: 'Applied',
      statusColor: 'blue'
    }
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">My Applications</h2>
      
      {/* Filter/Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              placeholder="Search applications"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All Status</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Applications Table */}
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
              {applications.map(app => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{app.company}</td>
                  <td className="py-3 px-4">{app.position}</td>
                  <td className="py-3 px-4">{app.location}</td>
                  <td className="py-3 px-4">{app.appliedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`bg-${app.statusColor}-100 text-${app.statusColor}-800 px-2 py-1 rounded text-sm`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-indigo-600 hover:text-indigo-800 mr-2">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;