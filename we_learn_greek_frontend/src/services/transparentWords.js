import axiosInstance from './axiosConfig';

export const transparentWordsAPI = {
  getAllWords: async (page = 1, filters = {}) => {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    const response = await axiosInstance.get(`/transparent-words/?${params}`);
    return response.data;
  },

  searchWords: async (searchTerm, page = 1) => {
    const params = new URLSearchParams({
      search: searchTerm,
      page
    });
    const response = await axiosInstance.get(`/transparent-words/search/?${params}`);
    return response.data;
  },

  getWordsByLanguage: async (language, page = 1) => {
    const params = new URLSearchParams({
      language,
      page
    });
    const response = await axiosInstance.get(`/transparent-words/?${params}`);
    return response.data;
  }
}; 