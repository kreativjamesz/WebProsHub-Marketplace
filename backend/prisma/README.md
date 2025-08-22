# Database Seeder Documentation

## Overview
This seeder creates comprehensive sample data for the WebProsHub Marketplace application, including complete BUYER profiles and all connected data relationships.

## 🚀 Running the Seeder

### Prerequisites
- Node.js and npm installed
- Database connection configured
- Prisma client generated

### Commands
```bash
# Run the seeder
npm run seed

# Reset database and run seeder
npm run db:reset

# Generate Prisma client
npm run db:generate
```

## 📊 Seeded Data Structure

### 1. Store Themes (2)
- **Modern Tech**: Clean theme for tech stores
- **Elegant Fashion**: Sophisticated theme for fashion stores

### 2. Categories (5)
- Electronics
- Fashion  
- Home & Garden
- Sports
- Books

### 3. Users (6 total)
- **1 Admin**: admin@webproshub.com
- **2 Sellers**: seller1@techstore.com, seller2@fashionhub.com
- **3 Buyers**: buyer1@email.com, buyer2@email.com, buyer3@email.com

### 4. Seller Profiles (2)
- **TechStore Pro**: Electronics retail business
- **FashionHub Elite**: Fashion retail business

### 5. Stores (2)
- **Tech Gadgets Store**: Located in Makati, Metro Manila
- **Fashion Boutique**: Located in Taguig, Metro Manila

### 6. Products (6)
- iPhone 15 Pro Max (₱89,999)
- MacBook Air M3 (₱129,999)
- AirPods Pro 2nd Gen (₱24,999)
- Designer Evening Dress (₱18,000)
- Premium Running Shoes (₱8,500)
- Wireless Gaming Mouse (₱3,500)

### 7. Buyer Profiles (3)
Each buyer has:
- Personal information (birth date, preferences)
- Shopping preferences (favorite categories, price range)
- Notification preferences

### 8. Addresses (4)
- Shipping and billing addresses for buyers
- Philippine locations (Makati, Quezon City, Manila)

### 9. Cart Items (4)
- Buyer 1: iPhone 15 Pro Max (1x), AirPods Pro (2x)
- Buyer 2: Designer Dress (1x)
- Buyer 3: MacBook Air M3 (1x)

### 10. Wishlist Items (4)
- Buyer 1: MacBook Air M3, Running Shoes
- Buyer 2: iPhone 15 Pro Max
- Buyer 3: Gaming Mouse

### 11. Orders (3)
- **Order 1**: iPhone 15 Pro Max + AirPods Pro (₱114,997) - CONFIRMED
- **Order 2**: Designer Dress (₱18,000) - PROCESSING
- **Order 3**: AirPods Pro x2 (₱49,998) - DELIVERED

### 12. Order Items (4)
Detailed breakdown of each order with quantities and prices

### 13. Reviews (3)
- iPhone 15 Pro Max: 5⭐ "Amazing phone!"
- AirPods Pro: 4⭐ "Great sound quality"
- Designer Dress: 5⭐ "Perfect fit!"

### 14. Notifications (3)
- Order confirmations
- Product announcements
- Welcome messages

### 15. Store Memberships (2)
- Store owners with full access rights

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@webproshub.com | admin123 |
| Seller 1 | seller1@techstore.com | seller123 |
| Seller 2 | seller2@fashionhub.com | seller123 |
| Buyer 1 | buyer1@email.com | buyer123 |
| Buyer 2 | buyer2@email.com | buyer123 |
| Buyer 3 | buyer3@email.com | buyer123 |

## 🛒 Sample Buyer Scenarios

### Buyer 1 (John Doe)
- **Profile**: Electronics and Sports enthusiast
- **Cart**: iPhone 15 Pro Max + AirPods Pro x2
- **Wishlist**: MacBook Air M3, Running Shoes
- **Orders**: 2 orders (₱114,997 + ₱49,998)
- **Reviews**: 2 product reviews
- **Location**: Makati, Metro Manila

### Buyer 2 (Jane Smith)
- **Profile**: Fashion and Home & Garden lover
- **Cart**: Designer Evening Dress
- **Wishlist**: iPhone 15 Pro Max
- **Orders**: 1 order (₱18,000)
- **Reviews**: 1 product review
- **Location**: Quezon City, Metro Manila

### Buyer 3 (Mike Johnson)
- **Profile**: Electronics and Books reader
- **Cart**: MacBook Air M3
- **Wishlist**: Wireless Gaming Mouse
- **Orders**: None yet
- **Reviews**: None yet
- **Location**: Manila, Metro Manila

## 🏪 Store Information

### TechStore Pro (Electronics)
- **Location**: Makati, Metro Manila
- **Products**: iPhone, MacBook, AirPods, Gaming Mouse
- **Theme**: Modern Tech
- **Hours**: Mon-Fri 9AM-6PM, Sat 10AM-4PM

### FashionHub Elite (Fashion)
- **Location**: Taguig, Metro Manila  
- **Products**: Designer Dress, Running Shoes
- **Theme**: Elegant Fashion
- **Hours**: Mon-Thu 10AM-8PM, Fri-Sat 10AM-9PM, Sun 12PM-6PM

## 🔄 Data Relationships

```
User → BuyerProfile → CartItems/WishlistItems
User → Addresses → Orders
User → Reviews
User → Notifications

Store → Products → CartItems/WishlistItems/OrderItems
Store → Categories
Store → StoreMembers

SellerProfile → Store → Products
SellerProfile → Orders
```

## 📝 Notes

- All prices are in Philippine Peso (₱)
- Images use Unsplash URLs for demo purposes
- Addresses are Philippine locations
- Phone numbers use Philippine format (+63)
- Birth dates are realistic for demo purposes
- All relationships follow Prisma schema constraints

## 🚨 Important

- The seeder clears existing data before creating new data
- Comment out the clear data section if you want to preserve existing data
- Ensure your database is properly configured before running
- The seeder handles all foreign key relationships automatically
