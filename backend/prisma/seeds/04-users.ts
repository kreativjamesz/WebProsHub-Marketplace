import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

export async function createUsers(prisma: PrismaClient) {
  console.log('👥 Creating users...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@webproshub.com',
      name: 'Admin User',
      password: await hash('admin123', 12),
      role: 'ADMIN',
      phone: '+63 917 123 4567',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      isActive: true,
    },
  })

  const sellerUser1 = await prisma.user.create({
    data: {
      email: 'seller1@techstore.com',
      name: 'John Smith',
      password: await hash('seller123', 12),
      role: 'SELLER',
      phone: '+63 917 234 5678',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isActive: true,
    },
  })

  const sellerUser2 = await prisma.user.create({
    data: {
      email: 'seller2@fashionhub.com',
      name: 'Sarah Wilson',
      password: await hash('seller123', 12),
      role: 'SELLER',
      phone: '+63 917 345 6789',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      isActive: true,
    },
  })

  const buyerUser1 = await prisma.user.create({
    data: {
      email: 'buyer1@email.com',
      name: 'John Doe',
      password: await hash('buyer123', 12),
      role: 'BUYER',
      phone: '+63 917 456 7890',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      isActive: true,
    },
  })

  const buyerUser2 = await prisma.user.create({
    data: {
      email: 'buyer2@email.com',
      name: 'Jane Smith',
      password: await hash('buyer123', 12),
      role: 'BUYER',
      phone: '+63 917 567 8901',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      isActive: true,
    },
  })

  const buyerUser3 = await prisma.user.create({
    data: {
      email: 'buyer3@email.com',
      name: 'Mike Johnson',
      password: await hash('buyer123', 12),
      role: 'BUYER',
      phone: '+63 917 678 9012',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isActive: true,
    },
  })

  return { adminUser, sellerUser1, sellerUser2, buyerUser1, buyerUser2, buyerUser3 }
}
