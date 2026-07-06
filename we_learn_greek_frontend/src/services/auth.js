import axiosInstance from './axiosConfig';
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

  /** Body: { refresh } → { access } */
  refreshToken: async (refresh) => {
    const response = await axiosInstance.post(ENDPOINTS.auth.tokenRefresh, { refresh });
    return response.data;
  },
};
