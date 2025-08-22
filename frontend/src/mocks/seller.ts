export interface SellerStats {
  totalSales: number
  salesGrowth: number
  totalOrders: number
  ordersGrowth: number
  activeProducts: number
  lowStockProducts: number
  newCustomers: number
  customersGrowth: number
}

export interface SellerOrder {
  id: number
  orderNumber: string
  customerName: string
  date: string
  items: number
  total: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}

export interface LowStockProduct {
  id: number
  name: string
  sku: string
  stock: number
}

export interface ChartPeriod {
  label: string
  value: string
}

export const mockSellerStats: SellerStats = {
  totalSales: 125000,
  salesGrowth: 12.5,
  totalOrders: 156,
  ordersGrowth: 8.3,
  activeProducts: 89,
  lowStockProducts: 5,
  newCustomers: 23,
  customersGrowth: 15.2
}

export const mockRecentOrders: SellerOrder[] = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    date: '2 hours ago',
    items: 3,
    total: 2500,
    status: 'Pending'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    date: '4 hours ago',
    items: 1,
    total: 1200,
    status: 'Processing'
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customerName: 'Mike Johnson',
    date: '6 hours ago',
    items: 2,
    total: 1800,
    status: 'Shipped'
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customerName: 'Sarah Wilson',
    date: '1 day ago',
    items: 4,
    total: 3200,
    status: 'Delivered'
  }
]

export const mockLowStockProducts: LowStockProduct[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'WH-001',
    stock: 3
  },
  {
    id: 2,
    name: 'Smart Watch',
    sku: 'SW-002',
    stock: 2
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    sku: 'BS-003',
    stock: 1
  }
]

export const mockChartPeriods: ChartPeriod[] = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '3 Months', value: '3m' },
  { label: '1 Year', value: '1y' }
]
