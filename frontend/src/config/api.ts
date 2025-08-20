export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
  },
  ADMIN: {
    USERS: '/admin/users',
    DASHBOARD: '/admin/dashboard',
  }
}
