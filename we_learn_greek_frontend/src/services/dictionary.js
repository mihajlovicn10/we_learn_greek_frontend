import axiosInstance from './axiosConfig';

export const dictionaryAPI = {
  getAllWords: async (page = 1, filters = {}) => {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    const response = await axiosInstance.get(`/dictionary/?${params}`);
    return response.data;
  },

  searchWords: async (searchTerm, page = 1) => {
    const params = new URLSearchParams({
      search: searchTerm,
      page
    });
    const response = await axiosInstance.get(`/dictionary/?${params}`);
    return response.data;
  },

  addWord: async (wordData) => {
    const response = await axiosInstance.post('/dictionary/', wordData);
    return response.data;
  },

  updateWord: async (id, wordData) => {
    const response = await axiosInstance.put(`/dictionary/${id}/`, wordData);
    return response.data;
  },

  deleteWord: async (id) => {
    await axiosInstance.delete(`/dictionary/${id}/`);
  },

  bulkDelete: async (ids) => {
    const response = await axiosInstance.post('/dictionary/bulk_delete/', { ids });
    return response.data;
  },

  getWordsByDateRange: async (dateFrom, dateTo, page = 1) => {
    const params = new URLSearchParams({
      date_from: dateFrom,
      date_to: dateTo,
      page
    });
    const response = await axiosInstance.get(`/dictionary/?${params}`);
    return response.data;
  }
}; 