import { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaBriefcase, FaFileAlt, FaCog, FaSignOutAlt, FaTachometerAlt, 
         FaBars, FaTimes, FaBell, FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { useApi } from '../contexts/ApiContext';
import { AuthContext } from '../App';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use API context for data fetching - get userProfile directly from context
  const { api, isLoading, error, userProfile } = useApi();
  
  const { logout } = useContext(AuthContext);
  
  useEffect(() => {
    // Only fetch profile if not already loaded
    if (!userProfile) {
      api.user.getProfile();
    }
  }, [api.user, userProfile]);
  
  useEffect(() => {
    // Separate effect for notifications to prevent re-fetching loop
    const fetchNotifications = async () => {
      try {
        const notificationData = await api.user.getNotifications();
        setNotifications(notificationData || []);
      } catch (notifError) {
        console.log('Notifications endpoint might not be implemented yet');
        
        // Set some placeholder notifications in development
        if (import.meta.env.DEV) {
          setNotifications([]);
        }
      }
    };
    
    fetchNotifications();
  }, []); // Empty dependency array - run only on mount
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();
    // Navigate to login page
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Job Listings', path: '/dashboard/jobs', icon: <FaBriefcase /> },
    { name: 'My Applications', path: '/dashboard/applications', icon: <FaFileAlt /> },
    { name: 'Education', path: '/dashboard/education', icon: <FaGraduationCap /> },
    { name: 'Experience', path: '/dashboard/experience', icon: <FaUserTie /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <FaUser /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <FaCog /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Display loading state while fetching initial data
  if (isLoading && !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Display error state if data fetching failed
  if (error && !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Backdrop (Mobile only) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - Fixed to the screen */}
      <aside 
        className={`bg-white text-gray-800 w-72 fixed h-screen shadow-lg transition-all duration-300 ease-in-out z-20 flex flex-col ${
          sidebarOpen ? 'left-0' : '-left-72 md:left-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="border-b p-6 bg-gradient-to-r from-indigo-700 to-indigo-600">
          <h1 className="text-xl font-bold text-white">Student Dashboard</h1>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="absolute top-5 -right-12 p-2 rounded-full bg-indigo-600 text-white md:hidden"
        >
          {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        {/* Navigation - Don't let this scroll independently */}
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

        {/* User Profile & Logout - Still at bottom of sidebar */}
        <div className="border-t bg-gray-50">
          {userProfile && (
            <div className="p-4">
              <div className="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={userProfile.profileImage || userProfile.gimg || 'https://via.placeholder.com/40'} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full mr-3 border-2 border-indigo-300 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/40?text=User';
                  }}
                />
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-indigo-800 truncate">
                    {`${userProfile.firstName || ''} ${userProfile.lastName || ''}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{userProfile.email}</p>
                  <div className="flex items-center mt-1">
                    <FaGraduationCap className="text-indigo-500 mr-1" size={12} />
                    <p className="text-xs text-indigo-600 truncate">
                      {userProfile.degree ? 
                        `${userProfile.degree}, ${userProfile.branch || 'Not specified'}` : 
                        'Education details not added'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="px-4 pb-4">
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg bg-white shadow-sm hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium transition-colors border border-gray-200"
            >
              <FaSignOutAlt className="text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - With margin to account for fixed sidebar */}
      <main className="ml-0 md:ml-72 flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Notification Bar */}
        {notifications.length > 0 && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center">
                <FaBell className="text-indigo-600 mr-2" /> Notifications
              </h3>
              <button className="text-xs text-indigo-600 hover:underline">
                Mark all as read
              </button>
            </div>
            <div className="space-y-2">
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
        )}
        
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;