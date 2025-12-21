export const BASE_URL = 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
  },
  USERS: {
    BASE: '/api/v1/users',
    DETAILS: (id: string) => `/api/v1/users/${id}`,
  },
};
