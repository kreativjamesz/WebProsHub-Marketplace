# Types Directory

This directory contains all TypeScript type definitions for the WebProsHubMarketplace application, organized by domain and concern.

## 📁 File Structure

```
types/
├── index.ts           # Central export file for all types
├── marketplace.ts     # Marketplace business logic types
├── auth.ts           # Authentication and user management types
├── admin.ts          # Admin-specific types
├── common.ts         # Shared utility types
├── api.ts            # API and HTTP-related types
└── README.md         # This documentation file
```

## 🏗️ Type Organization

### 1. **`marketplace.ts`** - Core Business Types
Core marketplace functionality types including:
- **Products**: `Product`, `Category`, `Review`
- **Stores**: `Store`, `StoreTheme`, `SellerProfile`
- **Orders**: `Order`, `OrderItem`, `CartItem`, `WishlistItem`
- **Users**: `User`, `BuyerProfile`
- **Addresses**: `Address`
- **Search & Pagination**: `SearchParams`, `PaginationMeta`

### 2. **`auth.ts`** - Authentication & User Management
Authentication and user-related types including:
- **User Management**: `User`, `Role`, `Permission`
- **Authentication**: `LoginCredentials`, `AuthResponse`, `JWTPayload`
- **Security**: `TwoFactorAuth`, `Session`, `LoginHistory`
- **Password Management**: `PasswordResetRequest`, `ChangePasswordRequest`
- **Profile Updates**: `UpdateProfileRequest`

### 3. **`admin.ts`** - Admin Dashboard Types
Administrative functionality types including:
- **Dashboard**: `AdminStats`, `RecentActivity`, `PendingApproval`
- **User Management**: `AdminUserFilters`
- **Analytics**: `AdminAnalytics`
- **Approval Workflows**: Approval statuses and workflows

### 4. **`common.ts`** - Shared Utility Types
Common types used across the application:
- **Base Entities**: `BaseEntity`, `Status`, `SortOrder`
- **UI Components**: `ModalState`, `LoadingState`, `Tab`, `MenuItem`
- **Forms**: `FormState`, `ValidationError`, `SelectOption`
- **Files & Images**: `FileUpload`, `Image`
- **Navigation**: `Breadcrumb`, `MenuItem`

### 5. **`api.ts`** - API & HTTP Types
API-related types for HTTP requests and responses:
- **HTTP**: `HttpMethod`, `RequestConfig`, `ResponseInterceptor`
- **Responses**: `ApiResponse`, `ApiError`, `PaginationMeta`
- **Axios**: `AxiosConfig`, `ApiServiceConfig`
- **Headers**: `AuthHeaders`, `RateLimitHeaders`, `CacheControl`
- **WebSockets**: `WebSocketMessage`
- **Health & Metrics**: `HealthCheckResponse`, `ApiMetrics`

## 🔄 Type Relationships

### Inheritance & Composition
- `Product` extends business logic with `Category` and `Store` relationships
- `Order` composes `OrderItem[]` and `Address`
- `User` has role-based access with `Role` and `Permission`

### Shared Patterns
- All entities implement `BaseEntity` pattern (id, createdAt, updatedAt)
- Consistent pagination with `PaginationMeta`
- Standardized API responses with `ApiResponse<T>`
- Form handling with `FormState<T>`

## 📝 Usage Examples

### Importing Types
```typescript
// Import specific types
import type { Product, Store, User } from '@/types/marketplace'
import type { AdminStats, RecentActivity } from '@/types/admin'
import type { ApiResponse, PaginationMeta } from '@/types/api'

// Import all types from a domain
import type * as MarketplaceTypes from '@/types/marketplace'
import type * as AuthTypes from '@/types/auth'

// Import from central index
import type { Product, User, ApiResponse } from '@/types'
```

### Type Usage in Components
```typescript
// Vue component with proper typing
const products = ref<Product[]>([])
const loading = ref<LoadingState>({ isLoading: false, error: null })
const formState = ref<FormState<LoginCredentials>>({
  data: { email: '', password: '' },
  errors: [],
  isValid: false,
  isSubmitting: false
})
```

### API Service Typing
```typescript
// Typed API service
class ProductService {
  async getProducts(params: QueryParams): Promise<ApiResponse<Product[]>> {
    // Implementation
  }
  
  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    // Implementation
  }
}
```

## 🚀 Best Practices

### 1. **Type Naming Conventions**
- Use PascalCase for interfaces: `UserProfile`, `ProductCategory`
- Use camelCase for types: `sortOrder`, `httpMethod`
- Suffix with purpose: `Request`, `Response`, `Config`, `State`

### 2. **Interface Design**
- Keep interfaces focused and single-purpose
- Use optional properties (`?`) for non-required fields
- Extend base interfaces when possible
- Use union types for constrained values

### 3. **Generic Types**
- Use generics for reusable types: `ApiResponse<T>`, `FormState<T>`
- Provide default types where appropriate: `SelectOption<T = string>`
- Use constraints for generic parameters

### 4. **Type Safety**
- Avoid `any` type - use `unknown` or specific types
- Use strict union types for status fields
- Leverage TypeScript's built-in utility types

## 🔧 Adding New Types

### 1. **Create New Type File**
```typescript
// types/newfeature.ts
export interface NewFeature {
  id: string
  name: string
  // ... other properties
}
```

### 2. **Export from Index**
```typescript
// types/index.ts
export * from './newfeature'
```

### 3. **Use in Components**
```typescript
import type { NewFeature } from '@/types'
```

## 📚 Related Documentation

- **Vue 3 Composition API**: [Vue 3 Types](https://vuejs.org/guide/typescript/overview.html)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Axios**: [Axios TypeScript](https://axios-http.com/docs/typescript)

## 🤝 Contributing

When adding new types:
1. Follow existing naming conventions
2. Add JSDoc comments for complex types
3. Update this README if adding new categories
4. Ensure types are properly exported
5. Add examples in the usage section
