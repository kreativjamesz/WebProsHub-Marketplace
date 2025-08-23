import { PrismaClient } from '@prisma/client'

export async function clearData(prisma: PrismaClient) {
  console.log('🧹 Clearing existing data...')
  
  // Delete in order to respect foreign key constraints
  // Start with child records (those with foreign keys)
  await prisma.notification.deleteMany()
  await prisma.review.deleteMany()
  await prisma.wishlistItem.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.buyerProfile.deleteMany()
  await prisma.product.deleteMany()
  
  // Delete categories in reverse hierarchy order
  await prisma.subcategory.deleteMany()    // Level 3 - delete first
  await prisma.category.deleteMany()       // Level 2 - delete second  
  await prisma.mainCategory.deleteMany()   // Level 1 - delete last
  
  await prisma.store.deleteMany()
  await prisma.sellerProfile.deleteMany()
  await prisma.adminProfile.deleteMany()
  await prisma.staffProfile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.storeTheme.deleteMany()
}
