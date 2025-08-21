// Authentication and user management types

export interface AuthUser {
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
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  marketingEmails?: boolean
}

export interface AuthResponse {
  success: boolean
  user: AuthUser
  token: string
  refreshToken: string
  expiresIn: number
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  success: boolean
  token: string
  refreshToken: string
  expiresIn: number
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileRequest {
  name?: string
  phone?: string
  avatar?: string
}

export interface EmailVerificationRequest {
  email: string
}

export interface EmailVerificationConfirm {
  token: string
}

export interface TwoFactorAuth {
  enabled: boolean
  secret?: string
  backupCodes?: string[]
  lastUsed?: string
}

export interface TwoFactorAuthSetup {
  secret: string
  qrCode: string
  backupCodes: string[]
}

export interface TwoFactorAuthVerify {
  code: string
  remember?: boolean
}

export interface Session {
  id: string
  userId: string
  userAgent: string
  ipAddress: string
  lastActivity: string
  expiresAt: string
  isActive: boolean
}

export interface LoginHistory {
  id: string
  userId: string
  loginAt: string
  ipAddress: string
  userAgent: string
  location?: string
  success: boolean
  failureReason?: string
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  isSystem: boolean
  createdAt: string
  updatedAt: string
}

export interface UserRole {
  userId: string
  roleId: string
  assignedAt: string
  assignedBy: string
  expiresAt?: string
}
