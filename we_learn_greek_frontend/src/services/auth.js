import axios from 'axios';
import axiosInstance from './axiosConfig';
import { API_URL } from '../config';
import { ENDPOINTS } from '../constants/endpoints';

export const authAPI = {
  /** Body: { email, password, first_name, last_name } */
  register: async ({ email, password, first_name, last_name }) => {
    const response = await axiosInstance.post(ENDPOINTS.auth.register, {
      email,
      password,
      first_name,
      last_name,
    });
    return response.data;
  },

  /** Body: { email, password } → { access, refresh } */
  login: async ({ email, password }) => {
    const response = await axiosInstance.post(ENDPOINTS.auth.login, { email, password });
    return response.data;
  },

  /** SimpleJWT token obtain — same as login, email-based */
  obtainToken: async ({ email, password }) => {
    const response = await axiosInstance.post(ENDPOINTS.auth.token, { email, password });
    return response.data;
  },

  /** Body: { refresh } → { access, refresh } (refresh tokens rotate) */
  refreshToken: async (refresh) => {
    const response = await axiosInstance.post(ENDPOINTS.auth.tokenRefresh, { refresh });
    return response.data;
  },

  /** Body: { refresh } → revokes the refresh token server-side.
   *  Plain axios: a 401 here (token already expired) must not trigger the refresh interceptor. */
  logout: async (refresh) => {
    await axios.post(`${API_URL}${ENDPOINTS.auth.logout}`, { refresh });
  },
};
