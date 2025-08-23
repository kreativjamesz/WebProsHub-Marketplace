import { PrismaClient } from '@prisma/client'

export async function createProfiles(prisma: PrismaClient, users: any, themes: any) {
  console.log('👑 Creating admin profile...')
  const adminProfile = await prisma.adminProfile.create({
    data: {
      userId: users.adminUser.id,
      permissions: {
        canManageUsers: true,
        canManageSellers: true,
        canManageStores: true,
        canViewAnalytics: true,
        canManageSystem: true,
      },
    },
  })

  console.log('🏪 Creating seller profiles...')
  const sellerProfile1 = await prisma.sellerProfile.create({
    data: {
      userId: users.sellerUser1.id,
      businessName: 'TechStore Pro',
      businessType: 'Retail',
      description: 'Premium electronics and gadgets store',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200',
      banner: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      themeId: themes[0].id,
      isVerified: true,
      isActive: true,
      isApproved: true,
      approvalDate: new Date(),
      approvedBy: users.adminUser.id,
    },
  })

  const sellerProfile2 = await prisma.sellerProfile.create({
    data: {
      userId: users.sellerUser2.id,
      businessName: 'FashionHub Elite',
      businessType: 'Retail',
      description: 'Trendy fashion and accessories store',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200',
      banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      themeId: themes[1].id,
      isVerified: true,
      isActive: true,
      isApproved: true,
      approvalDate: new Date(),
      approvedBy: users.adminUser.id,
    },
  })

  console.log('🛒 Creating buyer profiles...')
  const buyerProfile1 = await prisma.buyerProfile.create({
    data: {
      userId: users.buyerUser1.id,
      birthDate: new Date('1990-05-15'),
      preferences: {
        favoriteCategories: ['Electronics', 'Gaming'],
        preferredPriceRange: { min: 1000, max: 50000 },
        notificationPreferences: { email: true, push: true },
      },
    },
  })

  const buyerProfile2 = await prisma.buyerProfile.create({
    data: {
      userId: users.buyerUser2.id,
      birthDate: new Date('1988-12-03'),
      preferences: {
        favoriteCategories: ['Fashion', 'Home & Garden'],
        preferredPriceRange: { min: 500, max: 25000 },
        notificationPreferences: { email: true, push: false },
      },
    },
  })

  const buyerProfile3 = await prisma.buyerProfile.create({
    data: {
      userId: users.buyerUser3.id,
      birthDate: new Date('1995-08-22'),
      preferences: {
        favoriteCategories: ['Sports', 'Books'],
        preferredPriceRange: { min: 200, max: 15000 },
        notificationPreferences: { email: false, push: true },
      },
    },
  })

  return {
    adminProfile,
    sellerProfile1,
    sellerProfile2,
    buyerProfile1,
    buyerProfile2,
    buyerProfile3,
  }
}
