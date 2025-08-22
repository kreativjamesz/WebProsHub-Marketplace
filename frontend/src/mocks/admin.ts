export interface AdminStats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingApprovals: number
  activeStores: number
  monthlyGrowth: number
}

export interface AdminOrder {
  id: string
  orderNumber: string
  customerName: string
  sellerName: string
  total: number
  status: string
  date: string
  items: number
}

export interface AdminSeller {
  id: string
  name: string
  email: string
  businessName: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  joinDate: string
  totalProducts: number
  totalSales: number
  isVerified: boolean
}

export interface AdminProduct {
  id: string
  name: string
  seller: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'pending' | 'flagged'
  createdAt: string
  sales: number
}

export const mockAdminStats: AdminStats = {
  totalUsers: 1247,
  totalSellers: 89,
  totalProducts: 2156,
  totalOrders: 3421,
  totalRevenue: 1250000,
  pendingApprovals: 23,
  activeStores: 67,
  monthlyGrowth: 15.3
}

export const mockAdminOrders: AdminOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    sellerName: 'TechStore',
    total: 2500,
    status: 'Delivered',
    date: '2024-01-15',
    items: 3
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    sellerName: 'FashionHub',
    total: 1200,
    status: 'Processing',
    date: '2024-01-14',
    items: 2
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customerName: 'Mike Johnson',
    sellerName: 'HomeDecor',
    total: 1800,
    status: 'Shipped',
    date: '2024-01-13',
    items: 1
  }
]

export const mockAdminSellers: AdminSeller[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techstore.com',
    businessName: 'TechStore',
    status: 'approved',
    joinDate: '2024-01-01',
    totalProducts: 45,
    totalSales: 125000,
    isVerified: true
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@fashionhub.com',
    businessName: 'FashionHub',
    status: 'pending',
    joinDate: '2024-01-10',
    totalProducts: 0,
    totalSales: 0,
    isVerified: false
  },
  {
    id: '3',
    name: 'Mike Brown',
    email: 'mike@homedecor.com',
    businessName: 'HomeDecor',
    status: 'approved',
    joinDate: '2023-12-15',
    totalProducts: 32,
    totalSales: 89000,
    isVerified: true
  }
]

export const mockAdminProducts: AdminProduct[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    seller: 'TechStore',
    category: 'Electronics',
    price: 2500,
    stock: 45,
    status: 'active',
    createdAt: '2024-01-01',
    sales: 23
  },
  {
    id: '2',
    name: 'Smart Watch',
    seller: 'TechStore',
    category: 'Electronics',
    price: 3500,
    stock: 12,
    status: 'active',
    createdAt: '2024-01-05',
    sales: 8
  },
  {
    id: '3',
    name: 'Designer Dress',
    seller: 'FashionHub',
    category: 'Fashion',
    price: 1800,
    stock: 8,
    status: 'pending',
    createdAt: '2024-01-10',
    sales: 0
  }
]
