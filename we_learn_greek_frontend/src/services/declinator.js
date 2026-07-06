import axiosInstance from './axiosConfig';

export const declinatorAPI = {
  getAllNouns: async (page = 1, filters = {}) => {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    const response = await axiosInstance.get(`/nouns/?${params}`);
    return response.data;
  },

  searchNouns: async (searchTerm) => {
    const response = await axiosInstance.get(`/nouns/search/?term=${searchTerm}`);
    return response.data;
  },

  getNounById: async (id) => {
    const response = await axiosInstance.get(`/nouns/${id}/`);
    return response.data;
  }
};
