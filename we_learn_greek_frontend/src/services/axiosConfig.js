import axios from 'axios';
import { API_URL } from '../config';
import { ENDPOINTS } from '../constants/endpoints';
import { ROUTES } from '../constants/routes';
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const access = await refreshSession();
      originalRequest.headers.Authorization = `Bearer ${access}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      authStorage.clearSession();
      window.location.href = ROUTES.login;
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
