import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../prisma/client'
import { authenticateToken, requireSeller } from '../middleware/auth'

const router = Router()

// Validation middleware
const validateSellerProfile = [
  body('businessName').trim().isLength({ min: 2, max: 100 }),
  body('businessType').trim().isLength({ min: 2, max: 50 }),
  body('description').optional().trim().isLength({ max: 500 })
]

const validateStore = [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('address').trim().isLength({ min: 5, max: 200 }),
  body('city').trim().isLength({ min: 2, max: 50 }),
  body('state').trim().isLength({ min: 2, max: 50 }),
  body('country').trim().isLength({ min: 2, max: 50 }),
  body('postalCode').trim().isLength({ min: 3, max: 10 }),
  body('latitude').isFloat({ min: -90, max: 90 }),
  body('longitude').isFloat({ min: -180, max: 180 })
]

/**
 * @swagger
 * /api/sellers/profile:
 *   get:
 *     summary: Get seller profile
 *     description: Retrieve the authenticated seller's profile information
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Seller profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seller:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     businessName:
 *                       type: string
 *                     businessType:
 *                       type: string
 *                     description:
 *                       type: string
 *                     logo:
 *                       type: string
 *                     banner:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a seller
 *       404:
 *         description: Seller profile not found
 *       500:
 *         description: Internal server error
 */
