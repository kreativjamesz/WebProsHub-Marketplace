// API-related types for HTTP requests, responses, and Axios

// Base API response structure
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: PaginationMeta
  timestamp: string
  path: string
}

// Pagination metadata
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

// API error response
export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
  timestamp: string
  path: string
  traceId?: string
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Request configuration
export interface RequestConfig {
  method: HttpMethod
  url: string
  params?: Record<string, any>
  data?: any
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
}

// Response interceptor types
export interface ResponseInterceptor {
  onFulfilled?: (response: any) => any
  onRejected?: (error: any) => any
}

// Request interceptor types
export interface RequestInterceptor {
  onFulfilled?: (config: any) => any
  onRejected?: (error: any) => any
}

// Axios instance configuration
export interface AxiosConfig {
  baseURL: string
  timeout: number
  headers: Record<string, string>
  withCredentials: boolean
}

// API service configuration
export interface ApiServiceConfig {
  baseURL: string
  timeout: number
  retries: number
  retryDelay: number
  authHeader: string
}

// Query parameters for GET requests
export interface QueryParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
  include?: string[]
  select?: string[]
}

// Bulk operation types
export interface BulkOperation {
  ids: string[]
  action: 'delete' | 'activate' | 'deactivate' | 'approve' | 'reject'
  data?: Record<string, any>
}

export interface BulkOperationResult {
  success: number
  failed: number
  errors: Array<{
    id: string
    error: string
  }>
}

// File upload response
export interface FileUploadResponse {
  id: string
  filename: string
  url: string
  size: number
  mimeType: string
  uploadedAt: string
}

// Authentication headers
export interface AuthHeaders {
  Authorization?: string
  'X-API-Key'?: string
  'X-Request-ID'?: string
  'X-Client-Version'?: string
}

// Rate limiting headers
export interface RateLimitHeaders {
  'X-RateLimit-Limit': string
  'X-RateLimit-Remaining': string
  'X-RateLimit-Reset': string
}

// WebSocket message types
export interface WebSocketMessage<T = any> {
  type: 'notification' | 'update' | 'error' | 'ping' | 'pong'
  data?: T
  timestamp: string
  id?: string
}

// API health check response
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: string
  uptime: number
  version: string
  services: {
    database: 'healthy' | 'unhealthy'
    redis: 'healthy' | 'unhealthy'
    external: 'healthy' | 'unhealthy'
  }
}

// API metrics
export interface ApiMetrics {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  activeConnections: number
  lastUpdated: string
}

// Cache control headers
export interface CacheControl {
  'Cache-Control'?: string
  'ETag'?: string
  'Last-Modified'?: string
  'Expires'?: string
}

// CORS headers
export interface CorsHeaders {
  'Access-Control-Allow-Origin'?: string
  'Access-Control-Allow-Methods'?: string
  'Access-Control-Allow-Headers'?: string
  'Access-Control-Allow-Credentials'?: string
}
