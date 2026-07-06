import axiosInstance from './axiosConfig';

export const greekToGreekAPI = {
  getAllWords: async (page = 1, filters = {}) => {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    const response = await axiosInstance.get(`/greek-to-greek/?${params}`);
    return response.data;
  },

  searchWords: async (searchTerm, page = 1) => {
    const params = new URLSearchParams({
      search: searchTerm,
      page
    });
    const response = await axiosInstance.get(`/greek-to-greek/search/?${params}`);
    return response.data;
  },

  getWordById: async (id) => {
    const response = await axiosInstance.get(`/greek-to-greek/${id}/`);
    return response.data;
  }
}; 