import { PrismaClient } from '@prisma/client'

export async function createShoppingData(prisma: PrismaClient, profiles: any, products: any, users: any, addresses: any) {
  console.log('🛍️ Creating cart items...')
  const cartItems = await Promise.all([
    prisma.cartItem.create({
      data: {
        buyerId: profiles.buyerProfile1.id,
        productId: products[0].id, // iPhone 15 Pro Max
        quantity: 1,
      },
    }),
    prisma.cartItem.create({
      data: {
        buyerId: profiles.buyerProfile1.id,
        productId: products[2].id, // AirPods Pro
        quantity: 2,
      },
    }),
    prisma.cartItem.create({
      data: {
        buyerId: profiles.buyerProfile2.id,
        productId: products[3].id, // Designer Dress
        quantity: 1,
      },
    }),
    prisma.cartItem.create({
      data: {
        buyerId: profiles.buyerProfile3.id,
        productId: products[1].id, // MacBook Air M3
        quantity: 1,
      },
    }),
  ])

  console.log('❤️ Creating wishlist items...')
  const wishlistItems = await Promise.all([
    prisma.wishlistItem.create({
      data: {
        buyerId: profiles.buyerProfile1.id,
        productId: products[1].id, // MacBook Air M3
      },
    }),
    prisma.wishlistItem.create({
      data: {
        buyerId: profiles.buyerProfile1.id,
        productId: products[4].id, // Running Shoes
      },
    }),
    prisma.wishlistItem.create({
      data: {
        buyerId: profiles.buyerProfile2.id,
        productId: products[0].id, // iPhone 15 Pro Max
      },
    }),
    prisma.wishlistItem.create({
      data: {
        buyerId: profiles.buyerProfile3.id,
        productId: products[5].id, // Gaming Mouse
      },
    }),
  ])

  return { cartItems, wishlistItems }
}
