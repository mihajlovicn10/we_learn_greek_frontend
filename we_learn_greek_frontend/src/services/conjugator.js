import axiosInstance from './axiosConfig';
import { ENDPOINTS } from '../constants/endpoints';
import { buildQueryParams } from './apiHelpers';

export const conjugatorAPI = {
  /** Query: ?search=, ?verb_type=, ?page=, ?page_size= */
  getAllVerbs: async (page = 1, filters = {}) => {
    const params = buildQueryParams({ page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.verbs.list}?${params}`);
    return response.data;
  },

  searchVerbs: async (searchTerm, page = 1, filters = {}) => {
    const params = buildQueryParams({ search: searchTerm, page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.verbs.list}?${params}`);
    return response.data;
  },

  getVerbById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.verbs.detail(id));
    return response.data;
  },

  getConjugation: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.verbs.conjugation(id));
    return response.data;
  },
};
