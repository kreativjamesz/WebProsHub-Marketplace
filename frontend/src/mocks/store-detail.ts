import type { Store, Product, Review } from '@/types/marketplace'
import { mockProducts, mockReviews } from './index'

export const mockStoreDetail: Store = {
  id: 'store1',
  sellerId: 'seller1',
  name: 'Tech Haven',
  description: 'Your one-stop shop for all things technology. We offer the latest gadgets, electronics, and tech accessories with competitive prices and excellent customer service.',
  address: '456 Tech Street',
  city: 'San Francisco',
  state: 'CA',
  country: 'USA',
  postalCode: '94102',
  latitude: 37.7749,
  longitude: -122.4194,
  phone: '+1 (555) 987-6543',
  email: 'hello@techhaven.com',
  website: 'https://techhaven.com',
  banner: '/images/stores/tech-haven-banner.jpg',
  openingHours: {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '09:00', close: '18:00' },
    friday: { open: '09:00', close: '18:00' },
    saturday: { open: '10:00', close: '16:00' },
    sunday: { open: '11:00', close: '15:00' }
  },
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const mockStoreProducts = mockProducts.filter(p => p.storeId === 'store1')
export const mockStoreReviews = mockReviews.filter(r => r.storeId === 'store1')

export const mockStoreStats = {
  totalProducts: 156,
  totalOrders: 1247,
  totalReviews: 89,
  averageRating: 4.6,
  responseRate: 98,
  responseTime: '2 hours'
}
