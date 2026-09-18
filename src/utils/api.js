import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// JWT is disabled by default. When enabled on the backend, uncomment below
// and store the token after a call to /api/auth/login.
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('jwt_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export const timelineApi = {
  getAll: () => api.get('/timeline'),
};

export const memoryApi = {
  getAll: () => api.get('/memories'),
};

export const wishApi = {
  getRandom: () => api.get('/wishes/random'),
  getAll: () => api.get('/wishes'),
};

export const quizApi = {
  getAll: () => api.get('/quiz'),
  submitScore: (score) => api.post('/quiz/score', { score }),
};

export const greetingApi = {
  get: () => api.get('/greeting'),
};

export const configApi = {
  get: () => api.get('/config'),
};

export default api;
