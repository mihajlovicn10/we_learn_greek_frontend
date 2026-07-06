import axiosInstance from './axiosConfig';
import { ENDPOINTS } from '../constants/endpoints';
import { buildQueryParams } from './apiHelpers';

export const transparentWordsAPI = {
  /** Query: ?language=en, ?search=, ?page=, ?page_size= */
  getAllWords: async (page = 1, filters = {}) => {
    const params = buildQueryParams({ page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.transparentWords.list}?${params}`);
    return response.data;
  },

  searchWords: async (searchTerm, page = 1, filters = {}) => {
    const params = buildQueryParams({ search: searchTerm, page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.transparentWords.list}?${params}`);
    return response.data;
  },

  getWordsByLanguage: async (language, page = 1, filters = {}) => {
    const params = buildQueryParams({ page, ...filters });
    const response = await axiosInstance.get(
      `${ENDPOINTS.transparentWords.byLanguage(language)}?${params}`
    );
    return response.data;
  },

  getWordById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.transparentWords.detail(id));
    return response.data;
  },
};
