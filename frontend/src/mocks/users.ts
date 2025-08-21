import type { User } from '@/types/marketplace'

export const mockUsers: User[] = [
  {
    id: 'buyer1',
    email: 'buyer@example.com',
    name: 'John Doe',
    role: 'BUYER',
    phone: '+63 912 345 6789',
    avatar: '/images/avatars/buyer1.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'seller1',
    email: 'seller1@example.com',
    name: 'Jane Smith',
    role: 'SELLER',
    phone: '+63 912 345 6790',
    avatar: '/images/avatars/seller1.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'seller2',
    email: 'seller2@example.com',
    name: 'Bob Johnson',
    role: 'SELLER',
    phone: '+63 912 345 6791',
    avatar: '/images/avatars/seller2.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]
