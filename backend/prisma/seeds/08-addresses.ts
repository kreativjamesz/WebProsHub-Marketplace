import { PrismaClient } from '@prisma/client'

export async function createAddresses(prisma: PrismaClient, users: any) {
  console.log('📍 Creating addresses...')
  const addresses = await Promise.all([
    prisma.address.create({
      data: {
        userId: users.buyerUser1.id,
        type: 'SHIPPING',
        name: 'John Doe',
        phone: '+63 917 456 7890',
        address: '123 Buyer Street, Barangay 123',
        city: 'Makati',
        state: 'Metro Manila',
        country: 'Philippines',
        postalCode: '1200',
        isDefault: true,
      },
    }),
    prisma.address.create({
      data: {
        userId: users.buyerUser1.id,
        type: 'BILLING',
        name: 'John Doe',
        phone: '+63 917 456 7890',
        address: '123 Buyer Street, Barangay 123',
        city: 'Makati',
        state: 'Metro Manila',
        country: 'Philippines',
        postalCode: '1200',
        isDefault: true,
      },
    }),
    prisma.address.create({
      data: {
        userId: users.buyerUser2.id,
        type: 'SHIPPING',
        name: 'Jane Smith',
        phone: '+63 917 567 8901',
        address: '456 Buyer Ave, Barangay 456',
        city: 'Quezon City',
        state: 'Metro Manila',
        country: 'Philippines',
        postalCode: '1100',
        isDefault: true,
      },
    }),
    prisma.address.create({
      data: {
        userId: users.buyerUser3.id,
        type: 'SHIPPING',
        name: 'Mike Johnson',
        phone: '+63 917 678 9012',
        address: '789 Customer Road, Barangay 789',
        city: 'Manila',
        state: 'Metro Manila',
        country: 'Philippines',
        postalCode: '1000',
        isDefault: true,
      },
    }),
  ])
  return addresses
}
