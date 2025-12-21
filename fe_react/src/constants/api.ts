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
  SOURCES: {
    BASE: '/api/v1/sources',
    DETAILS: (id: string) => `/api/v1/sources/${id}`,
  },
  RULES: {
    BASE: '/api/v1/rules',
    DETAILS: (id: string) => `/api/v1/rules/${id}`,
  },
  VIOLATIONS: {
    BASE: '/api/v1/violations',
    DETAILS: (id: string) => `/api/v1/violations/${id}`,
    MY: '/api/v1/violations/my',
  },
  ZONES: {
    BASE: '/api/v1/zones',
    DETAILS: (id: string) => `/api/v1/zones/${id}`,
  },
  ASSIGNMENTS: {
    BASE: '/api/v1/assignments',
    POLICE: (id: string) => `/api/v1/assignments/police/${id}`,
    MY: '/api/v1/assignments/my-sources',
    ALL: '/api/v1/assignments/all',
  },
};
