import axios from 'axios';
import { API_URL } from '../config';
import { ENDPOINTS } from '../constants/endpoints';
import { authStorage } from '../utils/authStorage';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh tokens rotate: each refresh returns a new one and invalidates the old one.
// Concurrent 401s must therefore share a single refresh request; a second request
// with the same (now invalidated) token would fail and log the user out.
let refreshPromise = null;

function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = authStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token');
      }
      const response = await axios.post(`${API_URL}${ENDPOINTS.auth.tokenRefresh}`, {
        refresh: refreshToken,
      });
      const { access, refresh } = response.data;
      authStorage.setSession({
        access,
        refresh: refresh ?? refreshToken,
        user: authStorage.getUser(),
      });
      return access;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// Auth endpoints answer 401 for bad credentials; that must reach the form, not trigger a refresh.
const NO_REFRESH_PATHS = [
  ENDPOINTS.auth.login,
  ENDPOINTS.auth.register,
  ENDPOINTS.auth.token,
  ENDPOINTS.auth.tokenRefresh,
];

function isAuthRequest(config) {
  return NO_REFRESH_PATHS.some((path) => config?.url?.startsWith(path));
}

/** Drop the dead session and retry once anonymously, so public pages keep working. */
function retryAnonymously(originalRequest) {
  authStorage.expireSession();
  delete originalRequest.headers.Authorization;
  return axiosInstance(originalRequest);
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !error.response ||
      error.response.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthRequest(originalRequest)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!authStorage.getRefreshToken()) {
      return originalRequest.headers.Authorization
        ? retryAnonymously(originalRequest)
        : Promise.reject(error);
    }

    try {
      const access = await refreshSession();
      originalRequest.headers.Authorization = `Bearer ${access}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Network failure: keep the session, the user may just be offline.
      if (!refreshError.response) {
        return Promise.reject(error);
      }
      return retryAnonymously(originalRequest);
    }
  }
);

export default axiosInstance;
