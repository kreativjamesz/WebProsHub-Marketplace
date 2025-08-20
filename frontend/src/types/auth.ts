export interface User {
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

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user: User
  token: string
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}
