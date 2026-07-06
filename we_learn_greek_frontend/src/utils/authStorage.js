const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'userData';

/** @deprecated Legacy keys — cleared on session init */
const LEGACY_KEYS = ['token', 'auth_token'];

export const authStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setSession({ access, refresh, user }) {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  },

  clearLegacyKeys() {
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  },

  isAuthenticated() {
    return !!localStorage.getItem(ACCESS_KEY);
  },
};
