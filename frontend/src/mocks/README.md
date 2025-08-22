# Mock Data Management

This directory contains centralized mock data for development and testing purposes. All mock data is organized by feature and exported through the main `index.ts` file.

## 📁 Structure

```
mocks/
├── index.ts              # Central export file
├── README.md            # This file
├── categories.ts        # Product categories
├── products.ts          # Product listings
├── stores.ts            # Store information
├── orders.ts            # Order data
├── users.ts             # User profiles
├── reviews.ts           # Product reviews
├── cart.ts              # Shopping cart
├── wishlist.ts          # Wishlist items
├── buyer.ts             # Buyer-specific data
├── seller.ts            # Seller dashboard data
├── admin.ts             # Admin panel data
├── profile.ts           # User profile data
├── search.ts            # Search results
├── store-detail.ts      # Store details
└── product-detail.ts    # Product details
```

## 🚀 Usage

### Import from centralized location:
```typescript
import { mockProducts, mockCategories, mockSellerStats } from '@/mocks'
```

### Use in components:
```typescript
// Before (local mocks - NOT RECOMMENDED)
const localMock = { name: 'Product', price: 100 }

// After (centralized mocks - RECOMMENDED)
import { mockProducts } from '@/mocks'
const products = ref(mockProducts)
```

## 🔄 Migration to Real API

When you're ready to switch from mocks to real backend data:

### 1. Update API Service
```typescript
// services/api.ts
export const apiService = {
  products: {
    getAll: () => fetch('/api/products'),
    getById: (id: string) => fetch(`/api/products/${id}`),
    // ... other methods
  }
}
```

### 2. Replace Mock Imports
```typescript
// Before (using mocks)
import { mockProducts } from '@/mocks'
const products = ref(mockProducts)

// After (using real API)
const products = ref([])
const fetchProducts = async () => {
  const response = await apiService.products.getAll()
  products.value = await response.json()
}
```

### 3. Remove Mock Files
```bash
# Delete mock files when no longer needed
rm -rf src/mocks/
```

### 4. Update Component Imports
```typescript
// Remove this line from all components
// import { ... } from '@/mocks'
```

## 📋 Current Mock Coverage

- ✅ **Categories** - Product categories and hierarchy
- ✅ **Products** - Product listings with images, prices, descriptions
- ✅ **Stores** - Store information and details
- ✅ **Orders** - Order data and status
- ✅ **Users** - User profiles and authentication
- ✅ **Reviews** - Product reviews and ratings
- ✅ **Cart** - Shopping cart functionality
- ✅ **Wishlist** - User wishlists
- ✅ **Buyer** - Buyer dashboard and stats
- ✅ **Seller** - Seller dashboard and analytics
- ✅ **Admin** - Admin panel data and management
- ✅ **Profile** - User profile and preferences
- ✅ **Search** - Search functionality and results

## 🎯 Benefits of Centralized Mocks

1. **Consistency** - Same data across all components
2. **Maintainability** - Update once, changes everywhere
3. **Easy Removal** - Single location to remove when switching to API
4. **Testing** - Predictable data for component testing
5. **Development** - Faster development without waiting for backend

## ⚠️ Important Notes

- **DO NOT** create local mocks in components
- **DO** import all mocks from `@/mocks`
- **DO** update this README when adding new mocks
- **DO** remove mocks completely when switching to real API
- **DO** use TypeScript interfaces for type safety

## 🚀 Next Steps

1. ✅ Centralize all existing mocks
2. ✅ Update components to use centralized mocks
3. 🔄 Implement backend API endpoints
4. 🔄 Replace mock calls with real API calls
5. 🔄 Remove mock files and imports
6. 🎉 Deploy with real data!

---

**Remember**: Mocks are temporary! They're here to help you develop faster, but the goal is to replace them with real, live data from your backend. 🎯
