import { PrismaClient } from '@prisma/client'

export async function createStores(prisma: PrismaClient, profiles: any) {
  console.log('🏬 Creating stores...')
  const store1 = await prisma.store.create({
    data: {
      name: 'Tech Gadgets Store',
      description: 'Your one-stop shop for all things tech. From smartphones to laptops, we have it all.',
      address: '123 Tech Street, Makati',
      city: 'Makati',
      state: 'Metro Manila',
      country: 'Philippines',
      postalCode: '1200',
      latitude: 14.5547,
      longitude: 121.0244,
      phone: '+63 2 1234 5678',
      email: 'info@techgadgets.com',
      website: 'https://techgadgets.com',
      openingHours: {
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '18:00' },
        friday: { open: '09:00', close: '18:00' },
        saturday: { open: '10:00', close: '16:00' },
        sunday: { open: 'closed', close: 'closed' },
      },
      sellerId: profiles.sellerProfile1.id,
      isActive: true,
      isVerified: true,
    },
  })

  const store2 = await prisma.store.create({
    data: {
      name: 'Fashion Boutique',
      description: 'Trendy fashion items for men and women. Stay stylish with our latest collections.',
      address: '456 Fashion Ave, Bonifacio Global City',
      city: 'Taguig',
      state: 'Metro Manila',
      country: 'Philippines',
      postalCode: '1634',
      latitude: 14.5547,
      longitude: 121.0244,
      phone: '+63 2 2345 6789',
      email: 'info@fashionboutique.com',
      website: 'https://fashionboutique.com',
      openingHours: {
        monday: { open: '10:00', close: '20:00' },
        tuesday: { open: '10:00', close: '20:00' },
        wednesday: { open: '10:00', close: '20:00' },
        thursday: { open: '10:00', close: '20:00' },
        friday: { open: '10:00', close: '21:00' },
        saturday: { open: '10:00', close: '21:00' },
        sunday: { open: '12:00', close: '18:00' },
      },
      sellerId: profiles.sellerProfile2.id,
      isActive: true,
      isVerified: true,
    },
  })

  return { store1, store2 }
}
