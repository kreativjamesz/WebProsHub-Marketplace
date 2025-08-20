import { ENV } from './env'

export const APP_CONFIG = {
  name: ENV.APP_NAME,
  description: ENV.APP_DESCRIPTION,
  version: '1.0.0',
  api: {
    baseUrl: ENV.API_URL,
    timeout: 30000,
  },
  maps: {
    apiKey: ENV.GOOGLE_MAPS_API_KEY,
    defaultCenter: { lat: 14.5995, lng: 120.9842 }, // Manila, Philippines
    defaultZoom: 10,
  },
  features: {
    maps: ENV.ENABLE_MAPS,
    marketplace: ENV.ENABLE_MARKETPLACE,
    customThemes: ENV.ENABLE_CUSTOM_THEMES,
    reviews: ENV.ENABLE_REVIEWS,
    notifications: ENV.ENABLE_NOTIFICATIONS,
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  }
}

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
    ADDRESSES: '/users/addresses',
  },
  SELLERS: {
    PROFILE: '/sellers/profile',
    STORES: '/sellers/stores',
    PRODUCTS: '/sellers/products',
    ORDERS: '/sellers/orders',
  },
  BUYERS: {
    CART: '/buyers/cart',
    WISHLIST: '/buyers/wishlist',
    ORDERS: '/buyers/orders',
    REVIEWS: '/buyers/reviews',
  },
  MARKETPLACE: {
    STORES: '/marketplace/stores',
    PRODUCTS: '/marketplace/products',
    CATEGORIES: '/marketplace/categories',
    SEARCH: '/marketplace/search',
  },
  ADMIN: {
    USERS: '/admin/users',
    SELLERS: '/admin/sellers',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    DASHBOARD: '/admin/dashboard',
  }
}

export const USER_ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
} as const

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.REFUNDED]: 'Refunded',
} as const

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PROCESSING]: 'primary',
  [ORDER_STATUS.SHIPPED]: 'success',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger',
  [ORDER_STATUS.REFUNDED]: 'secondary',
} as const

export const THEMES = {
  DEFAULT: 'default',
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal',
  COLORFUL: 'colorful',
} as const

export const STORE_THEMES = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and professional default theme',
    preview: '/themes/default-preview.jpg',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold elements',
    preview: '/themes/modern-preview.jpg',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and elegant design',
    preview: '/themes/classic-preview.jpg',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and focused design',
    preview: '/themes/minimal-preview.jpg',
  },
  {
    id: 'colorful',
    name: 'Colorful',
    description: 'Vibrant and energetic design',
    preview: '/themes/colorful-preview.jpg',
  },
]
