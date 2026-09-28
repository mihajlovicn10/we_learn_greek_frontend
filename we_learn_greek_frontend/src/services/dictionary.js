import axiosInstance from './axiosConfig';
import { ENDPOINTS } from '../constants/endpoints';
import { buildQueryParams, normalizeListResponse } from './apiHelpers';

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

/** Every saved word, following DRF pagination (the dictionary API caps page_size at 100). */
export async function fetchAllDictionaryWords() {
  const words = [];
  for (let page = 1; ; page += 1) {
    const data = await dictionaryAPI.getAllWords(page, { page_size: 100 });
    words.push(...normalizeListResponse(data));
    if (!data?.next) return words;
  }
}
