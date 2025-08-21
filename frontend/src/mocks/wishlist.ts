import type { WishlistItem } from '@/types/marketplace'
import { mockProducts } from './products'

export const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    productId: '1',
    product: mockProducts[0], // iPhone 15 Pro
    buyerId: 'buyer1',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    productId: '2',
    product: mockProducts[1], // MacBook Air M2
    buyerId: 'buyer1',
    createdAt: '2024-01-18T00:00:00Z'
  },
  {
    id: '3',
    productId: '3',
    product: mockProducts[2], // AirPods Pro
    buyerId: 'buyer1',
    createdAt: '2024-01-20T00:00:00Z'
  }
]

export const mockRecommendations: typeof mockProducts = [
  mockProducts[3], // iPad Air
  mockProducts[4], // Apple Watch Series 9
  mockProducts[5], // HomePod mini
  mockProducts[6]  // Magic Keyboard
]
