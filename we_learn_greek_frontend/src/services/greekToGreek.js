import axiosInstance from './axiosConfig';
import { ENDPOINTS } from '../constants/endpoints';
import { buildQueryParams } from './apiHelpers';

export const greekToGreekAPI = {
  getAllWords: async (page = 1, filters = {}) => {
    const params = buildQueryParams({ page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.greekToGreek.list}?${params}`);
    return response.data;
  },

  searchWords: async (searchTerm, page = 1, filters = {}) => {
    const params = buildQueryParams({ search: searchTerm, page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.greekToGreek.list}?${params}`);
    return response.data;
  },

  getWordById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.greekToGreek.detail(id));
    return response.data;
  },
};
