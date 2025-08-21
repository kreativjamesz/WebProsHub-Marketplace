# Mock Data Structure

This directory contains centralized mock data for development and testing purposes. All mock data follows the TypeScript interfaces defined in `@/types/marketplace.ts`.

## Structure

- `index.ts` - Central export file for all mock data
- `categories.ts` - Product categories
- `products.ts` - Product listings with proper category references
- `stores.ts` - Store information
- `orders.ts` - Order data with product references
- `users.ts` - User profiles
- `reviews.ts` - Product reviews
- `cart.ts` - Shopping cart items
- `wishlist.ts` - Wishlist items and recommendations

## Usage

```typescript
import { mockProducts, mockCategories, mockOrders } from '@/mocks'

// Use in components
const products = ref(mockProducts)
const categories = ref(mockCategories)
```

## Benefits

1. **Centralized**: All mock data in one place
2. **Type-safe**: Follows TypeScript interfaces
3. **Consistent**: Same data across all components
4. **Maintainable**: Easy to update and modify
5. **Production-ready**: Easy to replace with API calls

## Migration to Production

When ready to connect to real APIs:

1. Replace mock imports with API service calls
2. Update component logic to handle async data loading
3. Add error handling and loading states
4. Remove mock data files

## Data Relationships

- Products reference categories
- Orders reference products and shipping addresses
- Cart items reference products
- Wishlist items reference products
- Reviews reference products and users

All relationships are maintained through proper ID references and object composition.
