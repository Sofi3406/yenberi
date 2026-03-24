import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://slma.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('slma_token') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isBrowser = typeof window !== 'undefined';

    if (error.response?.status === 401) {
      if (isBrowser) {
        localStorage.removeItem('slma_token');
        localStorage.removeItem('slma_user');
        window.location.href = '/auth/login';
      }
    }
    if (error.response?.status === 403 && error.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
      if (isBrowser) {
        localStorage.removeItem('slma_token');
        localStorage.removeItem('slma_user');
        window.location.href = '/auth/login?unverified=1';
      }
    }
    return Promise.reject(error);
  }
);

export default api;