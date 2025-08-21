import type { Review } from '@/types/marketplace'
import { mockUsers } from './users'
import { mockProducts } from './products'

export const mockReviews: Review[] = [
  {
    id: '1',
    buyerId: 'buyer1',
    buyer: mockUsers[0],
    productId: '1',
    product: mockProducts[0],
    rating: 5,
    comment: 'Excellent product! The camera quality is amazing.',
    images: [],
    isVerified: true,
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: '2',
    buyerId: 'buyer1',
    buyer: mockUsers[0],
    productId: '2',
    product: mockProducts[1],
    rating: 4,
    comment: 'Great laptop, very fast and lightweight.',
    images: [],
    isVerified: true,
    createdAt: '2024-01-19T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z'
  }
]
