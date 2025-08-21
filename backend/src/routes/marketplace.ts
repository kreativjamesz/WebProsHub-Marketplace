import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/marketplace/stores:
 *   get:
 *     summary: Get all stores
 *     description: Retrieve a paginated list of active stores with optional filtering
 *     tags: [Marketplace]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter stores by city
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter stores by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search stores by name, description, or business name
 *     responses:
 *       200:
 *         description: Stores retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       seller:
 *                         type: object
 *                         properties:
 *                           businessName:
 *                             type: string
 *                           businessType:
 *                             type: string
 *                           logo:
 *                             type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/marketplace/stores/{id}:
 *   get:
 *     summary: Get store by ID
 *     description: Retrieve detailed information about a specific store
 *     tags: [Marketplace]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 store:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     seller:
 *                       type: object
 *                       properties:
 *                         businessName:
 *                           type: string
 *                         businessType:
 *                           type: string
 *                         logo:
 *                           type: string
 *                         banner:
 *                           type: string
 *                         description:
 *                           type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/marketplace/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a paginated list of active products with optional filtering and sorting
 *     tags: [Marketplace]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: seller
 *         schema:
 *           type: string
 *         description: Filter products by seller
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name or description
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, price, name]
 *           default: createdAt
 *         description: Sort field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */
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
