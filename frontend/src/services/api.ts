import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { ENV } from '@/config/env'
// Note: We can't import useAuthStore here due to circular dependency
// We'll handle auth tokens differently

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage to avoid circular dependency
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        const token = localStorage.getItem('auth_token')
        const response = await api.post('/auth/refresh', { token })

        if (response.data.success) {
          localStorage.setItem('auth_token', response.data.token)
          // Retry original request
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, clear token and redirect
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// API methods
export const apiService = {
  // Auth
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials),
    register: (data: { name: string; email: string; password: string; accountType?: string }) =>
      api.post('/auth/register', data),
    logout: () => api.post('/auth/logout'),
    refresh: (token: string) => api.post('/auth/refresh', { token }),
  },

  // Users
  users: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data: any) => api.put('/users/profile', data),
    getAddresses: () => api.get('/users/addresses'),
    addAddress: (data: any) => api.post('/users/addresses', data),
    updateAddress: (id: string, data: any) => api.put(`/users/addresses/${id}`, data),
    deleteAddress: (id: string) => api.delete(`/users/addresses/${id}`),
  },

  // Sellers
  sellers: {
    getProfile: () => api.get('/sellers/profile'),
    updateProfile: (data: any) => api.put('/sellers/profile', data),
    getStores: () => api.get('/sellers/stores'),
    createStore: (data: any) => api.post('/sellers/stores', data),
    updateStore: (id: string, data: any) => api.put(`/sellers/stores/${id}`, data),
    deleteStore: (id: string) => api.delete(`/sellers/stores/${id}`),
    getProducts: (params?: any) => api.get('/sellers/products', { params }),
    createProduct: (data: any) => api.post('/sellers/products', data),
    updateProduct: (id: string, data: any) => api.put(`/sellers/products/${id}`, data),
    deleteProduct: (id: string) => api.delete(`/sellers/products/${id}`),
    getOrders: (params?: any) => api.get('/sellers/orders', { params }),
  },

  // Buyers
  buyers: {
    getProfile: () => api.get('/buyers/profile'),
    getCart: () => api.get('/buyers/cart'),
    addToCart: (data: { productId: string; quantity: number }) => api.post('/buyers/cart', data),
    updateCartItem: (id: string, data: { quantity: number }) => api.put(`/buyers/cart/${id}`, data),
    removeFromCart: (id: string) => api.delete(`/buyers/cart/${id}`),
    getWishlist: () => api.get('/buyers/wishlist'),
    addToWishlist: (data: { productId: string }) => api.post('/buyers/wishlist', data),
    removeFromWishlist: (id: string) => api.delete(`/buyers/wishlist/${id}`),
    getOrders: (params?: any) => api.get('/buyers/orders', { params }),
    createReview: (data: any) => api.post('/buyers/reviews', data),
  },

  // Marketplace
  marketplace: {
    getStores: (params?: any) => api.get('/marketplace/stores', { params }),
    getStore: (id: string) => api.get(`/marketplace/stores/${id}`),
    getProducts: (params?: any) => api.get('/marketplace/products', { params }),
    getProduct: (id: string) => api.get(`/marketplace/products/${id}`),
    getCategories: () => api.get('/marketplace/categories'),
    search: (params: any) => api.get('/marketplace/search', { params }),
  },

  // Admin
  admin: {
    getDashboard: () => api.get('/admin/dashboard'),
    getUsers: (params?: any) => api.get('/admin/users', { params }),
    updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
    getSellers: (params?: any) => api.get('/admin/sellers', { params }),
    getPendingSellers: () => api.get('/admin/sellers/pending'),
    approveSeller: (id: string, data: { isApproved: boolean; notes?: string }) =>
      api.put(`/admin/sellers/${id}/approve`, data),
    verifySeller: (id: string, data: { isVerified: boolean }) =>
      api.put(`/admin/sellers/${id}/verify`, data),
    getProducts: (params?: any) => api.get('/admin/products', { params }),
    getOrders: (params?: any) => api.get('/admin/orders', { params }),
  },
}

// Export axios instance for custom requests
export { api }
export default apiService
