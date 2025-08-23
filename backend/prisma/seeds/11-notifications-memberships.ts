import { PrismaClient } from '@prisma/client'

export async function createNotificationsAndMemberships(prisma: PrismaClient, users: any, profiles: any, categories: any, stores: any, orders: any) {
  console.log('🔔 Creating notifications...')
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        userId: users.buyerUser1.id,
        type: 'ORDER',
        title: 'Order Confirmed',
        message: 'Your order #ORD-001 has been confirmed and is being processed.',
        data: { orderId: orders[0].id, orderNumber: 'ORD-001' },
      },
    }),
    prisma.notification.create({
      data: {
        userId: users.buyerUser2.id,
        type: 'PRODUCT',
        title: 'New Product Available',
        message: 'Check out our latest fashion collection!',
        data: { categoryId: categories.categories[1].id, categoryName: 'Fashion' },
      },
    }),
    prisma.notification.create({
      data: {
        userId: users.buyerUser3.id,
        type: 'SYSTEM',
        title: 'Welcome to WebProsHub',
        message: 'Thank you for joining our marketplace!',
        data: { welcome: true },
      },
    }),
  ])

  console.log('👥 Creating store memberships...')
  const storeMembers = await Promise.all([
    prisma.storeMember.create({
      data: {
        storeId: stores.store1.id,
        userId: users.sellerUser1.id,
        sellerId: profiles.sellerProfile1.id,
        role: 'OWNER',
        isActive: true,
      },
    }),
    prisma.storeMember.create({
      data: {
        storeId: stores.store2.id,
        userId: users.sellerUser2.id,
        sellerId: profiles.sellerProfile2.id,
        role: 'OWNER',
        isActive: true,
      },
    }),
  ])

  return { notifications, storeMembers }
}
