import type { Product, Store, Category } from '@/types/marketplace'
import { mockProducts, mockStores, mockCategories } from './index'

export interface SearchFilters {
  categories: string[]
  stores: string[]
  priceRange: {
    min: number
    max: number
  }
  rating: number
  availability: 'in-stock' | 'out-of-stock' | 'all'
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest'
}

export const mockSearchFilters: SearchFilters = {
  categories: ['1', '2', '3'], // Electronics, Fashion, Home
  stores: ['store1', 'store2'],
  priceRange: {
    min: 0,
    max: 1000
  },
  rating: 4,
  availability: 'in-stock',
  sortBy: 'relevance'
}

export const mockSearchResults = mockProducts
export const mockSearchStores = mockStores
export const mockSearchCategories = mockCategories

export const mockSearchSuggestions = [
  'iPhone 15 Pro',
  'MacBook Air M2',
  'AirPods Pro',
  'iPad Air',
  'Apple Watch Series 9',
  'MacBook Pro 14"',
  'iMac 24"',
  'Mac mini'
]
