const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'userData';

/** @deprecated Legacy keys — cleared on session init */
const LEGACY_KEYS = ['token', 'auth_token'];

export const authStorage = {
  getAccessToken() {
    try {
      return localStorage.getItem(ACCESS_KEY);
    } catch {
      return null;
    }
  },

  getRefreshToken() {
    try {
      return localStorage.getItem(REFRESH_KEY);
    } catch {
      return null;
    }
  },

  getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setSession({ access, refresh, user }) {
    try {
      if (access) localStorage.setItem(ACCESS_KEY, access);
      if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      // Private browsing / blocked storage — session won't persist
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
      LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }
  },

  clearLegacyKeys() {
    try {
      LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }
  },

  isAuthenticated() {
    try {
      return !!localStorage.getItem(ACCESS_KEY);
    } catch {
      return false;
    }
  },
};
