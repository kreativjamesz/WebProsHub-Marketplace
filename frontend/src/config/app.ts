export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'WebProsHubMarketplace',
  description:
    import.meta.env.VITE_APP_DESCRIPTION || 'Professional marketplace with Google Maps integration',
  version: '1.0.0',
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
  },
  maps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    defaultCenter: { lat: 14.5995, lng: 120.9842 }, // Manila, Philippines
    defaultZoom: 10,
  },
  features: {
    maps: true,
    marketplace: true,
    customThemes: true,
    reviews: true,
    notifications: true,
  },
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
  },
}
