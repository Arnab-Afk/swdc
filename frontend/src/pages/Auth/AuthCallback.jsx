import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../App';

const AuthCallback = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Get tokens from URL params
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('access_token');
        const idToken = params.get('id_token');
        const userInfoParam = params.get('user_info');
        
        // We'll use the ID token for authentication as it contains user information
        if (!idToken) {
          throw new Error('Authentication failed: No ID token received');
        }
        
        let userData;
        
        // If user_info is provided in URL, parse it
        if (userInfoParam) {
          try {
            // Decode base64 string if it's encoded
            const decodedInfo = decodeURIComponent(userInfoParam);
            userData = JSON.parse(atob(decodedInfo));
          } catch (e) {
            console.error('Error parsing user_info:', e);
            // Continue with validation if parsing fails
          }
        }
        
        // Always validate token with backend, even if user_info is provided
        const response = await fetch('http://localhost:3000/api/v1/users/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: idToken }),
        });
        
        if (!response.ok) {
          throw new Error('Token validation failed');
        }
        
        const responseData = await response.json();
        
        // Use the user data and token from the backend response
        login(responseData.token, responseData.user);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err.message);
      }
    };
    
    handleAuth();
  }, [location, login, navigate]);

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
        <h2 className="text-2xl font-semibold mb-4">Authenticating...</h2>
        <div className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;