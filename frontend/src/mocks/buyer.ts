import type { Order, Product } from '@/types/marketplace'
import { mockOrders, mockProducts } from './index'

export interface BuyerStats {
  totalOrders: number
  totalSpent: number
  savedAmount: number
  favoriteStores: number
  wishlistItems: number
  cartItems: number
}

export const mockBuyerStats: BuyerStats = {
  totalOrders: 24,
  totalSpent: 2847.50,
  savedAmount: 156.80,
  favoriteStores: 8,
  wishlistItems: 12,
  cartItems: 3
}

export const mockRecentOrders = mockOrders
export const mockRecommendedProducts = mockProducts.slice(0, 4) // First 4 products
