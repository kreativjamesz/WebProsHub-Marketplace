export interface AdminStats {
  totalUsers: number
  newUsersThisMonth: number
  totalOrders: number
  newOrdersThisMonth: number
  totalStores: number
  newStoresThisMonth: number
  totalRevenue: number
  revenueGrowth: number
}

export interface RecentActivity {
  id: string
  type: 'user' | 'order' | 'store' | 'product'
  message: string
  timestamp: string
}

export interface PendingApproval {
  id: string
  type: 'Store' | 'Product' | 'Seller' | 'Category'
  name: string
  submittedAt: string
  status?: 'pending' | 'approved' | 'rejected'
  description?: string
  userId?: string
  storeId?: string
  productId?: string
}

// Admin user management types
export interface AdminUserFilters {
  role?: string
  status?: string
  dateRange?: {
    from: string
    to: string
  }
  searchTerm?: string
}

// Admin analytics types
export interface AdminAnalytics {
  userGrowth: {
    period: string
    count: number
  }[]
  revenueGrowth: {
    period: string
    amount: number
  }[]
  topCategories: {
    name: string
    sales: number
    revenue: number
  }[]
  topSellers: {
    id: string
    name: string
    sales: number
    revenue: number
  }[]
}
