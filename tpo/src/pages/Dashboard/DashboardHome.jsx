import { useState, useEffect } from 'react';
import { FaUsers, FaBriefcase, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { useApi } from '../../contexts/ApiContext';

const DashboardHome = () => {
  const { api, isLoading } = useApi();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    activeJobs: 0,
    placedStudents: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        // const dashboardStats = await api.dashboard.getStats();
        // const activities = await api.dashboard.getRecentActivities();
        // const events = await api.dashboard.getUpcomingEvents();
        
        // For now, using mock data
        setStats({
          totalStudents: 250,
          totalCompanies: 15,
          activeJobs: 8,
          placedStudents: 45
        });
        
        setRecentActivities([
          { id: 1, type: 'application', title: 'New application submitted', company: 'TechCorp', position: 'Software Engineer', time: '2 hours ago' },
          { id: 2, type: 'company', title: 'New company registered', company: 'Innovate Solutions', time: '1 day ago' },
          { id: 3, type: 'job', title: 'New job posting', company: 'DataSystems', position: 'Data Analyst', time: '2 days ago' }
        ]);
        
        setUpcomingEvents([
          { id: 1, title: 'Campus Drive', company: 'TechCorp', date: 'Apr 15, 2025', time: '10:00 AM', location: 'Main Auditorium' },
          { id: 2, title: 'Pre-placement Talk', company: 'Innovate Solutions', date: 'Apr 18, 2025', time: '2:00 PM', location: 'Seminar Hall' },
          { id: 3, title: 'Resume Workshop', date: 'Apr 20, 2025', time: '11:00 AM', location: 'Training Center' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchDashboardData();
  }, [api.dashboard]);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <FaUsers size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FaCheckCircle size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Placed Students</p>
              <h3 className="text-2xl font-bold">{stats.placedStudents}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FaBuilding size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Companies</p>
              <h3 className="text-2xl font-bold">{stats.totalCompanies}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <FaBriefcase size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Jobs</p>
              <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4">
                  <div className="p-2 rounded-full bg-gray-100 text-gray-500 mr-3">
                    {activity.type === 'application' && <FaUsers className="text-indigo-500" />}
                    {activity.type === 'company' && <FaBuilding className="text-blue-500" />}
                    {activity.type === 'job' && <FaBriefcase className="text-amber-500" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600">
                      {activity.company && <span className="font-medium">{activity.company}</span>}
                      {activity.position && <span> - {activity.position}</span>}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Placement Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Placement Statistics</h2>
            <div className="h-64 flex items-center justify-center">
              {/* Placeholder for chart - in a real implementation, use a charting library */}
              <div className="text-center text-gray-500">
                <p>Placement data visualization will appear here</p>
                <p className="text-sm mt-2">Using charts to show branch-wise and company-wise placements</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Events and Job Approvals */}
        <div>
          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h4 className="font-medium">{event.title}</h4>
                  {event.company && <p className="text-sm text-gray-600">{event.company}</p>}
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-800">Job Postings</h4>
                <p className="text-sm">3 jobs waiting for approval</p>
                <button className="mt-2 text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-200">
                  Review Now
                </button>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800">Company Registrations</h4>
                <p className="text-sm">1 company waiting for verification</p>
                <button className="mt-2 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">
                  Review Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;