import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../App';
import { useApi } from '../../contexts/ApiContext';

const AuthSuccess = () => {
  const { login } = useContext(AuthContext);
  const { api } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get token from URL params
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          throw new Error('Authentication failed: No token received');
        }
        
        // Store token temporarily so the API context can use it
        localStorage.setItem('auth_token', token);
        
        // Fetch user data using the API context
        const userData = await api.user.getProfile();
        
        // Complete login with token and user data
        login(token, userData);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('auth_token'); // Clean up on error
        setError(err.message);
      }
    };
    
    handleAuth();
  }, [location, login, navigate, api]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Authentication complete!</h2>
        <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
        <div className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthSuccess;