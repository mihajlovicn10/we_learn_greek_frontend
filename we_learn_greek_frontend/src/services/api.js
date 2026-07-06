import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export these specific APIs
export const dictionaryAPI = {
  getWords: () => api.get('/dictionary/'),
  addWord: (word) => api.post('/dictionary/', word),
  // Add other dictionary endpoints as needed
};

export const greekToGreekAPI = {
  search: (term) => api.get(`/greek-to-greek/search/${term}`),
  // Add other greek-to-greek endpoints as needed
};

export default api; 