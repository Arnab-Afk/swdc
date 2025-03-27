import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaBriefcase, FaBuilding, FaChartBar, FaCog, FaSignOutAlt, 
  FaTachometerAlt, FaBars, FaTimes, FaBell, FaCheckCircle 
} from 'react-icons/fa';
import { useApi } from '../contexts/ApiContext';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { api, isLoading, tpoProfile } = useApi();
  const { logout } = useAuth();
  
  useEffect(() => {
    // Only fetch profile if not already loaded
    if (!tpoProfile) {
      api.profile.getProfile();
    }
  }, [api.profile, tpoProfile]);
  
  useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        // This might not be implemented yet, so we'll add a placeholder
        // const notificationData = await api.profile.getNotifications();
        // setNotifications(notificationData || []);
        
        // Placeholder notifications for development
        setNotifications([
          { id: 1, message: 'New company registration request', date: 'Just now' },
          { id: 2, message: 'Job posting pending approval', date: '1 hour ago' },
          { id: 3, message: 'Placement drive scheduled for tomorrow', date: 'Yesterday' }
        ]);
      } catch (error) {
        console.log('Notifications endpoint might not be implemented yet');
      }
    };
    
    fetchNotifications();
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Students', path: '/dashboard/students', icon: <FaUsers /> },
    { name: 'Companies', path: '/dashboard/companies', icon: <FaBuilding /> },
    { name: 'Job Postings', path: '/dashboard/jobs', icon: <FaBriefcase /> },
    { name: 'Reports', path: '/dashboard/reports', icon: <FaChartBar /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FaCog /> },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Display loading state while fetching initial data
  if (isLoading && !tpoProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading TPO Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle button */}
      {!sidebarOpen && (
        <button
          className="fixed z-20 bottom-4 right-4 p-2 rounded-full bg-indigo-600 text-white shadow-lg md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-white text-gray-800 w-72 fixed h-screen shadow-lg transition-all duration-300 ease-in-out z-20 flex flex-col ${
          sidebarOpen ? 'left-0' : '-left-72 md:left-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="border-b p-6 bg-gradient-to-r from-indigo-700 to-indigo-600">
          <h1 className="text-xl font-bold text-white">TPO Dashboard</h1>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="absolute top-5 -right-12 p-2 rounded-full bg-indigo-600 text-white md:hidden"
        >
          {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto flex-grow">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className={isActive(item.path) ? 'text-indigo-700' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {isActive(item.path) && (
                    <span className="ml-auto w-1.5 h-6 rounded-full bg-indigo-600"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t bg-gray-50">
          {tpoProfile && (
            <div className="p-4">
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                  {tpoProfile.name ? tpoProfile.name.charAt(0) : 'T'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-indigo-800 truncate">
                    {tpoProfile.name || 'TPO Admin'}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {tpoProfile.email || 'admin@example.com'}
                  </p>
                  <p className="text-xs text-indigo-600 truncate">
                    {tpoProfile.position || 'Training & Placement Officer'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="px-4 pb-4">
            <button 
              onClick={logout}
              className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg bg-white shadow-sm hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium transition-colors border border-gray-200"
            >
              <FaSignOutAlt className="text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-72 flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
          </h2>
          
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
              >
                <FaBell className="text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium flex items-center">
                        <FaBell className="text-indigo-600 mr-2" /> Notifications
                      </h3>
                      <button className="text-xs text-indigo-600 hover:underline">
                        Mark all as read
                      </button>
                    </div>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-2 rounded bg-indigo-50 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">{notification.message}</span>
                            <span className="text-xs text-gray-500">{notification.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Page content (rendered by react-router) */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;