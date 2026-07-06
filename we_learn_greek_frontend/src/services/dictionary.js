import axiosInstance from './axiosConfig';
import { ENDPOINTS } from '../constants/endpoints';
import { buildQueryParams } from './apiHelpers';

export const dictionaryAPI = {
  /** JWT required. Query: ?search=, ?ordering=, ?page=, ?page_size= */
  getAllWords: async (page = 1, filters = {}) => {
    const params = buildQueryParams({ page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.dictionary.list}?${params}`);
    return response.data;
  },

  searchWords: async (searchTerm, page = 1, filters = {}) => {
    const params = buildQueryParams({ search: searchTerm, page, ...filters });
    const response = await axiosInstance.get(`${ENDPOINTS.dictionary.list}?${params}`);
    return response.data;
  },

  addWord: async (wordData) => {
    const response = await axiosInstance.post(ENDPOINTS.dictionary.list, wordData);
    return response.data;
  },

  getWordById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.dictionary.detail(id));
    return response.data;
  },

  updateWord: async (id, wordData) => {
    const response = await axiosInstance.put(ENDPOINTS.dictionary.detail(id), wordData);
    return response.data;
  },

  patchWord: async (id, wordData) => {
    const response = await axiosInstance.patch(ENDPOINTS.dictionary.detail(id), wordData);
    return response.data;
  },

  deleteWord: async (id) => {
    await axiosInstance.delete(ENDPOINTS.dictionary.detail(id));
  },

  bulkDelete: async (ids) => {
    const response = await axiosInstance.post(ENDPOINTS.dictionary.bulkDelete, { ids });
    return response.data;
  },
};
