import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all stores
router.get('/stores', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, city, category, search } = req.query

    const where: any = { isActive: true }
    if (city) where.city = { contains: city as string }
    if (category)
      where.seller = { categories: { some: { name: { contains: category as string } } } }
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { description: { contains: search as string } },
        { seller: { businessName: { contains: search as string } } },
      ]
    }

    const stores = await prisma.store.findMany({
      where,
      include: {
        seller: { select: { businessName: true, businessType: true, logo: true } },
        products: { where: { isActive: true }, take: 5 },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.store.count({ where })

    res.json({
      stores,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error('Get stores error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get store by ID
router.get('/stores/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const store = await prisma.store.findUnique({
      where: { id, isActive: true },
      include: {
        seller: {
          select: {
            businessName: true,
            businessType: true,
            logo: true,
            banner: true,
            description: true,
          },
        },
        products: { where: { isActive: true }, include: { category: true } },
      },
    })

    if (!store) {
      return res.status(404).json({ error: 'Store not found' })
    }

    res.json({ store })
  } catch (error) {
    console.error('Get store error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      seller,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query

    const where: any = { isActive: true }
    if (category) where.category = { name: { contains: category as string } }
    if (seller) where.seller = { businessName: { contains: seller as string } }
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { description: { contains: search as string } },
      ]
    }
    if (minPrice) where.price = { gte: parseFloat(minPrice as string) }
    if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice as string) }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        seller: { select: { businessName: true, logo: true } },
        store: { select: { name: true, city: true } },
        reviews: { select: { rating: true } },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { [sortBy as string]: sortOrder },
    })

    const total = await prisma.product.count({ where })

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id, isActive: true },
      include: {
        category: true,
        seller: { select: { businessName: true, logo: true, description: true } },
        store: { select: { name: true, address: true, city: true, phone: true } },
        reviews: {
          include: {
            buyer: { select: { name: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true, parentId: null },
      include: {
        children: { where: { isActive: true } },
        _count: { select: { products: true } },
      },
    })

    res.json({ categories })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Search functionality
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, type = 'all', page = 1, limit = 20 } = req.query

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' })
    }

    const searchQuery = q as string
    let results: any = {}

    if (type === 'all' || type === 'products') {
      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [{ name: { contains: searchQuery } }, { description: { contains: searchQuery } }],
        },
        include: {
          category: true,
          seller: { select: { businessName: true, logo: true } },
        },
        take: Number(limit),
      })
      results.products = products
    }

    if (type === 'all' || type === 'stores') {
      const stores = await prisma.store.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: searchQuery } },
            { description: { contains: searchQuery } },
            { seller: { businessName: { contains: searchQuery } } },
          ],
        },
        include: {
          seller: { select: { businessName: true, logo: true } },
        },
        take: Number(limit),
      })
      results.stores = stores
    }

    res.json({ results, query: searchQuery })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
