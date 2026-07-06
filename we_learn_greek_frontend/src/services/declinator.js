import axiosInstance from './axiosConfig';
import { ENDPOINTS } from '../constants/endpoints';
import { buildQueryParams } from './apiHelpers';

export const declinatorAPI = {
  /** Query: ?search=, ?ordering=, ?nominative_singular=, ?page=, ?page_size= */
  getAllNouns: async (page = 1, filters = {}) => {
    const params = buildQueryParams({ page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.nouns.list}?${params}`);
    return response.data;
  },

  searchNouns: async (searchTerm, page = 1, filters = {}) => {
    const params = buildQueryParams({ search: searchTerm, page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.nouns.list}?${params}`);
    return response.data;
  },

  getNounById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.nouns.detail(id));
    return response.data;
  },
};
