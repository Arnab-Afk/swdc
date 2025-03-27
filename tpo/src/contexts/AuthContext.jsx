import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './ApiContext';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { api } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on page load
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('tpo_auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await api.auth.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('tpo_auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [api.auth]);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await api.auth.login(credentials);
      localStorage.setItem('tpo_auth_token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('tpo_auth_token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;