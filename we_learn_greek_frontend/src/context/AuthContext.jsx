import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage, SESSION_EXPIRED_EVENT } from '../utils/authStorage';
import { authAPI } from '../services/auth';
import { ROUTES } from '../constants/routes';
import { showToast } from '../components/common/Toast';
import i18n from '../i18n';

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

  // The API client expires the session when refresh fails; protected routes then redirect to login.
  useEffect(() => {
    const handleExpired = () => {
      setAuth((prev) => {
        if (prev.isAuthenticated) {
          showToast.info(i18n.t('auth.sessionExpired'));
        }
        return { user: null, isAuthenticated: false };
      });
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpired);
  }, []);

  const login = useCallback((userData, tokens) => {
    authStorage.setSession({
      access: tokens.access,
      refresh: tokens.refresh,
      user: userData,
    });
    setAuth({ user: userData, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    // Revoke the refresh token server-side. Best effort: the local session is cleared
    // regardless, so an offline or failed request never traps the user in a session.
    const refresh = authStorage.getRefreshToken();
    if (refresh) {
      authAPI.logout(refresh).catch(() => {});
    }
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
