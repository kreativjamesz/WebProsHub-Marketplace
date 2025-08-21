# Router Structure

This directory contains the organized router configuration for the WebProsHubMarketplace application, following Angular-style route organization.

## File Structure

```
router/
├── index.ts              # Main router configuration and navigation guards
├── routes.index.ts       # Central export file for all route modules
├── auth.routes.ts        # Authentication routes (login, register)
├── marketplace.routes.ts # Marketplace routes (stores, products, categories)
├── buyer.routes.ts       # Buyer-specific routes (dashboard, cart, orders)
├── seller.routes.ts      # Seller-specific routes (dashboard, products, orders)
├── admin.routes.ts       # Admin routes (user management, analytics)
├── general.routes.ts     # General routes (home, about, profile, settings)
└── README.md            # This documentation file
```

## Route Organization

### `auth.routes.ts`
- `/login` - User login page
- `/register` - User registration page

### `marketplace.routes.ts`
- `/marketplace` - Main marketplace view
- `/stores` - All stores listing
- `/stores/:id` - Individual store details
- `/categories` - Product categories
- `/products/:id` - Product details
- `/search` - Search results

### `buyer.routes.ts`
- `/buyer/dashboard` - Buyer dashboard
- `/buyer/cart` - Shopping cart
- `/buyer/wishlist` - Wishlist
- `/buyer/orders` - Order history
- `/buyer/profile` - Buyer profile

### `seller.routes.ts`
- `/seller/dashboard` - Seller dashboard
- `/seller/profile` - Seller profile
- `/seller/stores` - Store management
- `/seller/products` - Product management
- `/seller/orders` - Order management

### `admin.routes.ts`
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/sellers` - Seller management
- `/admin/products` - Product management
- `/admin/orders` - Order management

### `general.routes.ts`
- `/` - Home page
- `/about` - About page
- `/profile` - General profile page
- `/settings` - User settings
- `/contact` - Contact page
- `/help` - Help & support
- `/:pathMatch(.*)*` - 404 not found

## Benefits of This Structure

1. **Separation of Concerns**: Each route file handles a specific domain
2. **Maintainability**: Easier to find and modify specific route groups
3. **Scalability**: New route groups can be added without cluttering the main file
4. **Team Collaboration**: Different developers can work on different route files
5. **Testing**: Individual route files can be tested in isolation
6. **Code Splitting**: Better organization for lazy loading strategies

## Adding New Routes

To add new routes:

1. Create a new route file (e.g., `feature.routes.ts`)
2. Export the routes array from the file
3. Add the export to `routes.index.ts`
4. Import and spread the routes in `index.ts`

## Navigation Guards

Navigation guards are defined in the main `index.ts` file and apply to all routes:
- Authentication checks
- Role-based access control
- Page title management
- Guest route handling
