import { PrismaClient } from '@prisma/client'

export async function createOrdersAndReviews(prisma: PrismaClient, users: any, profiles: any, products: any, addresses: any) {
  console.log('📋 Creating orders...')
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        buyerId: users.buyerUser1.id,
        sellerId: profiles.sellerProfile1.id,
        status: 'CONFIRMED',
        total: 114997.0,
        subtotal: 114997.0,
        tax: 13799.64,
        shipping: 0.0,
        discount: 0.0,
        notes: 'Please deliver during business hours',
        shippingAddressId: addresses[0].id,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users.buyerUser2.id,
        sellerId: profiles.sellerProfile2.id,
        status: 'PROCESSING',
        total: 18000.0,
        subtotal: 18000.0,
        tax: 2160.0,
        shipping: 0.0,
        discount: 0.0,
        notes: 'Gift wrapping please',
        shippingAddressId: addresses[2].id,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users.buyerUser1.id,
        sellerId: profiles.sellerProfile1.id,
        status: 'DELIVERED',
        total: 49998.0,
        subtotal: 49998.0,
        tax: 5999.76,
        shipping: 0.0,
        discount: 0.0,
        notes: 'Delivered successfully',
        shippingAddressId: addresses[0].id,
      },
    }),
  ])

  console.log('📦 Creating order items...')
  const orderItems = await Promise.all([
    prisma.orderItem.create({
      data: {
        orderId: orders[0].id,
        productId: products[0].id, // iPhone 15 Pro Max
        quantity: 1,
        price: 89999.0,
        total: 89999.0,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[0].id,
        productId: products[2].id, // AirPods Pro
        quantity: 1,
        price: 24999.0,
        total: 24999.0,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[1].id,
        productId: products[3].id, // Designer Dress
        quantity: 1,
        price: 18000.0,
        total: 18000.0,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[2].id,
        productId: products[2].id, // AirPods Pro
        quantity: 2,
        price: 24999.0,
        total: 49998.0,
      },
    }),
  ])

  console.log('⭐ Creating reviews...')
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        buyerId: users.buyerUser1.id,
        productId: products[0].id, // iPhone 15 Pro Max
        rating: 5,
        comment: 'Amazing phone! The camera quality is outstanding and battery life is incredible.',
        images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200'],
        isVerified: true,
      },
    }),
    prisma.review.create({
      data: {
        buyerId: users.buyerUser1.id,
        productId: products[2].id, // AirPods Pro
        rating: 4,
        comment: 'Great sound quality and noise cancellation. Battery life could be better.',
        images: [],
        isVerified: true,
      },
    }),
    prisma.review.create({
      data: {
        buyerId: users.buyerUser2.id,
        productId: products[3].id, // Designer Dress
        rating: 5,
        comment: 'Perfect fit and beautiful design. Highly recommended for special occasions!',
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200'],
        isVerified: true,
      },
    }),
  ])

  return { orders, orderItems, reviews }
}
