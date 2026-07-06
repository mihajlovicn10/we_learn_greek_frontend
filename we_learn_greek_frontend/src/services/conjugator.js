import axiosInstance from './axiosConfig';

export const conjugatorAPI = {
  getAllVerbs: async (page = 1, filters = {}) => {
    const params = new URLSearchParams({
      page,
      ...filters
    });
    const response = await axiosInstance.get(`/verbs/?${params}`);
    return response.data;
  },

  searchVerbs: async (searchTerm) => {
    const response = await axiosInstance.get(`/verbs/search/?term=${searchTerm}`);
    return response.data;
  },

  getVerbById: async (id) => {
    const response = await axiosInstance.get(`/verbs/${id}/`);
    return response.data;
  }
};
