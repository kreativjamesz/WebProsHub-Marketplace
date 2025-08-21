// Common utility types used across the application

// Base entity interface
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'draft'

// Sort order types
export type SortOrder = 'asc' | 'desc'

// Date range for filtering
export interface DateRange {
  from: string
  to: string
}

// Pagination parameters
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: SortOrder
}

// Search parameters - marketplace-specific SearchParams moved to marketplace.ts

// File upload types
export interface FileUpload {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedAt: string
}

// Image types
export interface Image {
  id: string
  url: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  thumbnail?: string
}

// Address types - moved to marketplace.ts for domain-specific usage

// Contact information
export interface ContactInfo {
  email: string
  phone?: string
  website?: string
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  isValid: boolean
  isSubmitting: boolean
}

// Modal/Dialog types
export interface ModalState {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

// Loading states
export interface LoadingState {
  isLoading: boolean
  error?: string | null
  retry?: () => void
}

// Select option types
export interface SelectOption<T = string> {
  value: T
  label: string
  disabled?: boolean
  icon?: string
}

// Breadcrumb types
export interface Breadcrumb {
  label: string
  path?: string
  icon?: string
}

// Tab types
export interface Tab {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  badge?: string | number
}

// Menu item types
export interface MenuItem {
  id: string
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
  disabled?: boolean
  badge?: string | number
  permission?: string
}
