import type { CartItem } from '@/types/marketplace'
import { mockProducts } from './products'

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    productId: '1',
    product: mockProducts[0], // iPhone 15 Pro
    quantity: 1,
    buyerId: 'buyer1',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    productId: '2',
    product: mockProducts[1], // MacBook Air M2
    quantity: 1,
    buyerId: 'buyer1',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
]
