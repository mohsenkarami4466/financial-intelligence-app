import axios from 'axios';

/** در production (GitHub Pages) mock فعال است مگر VITE_USE_MOCK=false تنظیم شود */
export const IS_MOCK_API =
  import.meta.env.VITE_USE_MOCK === 'true' ||
  (import.meta.env.PROD && import.meta.env.VITE_USE_MOCK !== 'false');

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Network error';
    return Promise.reject(new Error(message));
  }
);

export default api;
