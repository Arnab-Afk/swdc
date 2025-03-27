import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import JobListings from './pages/Dashboard/JobListings';
import JobDetail from './pages/Dashboard/JobDetail';
import MyApplications from './pages/Dashboard/MyApplications';
import Profile from './pages/Dashboard/Profile';
import Settings from './pages/Dashboard/Settings';
import Education from './pages/Dashboard/Education';
import Experience from './pages/Dashboard/Experience';
import Login from './pages/Auth/Login';
import AuthCallback from './pages/Auth/AuthCallback';
import AuthSuccess from './pages/Auth/AuthSuccess';
import { ApiProvider } from './contexts/ApiContext';

// Create auth context
export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      // You would typically validate the token and fetch user data here
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('auth_token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApiProvider>
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        <BrowserRouter>
          <Routes>
            {/* Existing routes */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            
            {/* Protected Dashboard routes */}
            <Route path="/dashboard" element={
              isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />
            }>
              <Route index element={<DashboardHome />} />
              <Route path="jobs" element={<JobListings />} />
              <Route path="jobs/:id" element={<JobDetail />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="education" element={<Education />} />
              <Route path="experience" element={<Experience />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ApiProvider>
  );
}

// Simple 404 page
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default App;
