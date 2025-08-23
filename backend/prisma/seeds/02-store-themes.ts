import { PrismaClient } from '@prisma/client'

export async function createStoreThemes(prisma: PrismaClient) {
  console.log('🎨 Creating store themes...')
  const themes = await Promise.all([
    prisma.storeTheme.create({
      data: {
        name: 'Modern Tech',
        description: 'Clean and modern theme for tech stores',
        css: `
          :root {
            --primary-color: #2563eb;
            --secondary-color: #1e40af;
            --accent-color: #3b82f6;
          }
        `,
        isActive: true,
      },
    }),
    prisma.storeTheme.create({
      data: {
        name: 'Elegant Fashion',
        description: 'Sophisticated theme for fashion stores',
        css: `
          :root {
            --primary-color: #dc2626;
            --secondary-color: #b91c1c;
            --accent-color: #ef4444;
          }
        `,
        isActive: true,
      },
    }),
  ])
  return themes
}
