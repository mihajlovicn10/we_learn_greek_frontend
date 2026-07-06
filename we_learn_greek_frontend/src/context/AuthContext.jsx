import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../utils/authStorage';
import { ROUTES } from '../constants/routes';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authStorage.clearLegacyKeys();

    if (authStorage.isAuthenticated()) {
      setIsAuthenticated(true);
      setUser(authStorage.getUser());
    }

    setLoading(false);
  }, []);

  const login = useCallback((userData, tokens) => {
    authStorage.setSession({
      access: tokens.access,
      refresh: tokens.refresh,
      user: userData,
    });
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    authStorage.clearSession();
    setUser(null);
    setIsAuthenticated(false);
    navigate(ROUTES.login);
  }, [navigate]);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
