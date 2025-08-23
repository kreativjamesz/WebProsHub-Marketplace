import { PrismaClient } from '@prisma/client'

export async function createProducts(prisma: PrismaClient, categories: any, stores: any, profiles: any) {
  console.log('📦 Creating products...')
  
  const { mainCategories, categories: categoryList, subcategories } = categories
  
  const products = await Promise.all([
    // ============================================================================
    // ELECTRONICS PRODUCTS
    // ============================================================================
    
    // iPhone 15 Pro Max - Smartphones & Mobile
    prisma.product.create({
      data: {
        name: 'iPhone 15 Pro Max',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip. Features titanium design, 48MP camera, and USB-C connectivity.',
        price: 89999.0,
        comparePrice: 99999.0,
        cost: 75000.0,
        sku: 'IPH15PM-256',
        barcode: '1234567890123',
        weight: 221.0,
        dimensions: { length: 159.9, width: 76.7, height: 12.0 },
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        ],
        stock: 25,
        minStock: 5,
        maxStock: 100,
        mainCategoryId: mainCategories[0].id,
        categoryId: categoryList[0].id,
        subcategoryId: subcategories[0].id,
        storeId: stores.store1.id,
        sellerId: profiles.sellerProfile1.id,
        isActive: true,
        isFeatured: true,
      },
    }),

    // MacBook Air M3 - Computers & Laptops
    prisma.product.create({
      data: {
        name: 'MacBook Air M3',
        description: 'Ultra-thin laptop with M3 chip for incredible performance. Perfect for work and creative tasks.',
        price: 129999.0,
        comparePrice: 149999.0,
        cost: 110000.0,
        sku: 'MBA-M3-512',
        barcode: '1234567890124',
        weight: 1240.0,
        dimensions: { length: 30.41, width: 21.5, height: 1.13 },
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        ],
        stock: 15,
        minStock: 3,
        maxStock: 50,
        mainCategoryId: mainCategories[0].id,
        categoryId: categoryList[1].id,
        subcategoryId: subcategories[3].id,
        storeId: stores.store1.id,
        sellerId: profiles.sellerProfile1.id,
        isActive: true,
        isFeatured: true,
      },
    }),

    // AirPods Pro 2nd Gen - Audio & Music
    prisma.product.create({
      data: {
        name: 'AirPods Pro 2nd Gen',
        description: 'Active noise cancellation with spatial audio. Perfect for music lovers and professionals.',
        price: 24999.0,
        comparePrice: 29999.0,
        cost: 20000.0,
        sku: 'APP2-USB-C',
        barcode: '1234567890125',
        weight: 5.3,
        dimensions: { length: 1.21, width: 0.86, height: 0.94 },
        images: [
          'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
        ],
        stock: 50,
        minStock: 10,
        maxStock: 200,
        mainCategoryId: mainCategories[0].id,
        categoryId: categoryList[2].id,
        subcategoryId: subcategories[6].id,
        storeId: stores.store1.id,
        sellerId: profiles.sellerProfile1.id,
        isActive: true,
        isFeatured: false,
      },
    }),

    // Wireless Gaming Mouse - Computers & Laptops
    prisma.product.create({
      data: {
        name: 'Wireless Gaming Mouse',
        description: 'High-precision gaming mouse with RGB lighting and customizable buttons.',
        price: 3500.0,
        comparePrice: 4500.0,
        cost: 2500.0,
        sku: 'WGM-LOGI-001',
        barcode: '1234567890128',
        weight: 95.0,
        dimensions: { length: 12.5, width: 6.4, height: 3.9 },
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'],
        stock: 40,
        minStock: 8,
        maxStock: 150,
        mainCategoryId: mainCategories[0].id,
        categoryId: categoryList[1].id,
        subcategoryId: subcategories[5].id,
        storeId: stores.store1.id,
        sellerId: profiles.sellerProfile1.id,
        isActive: true,
        isFeatured: false,
      },
    }),

    // ============================================================================
    // FASHION PRODUCTS
    // ============================================================================
    
    // Designer Evening Dress - Women's Clothing
    prisma.product.create({
      data: {
        name: 'Designer Evening Dress',
        description: 'Elegant designer dress for special occasions. Made with premium fabric and perfect fit.',
        price: 18000.0,
        comparePrice: 25000.0,
        cost: 12000.0,
        sku: 'DED-BLK-M',
        barcode: '1234567890126',
        weight: 500.0,
        dimensions: { length: 120, width: 40, height: 2 },
        images: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
        ],
        stock: 8,
        minStock: 2,
        maxStock: 20,
        mainCategoryId: mainCategories[1].id,
        categoryId: categoryList[7].id,
        subcategoryId: subcategories[17].id,
        storeId: stores.store2.id,
        sellerId: profiles.sellerProfile2.id,
        isActive: true,
        isFeatured: true,
      },
    }),

    // Premium Running Shoes - Footwear
    prisma.product.create({
      data: {
        name: 'Premium Running Shoes',
        description: 'Comfortable running shoes for athletes. Lightweight and durable for long-distance running.',
        price: 8500.0,
        comparePrice: 12000.0,
        cost: 6000.0,
        sku: 'PRS-NIKE-42',
        barcode: '1234567890127',
        weight: 300.0,
        dimensions: { length: 28, width: 10, height: 12 },
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        ],
        stock: 30,
        minStock: 5,
        maxStock: 100,
        mainCategoryId: mainCategories[1].id,
        categoryId: categoryList[9].id,
        subcategoryId: subcategories[19].id,
        storeId: stores.store2.id,
        sellerId: profiles.sellerProfile2.id,
        isActive: true,
        isFeatured: false,
      },
    }),

    // ============================================================================
    // HOME & GARDEN PRODUCTS
    // ============================================================================
    
    // Modern Coffee Table - Furniture
    prisma.product.create({
      data: {
        name: 'Modern Coffee Table',
        description: 'Elegant coffee table with clean lines and premium wood finish. Perfect for living room.',
        price: 15000.0,
        comparePrice: 20000.0,
        cost: 10000.0,
        sku: 'MCT-WAL-120',
        barcode: '1234567890129',
        weight: 25000.0,
        dimensions: { length: 120, width: 60, height: 45 },
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        ],
        stock: 5,
        minStock: 1,
        maxStock: 15,
        mainCategoryId: mainCategories[2].id,
        categoryId: categoryList[11].id,
        subcategoryId: subcategories[21].id,
        storeId: stores.store1.id,
        sellerId: profiles.sellerProfile1.id,
        isActive: true,
        isFeatured: true,
      },
    }),

    // ============================================================================
    // SPORTS PRODUCTS
    // ============================================================================
    
    // Professional Basketball - Team Sports
    prisma.product.create({
      data: {
        name: 'Professional Basketball',
        description: 'Official size basketball for professional games. High-quality leather with perfect grip.',
        price: 2500.0,
        comparePrice: 3500.0,
        cost: 1800.0,
        sku: 'PB-NBA-7',
        barcode: '1234567890130',
        weight: 600.0,
        dimensions: { length: 24, width: 24, height: 24 },
        images: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        ],
        stock: 20,
        minStock: 3,
        maxStock: 50,
        mainCategoryId: mainCategories[3].id,
        categoryId: categoryList[16].id,
        subcategoryId: subcategories[23].id,
        storeId: stores.store2.id,
        sellerId: profiles.sellerProfile2.id,
        isActive: true,
        isFeatured: false,
      },
    }),

    // ============================================================================
    // BOOKS PRODUCTS
    // ============================================================================
    
    // Best-Selling Novel - Fiction
    prisma.product.create({
      data: {
        name: 'The Great Adventure',
        description: 'Bestselling fiction novel about adventure and discovery. Perfect for book lovers.',
        price: 800.0,
        comparePrice: 1200.0,
        cost: 500.0,
        sku: 'BGA-FIC-001',
        barcode: '1234567890131',
        weight: 400.0,
        dimensions: { length: 20, width: 13, height: 3 },
        images: [
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        ],
        stock: 100,
        minStock: 10,
        maxStock: 500,
        mainCategoryId: mainCategories[4].id,
        categoryId: categoryList[21].id,
        subcategoryId: subcategories[25].id,
        storeId: stores.store1.id,
        sellerId: profiles.sellerProfile1.id,
        isActive: true,
        isFeatured: true,
      },
    }),
  ])

  console.log(`✅ Created ${products.length} products across all main categories`)
  return products
}
