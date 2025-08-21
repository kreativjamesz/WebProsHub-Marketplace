import type { Product } from '@/types/marketplace'
import { mockCategories } from './categories'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 89999.00,
    stock: 25,
    images: [],
    categoryId: '4',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[3], // Mobile
    isActive: true,
    isFeatured: true,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with M2 chip for incredible performance',
    price: 129999.00,
    stock: 15,
    images: [],
    categoryId: '3',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[2], // Computers
    isActive: true,
    isFeatured: true,
    minStock: 3,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'AirPods Pro',
    description: 'Active noise cancellation with spatial audio',
    price: 24999.00,
    stock: 50,
    images: [],
    categoryId: '2',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[1], // Audio
    isActive: true,
    isFeatured: false,
    minStock: 10,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '4',
    name: 'iPad Air',
    description: 'Powerful tablet for work and creativity',
    price: 49999.00,
    stock: 30,
    images: [],
    categoryId: '3',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[2], // Computers
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    description: 'Advanced health monitoring and fitness tracking',
    price: 39999.00,
    stock: 20,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[0], // Electronics
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '6',
    name: 'HomePod mini',
    description: 'Smart speaker with Siri and amazing sound',
    price: 9999.00,
    stock: 45,
    images: [],
    categoryId: '2',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[1], // Audio
    isActive: true,
    isFeatured: false,
    minStock: 10,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '7',
    name: 'Magic Keyboard',
    description: 'Wireless keyboard with Touch ID',
    price: 14999.00,
    stock: 15,
    images: [],
    categoryId: '3',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[2], // Computers
    isActive: true,
    isFeatured: false,
    minStock: 3,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '8',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 2999.0,
    stock: 50,
    images: [],
    categoryId: '2',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[1], // Audio
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '9',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch',
    price: 8999.0,
    stock: 25,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[0], // Electronics
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '10',
    name: 'Portable Power Bank',
    description: '10000mAh portable charger for all your devices',
    price: 1499.0,
    stock: 100,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[0], // Electronics
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '11',
    name: 'USB-C Cable Set',
    description: 'High-speed charging cables for modern devices',
    price: 799.0,
    stock: 200,
    images: [],
    categoryId: '1',
    storeId: '1',
    sellerId: 'seller1',
    category: mockCategories[0], // Electronics
    isActive: true,
    isFeatured: false,
    minStock: 5,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
]
