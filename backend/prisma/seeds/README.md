# Database Seeds Organization

This directory contains organized, modular seed functions for the WebProsHub marketplace database.

## Structure

The seeds are organized into logical chunks that maintain proper relationships:

### 📁 Seed Files

1. **`01-clear-data.ts`** - Clears all existing data
2. **`02-store-themes.ts`** - Creates store themes
3. **`03-categories.ts`** - Creates product categories
4. **`04-users.ts`** - Creates users (admin, sellers, buyers)
5. **`05-profiles.ts`** - Creates user profiles (admin, seller, buyer)
6. **`06-stores.ts`** - Creates physical stores
7. **`07-products.ts`** - Creates products with proper relationships
8. **`08-addresses.ts`** - Creates shipping/billing addresses
9. **`09-shopping-data.ts`** - Creates cart items and wishlist
10. **`10-orders-reviews.ts`** - Creates orders, order items, and reviews
11. **`11-notifications-memberships.ts`** - Creates notifications and store memberships

### 🔗 Dependencies & Relationships

The seeds must be executed in order to maintain proper relationships:

```
Clear Data → Themes → Categories → Users → Profiles → Stores → Products → Addresses → Shopping → Orders → Notifications
```

## Usage

### Running All Seeds
```bash
npx prisma db seed
```

### Running Individual Seed Functions
You can import and run individual seed functions:

```typescript
import { createUsers } from './seeds/04-users'
import { createCategories } from './seeds/03-categories'

// Run specific seeds
await createUsers(prisma)
await createCategories(prisma)
```

### Adding New Seeds

1. Create a new file following the naming convention: `XX-description.ts`
2. Export your seed function
3. Add it to `index.ts`
4. Update the main `seed.ts` file to call it in the correct order

## Benefits

✅ **Modular** - Each seed function is focused on one aspect
✅ **Maintainable** - Easy to modify individual parts
✅ **Testable** - Can test individual seed functions
✅ **Reusable** - Can run specific seeds without running everything
✅ **Organized** - Clear structure and dependencies
✅ **Scalable** - Easy to add new seed data

## Example: Adding New Categories

```typescript
// In 03-categories.ts
export async function createCategories(prisma: PrismaClient) {
  // ... existing categories ...
  
  // Add new category
  const newCategory = await prisma.category.create({
    data: {
      name: 'New Category',
      description: 'Description here',
      image: 'image-url',
      isActive: true,
    },
  })
  
  return [...categories, newCategory]
}
```

## Notes

- All seed functions receive `prisma: PrismaClient` as the first parameter
- Return created data for use in subsequent seeds
- Maintain proper error handling and logging
- Follow the existing naming conventions
