// Environment configuration
export const ENV = {
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'WebProsHubMarketplace',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Professional marketplace with Google Maps integration',
  
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // Google Maps
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  
  // Feature Flags
  ENABLE_MAPS: import.meta.env.VITE_ENABLE_MAPS === 'true',
  ENABLE_MARKETPLACE: import.meta.env.VITE_ENABLE_MARKETPLACE !== 'false',
  ENABLE_CUSTOM_THEMES: import.meta.env.VITE_ENABLE_CUSTOM_THEMES !== 'false',
  ENABLE_REVIEWS: import.meta.env.VITE_ENABLE_REVIEWS !== 'false',
  ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
  
  // Development
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  
  // Node Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const

// Default environment variables for development
if (ENV.IS_DEV) {
  console.log('Environment Configuration:', ENV)
}
