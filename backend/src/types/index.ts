// User types
export interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user: UserWithoutPassword
  token: string
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Validation error types
export interface ValidationError {
  type: string
  value: string
  msg: string
  path: string
  location: string
}
