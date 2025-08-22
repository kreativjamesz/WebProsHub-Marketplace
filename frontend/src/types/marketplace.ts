export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  parentId?: string
  parent?: Category
  children?: Category[]
  sellerId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    products: number
  }
  // Add these properties for the CategoriesView
  productCount?: number
  storeCount?: number
  popularProducts?: Array<{
    id: string
    name: string
  }>
}

export interface Store {
  id: string
  sellerId: string
  seller?: SellerProfile
  name: string
  description?: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
  phone?: string
  email?: string
  website?: string
  banner?: string
  openingHours?: any
  isActive: boolean
  createdAt: string
  updatedAt: string
  products?: Product[]
}

export interface Product {
  id: string
  sellerId: string
  seller?: SellerProfile
  storeId?: string
  store?: Store
  categoryId: string
  category: Category
  name: string
  description?: string
  price: number
  comparePrice?: number
  cost?: number
  sku?: string
  rating?: number
  reviewCount?: number
  images: string[]
  barcode?: string
  weight?: number
  dimensions?: any
  isActive: boolean
  isFeatured: boolean
  stock: number
  minStock: number
  maxStock?: number
  createdAt: string
  updatedAt: string
  reviews?: Review[]
  _count?: {
    reviews: number
  }
}

export interface SellerProfile {
  id: string
  userId: string
  user?: MarketplaceUser
  businessName: string
  businessType: string
  description?: string
  logo?: string
  banner?: string
  themeId?: string
  theme?: StoreTheme
  isVerified: boolean
  isActive: boolean
  isApproved: boolean
  approvalDate?: string
  approvedBy?: string
  createdAt: string
  updatedAt: string
  stores?: Store[]
  products?: Product[]
  categories?: Category[]
  _count?: {
    products: number
    orders: number
  }
}

export interface StoreTheme {
  id: string
  name: string
  description?: string
  preview?: string
  css: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  buyerId: string
  buyer?: MarketplaceUser
  productId: string
  product?: Product
  rating: number
  comment?: string
  images?: string[]
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  buyerId: string
  buyer?: BuyerProfile
  productId: string
  product: Product
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: string
  buyerId: string
  buyer?: BuyerProfile
  productId: string
  product: Product
  createdAt: string
}

export interface Order {
  id: string
  buyerId: string
  buyer?: MarketplaceUser
  sellerId: string
  seller?: SellerProfile
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'REFUNDED'
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  notes?: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  shippingAddress: Address
}

export interface OrderItem {
  id: string
  orderId: string
  order?: Order
  productId: string
  product: Product
  quantity: number
  price: number
  total: number
  createdAt: string
}

export interface Address {
  id: string
  userId: string
  user?: MarketplaceUser
  type: 'SHIPPING' | 'BILLING'
  name: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface BuyerProfile {
  id: string
  userId: string
  user?: MarketplaceUser
  birthDate?: string
  preferences?: any
  createdAt: string
  updatedAt: string
}

export interface MarketplaceUser {
  id: string
  email: string
  name: string
  role: 'BUYER' | 'SELLER' | 'ADMIN' | 'STAFF'
  phone?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// PaginationMeta moved to api.ts for centralized API types

// ApiResponse moved to api.ts for centralized API types

export interface SearchParams {
  q: string
  type?: 'all' | 'products' | 'stores'
  page?: number
  limit?: number
  category?: string
  seller?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
