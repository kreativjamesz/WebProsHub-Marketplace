import type { Store } from '@/types/marketplace'

export const mockStores: Store[] = [
  {
    id: '1',
    sellerId: 'seller1',
    name: 'Tech Gadgets Store',
    description: 'Premium electronics and gadgets store',
    address: '123 Tech Street',
    city: 'Manila',
    state: 'Metro Manila',
    country: 'Philippines',
    postalCode: '1000',
    latitude: 14.5995,
    longitude: 120.9842,
    phone: '+63 2 1234 5678',
    email: 'contact@techgadgets.com',
    website: 'https://techgadgets.com',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    sellerId: 'seller2',
    name: 'Audio Haven',
    description: 'Specialized audio equipment store',
    address: '456 Audio Avenue',
    city: 'Quezon City',
    state: 'Metro Manila',
    country: 'Philippines',
    postalCode: '1100',
    latitude: 14.6760,
    longitude: 121.0437,
    phone: '+63 2 8765 4321',
    email: 'info@audiohaven.com',
    website: 'https://audiohaven.com',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]