// Get seller profile
router.get('/profile', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: req.user!.userId },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true, avatar: true }
        },
        theme: true,
        stores: true
      }
    })

    if (!sellerProfile) {
      return res.status(404).json({ error: 'Seller profile not found' })
    }

    res.json({ seller: sellerProfile })
  } catch (error) {
    console.error('Get seller profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/sellers/profile:
 *   put:
 *     summary: Update seller profile
 *     description: Update the authenticated seller's profile information
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - businessType
 *             properties:
 *               businessName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Business name
 *                 example: "Tech Solutions Inc"
 *               businessType:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: Type of business
 *                 example: "Technology"
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: Business description
 *                 example: "Leading technology solutions provider"
 *               logo:
 *                 type: string
 *                 description: Logo URL
 *                 example: "https://example.com/logo.png"
 *               banner:
 *                 type: string
 *                 description: Banner URL
 *                 example: "https://example.com/banner.png"
 *               themeId:
 *                 type: string
 *                 description: Store theme ID
 *                 example: "clx1234567890abcdef"
 *     responses:
 *       200:
 *         description: Seller profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seller:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     businessName:
 *                       type: string
 *                     businessType:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a seller
 *       500:
 *         description: Internal server error
 */
// Update seller profile
router.put('/profile', authenticateToken, requireSeller, validateSellerProfile, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { businessName, businessType, description, logo, banner, themeId } = req.body

    const updatedProfile = await prisma.sellerProfile.update({
      where: { userId: req.user!.userId },
      data: { businessName, businessType, description, logo, banner, themeId },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true, avatar: true }
        },
        theme: true
      }
    })

    res.json({ seller: updatedProfile })
  } catch (error) {
    console.error('Update seller profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/sellers/stores:
 *   post:
 *     summary: Create store
 *     description: Create a new store for the authenticated seller
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - city
 *               - state
 *               - country
 *               - postalCode
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Store name
 *                 example: "Main Store"
 *               address:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 200
 *                 description: Store address
 *                 example: "123 Main Street"
 *               city:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: City
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: State/Province
 *                 example: "NY"
 *               country:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: Country
 *                 example: "USA"
 *               postalCode:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 10
 *                 description: Postal code
 *                 example: "10001"
 *               latitude:
 *                 type: number
 *                 minimum: -90
 *                 maximum: 90
 *                 description: Latitude coordinate
 *                 example: 40.7128
 *               longitude:
 *                 type: number
 *                 minimum: -180
 *                 maximum: 180
 *                 description: Longitude coordinate
 *                 example: -74.0060
 *     responses:
 *       201:
 *         description: Store created successfully
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
 *                     address:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     country:
 *                       type: string
 *                     postalCode:
 *                       type: string
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a seller
 *       500:
 *         description: Internal server error
 */
// Create store
router.post('/stores', authenticateToken, requireSeller, validateStore, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const storeData = req.body
    storeData.sellerId = req.user!.userId

    const store = await prisma.store.create({
      data: storeData,
      include: { seller: true }
    })

    res.status(201).json({ store })
  } catch (error) {
    console.error('Create store error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get seller stores
router.get('/stores', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const stores = await prisma.store.findMany({
      where: { sellerId: req.user!.userId },
      include: { products: true }
    })

    res.json({ stores })
  } catch (error) {
    console.error('Get stores error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get seller products
router.get('/products', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, categoryId, isActive } = req.query
    
    const where: any = { sellerId: req.user!.userId }
    if (categoryId) where.categoryId = categoryId
    if (isActive !== undefined) where.isActive = isActive === 'true'

    const products = await prisma.product.findMany({
      where,
      include: { category: true, store: true },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.product.count({ where })

    res.json({ 
      products, 
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get seller orders
router.get('/orders', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    
    const where: any = { sellerId: req.user!.userId }
    if (status) where.status = status

    const orders = await prisma.order.findMany({
      where,
      include: { 
        buyer: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.order.count({ where })

    res.json({ 
      orders, 
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ============================================================================
// DASHBOARD ENDPOINTS
// ============================================================================

// Get seller dashboard data
router.get('/dashboard', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!.userId
    
    // Get all dashboard data in parallel
    const [stats, recentOrders, lowStockProducts] = await Promise.all([
      getSellerStats(sellerId),
      getRecentOrders(sellerId, 5),
      getLowStockProducts(sellerId, 5)
    ])

    res.json({
      stats,
      recentOrders,
      lowStockProducts
    })
  } catch (error) {
    console.error('Get dashboard data error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get seller stats
router.get('/dashboard/stats', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!.userId
    const stats = await getSellerStats(sellerId)
    res.json(stats)
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get recent orders
router.get('/dashboard/recent-orders', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!.userId
    const { limit = 5 } = req.query
    const orders = await getRecentOrders(sellerId, Number(limit))
    res.json(orders)
  } catch (error) {
    console.error('Get recent orders error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get low stock products
router.get('/dashboard/low-stock-products', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!.userId
    const { limit = 5 } = req.query
    const products = await getLowStockProducts(sellerId, Number(limit))
    res.json(products)
  } catch (error) {
    console.error('Get low stock products error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get sales performance
router.get('/dashboard/sales-performance', authenticateToken, requireSeller, async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!.userId
    const { period = '7d' } = req.query
    
    // Calculate date range based on period
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '3m':
        startDate.setMonth(now.getMonth() - 3)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    const salesData = await prisma.order.findMany({
      where: {
        sellerId,
        createdAt: { gte: startDate },
        status: { not: 'CANCELLED' }
      },
      select: {
        total: true,
        createdAt: true,
        status: true
      },
      orderBy: { createdAt: 'asc' }
    })

    res.json({
      period,
      startDate,
      endDate: now,
      totalSales: salesData.reduce((sum, order) => sum + Number(order.total), 0),
      totalOrders: salesData.length,
      salesData
    })
  } catch (error) {
    console.error('Get sales performance error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function getSellerStats(sellerId: string) {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Get current month stats
  const currentMonthStats = await prisma.order.aggregate({
    where: {
      sellerId,
      createdAt: { gte: thisMonth },
      status: { not: 'CANCELLED' }
    },
    _sum: { total: true },
    _count: true
  })

  // Get last month stats
  const lastMonthStats = await prisma.order.aggregate({
    where: {
      sellerId,
      createdAt: { gte: lastMonth, lt: thisMonth },
      status: { not: 'CANCELLED' }
    },
    _sum: { total: true },
    _count: true
  })

  // Get product stats
  const productStats = await prisma.product.aggregate({
    where: { sellerId, isActive: true },
    _count: true
  })

  const lowStockProducts = await prisma.product.count({
    where: {
      sellerId,
      isActive: true,
      stock: { lte: 5 }
    }
  })

  // Calculate growth percentages
  const currentSales = Number(currentMonthStats._sum.total || 0)
  const lastSales = Number(lastMonthStats._sum.total || 0)
  const salesGrowth = lastSales > 0 ? ((currentSales - lastSales) / lastSales) * 100 : 0

  const currentOrders = currentMonthStats._count
  const lastOrders = lastMonthStats._count
  const ordersGrowth = lastOrders > 0 ? ((currentOrders - lastOrders) / lastOrders) * 100 : 0

  return {
    totalSales: currentSales,
    salesGrowth: Math.round(salesGrowth * 100) / 100,
    totalOrders: currentOrders,
    ordersGrowth: Math.round(ordersGrowth * 100) / 100,
    activeProducts: productStats._count,
    lowStockProducts,
    newCustomers: 0, // TODO: Implement customer tracking
    customersGrowth: 0 // TODO: Implement customer tracking
  }
}

async function getRecentOrders(sellerId: string, limit: number) {
  return await prisma.order.findMany({
    where: { sellerId },
    include: {
      buyer: { select: { id: true, name: true, email: true } },
      items: { include: { product: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: limit
  })
}

async function getLowStockProducts(sellerId: string, limit: number) {
  return await prisma.product.findMany({
    where: {
      sellerId,
      isActive: true,
      stock: { lte: 5 }
    },
    select: {
      id: true,
      name: true,
      sku: true,
      stock: true,
      minStock: true
    },
    orderBy: { stock: 'asc' },
    take: limit
  })
}

export default router