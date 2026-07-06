import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../utils/authStorage';
import { ROUTES } from '../constants/routes';

const AuthContext = createContext(null);

function readInitialAuth() {
  try {
    authStorage.clearLegacyKeys();
    if (authStorage.isAuthenticated()) {
      return {
        user: authStorage.getUser(),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.warn('Auth init failed:', error);
  }

  return {
    user: null,
    isAuthenticated: false,
  };
}

export const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, setAuth] = useState(readInitialAuth);
  const navigate = useNavigate();

  const login = useCallback((userData, tokens) => {
    authStorage.setSession({
      access: tokens.access,
      refresh: tokens.refresh,
      user: userData,
    });
    setAuth({ user: userData, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    authStorage.clearSession();
    setAuth({ user: null, isAuthenticated: false });
    navigate(ROUTES.login);
  }, [navigate]);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
