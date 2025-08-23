import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../prisma/client'
import { authenticateToken, requireAdmin } from '../middleware/auth'

const router = Router()

// Validation middleware
const validateUserUpdate = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['BUYER', 'SELLER', 'ADMIN', 'STAFF']),
  body('isActive').optional().isBoolean()
]

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard stats
 *     description: Retrieve statistics for the admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       description: Total number of users
 *                       example: 1250
 *                     totalSellers:
 *                       type: integer
 *                       description: Total number of sellers
 *                       example: 89
 *                     totalProducts:
 *                       type: integer
 *                       description: Total number of products
 *                       example: 5670
 *                     totalOrders:
 *                       type: integer
 *                       description: Total number of orders
 *                       example: 2340
 *                     totalRevenue:
 *                       type: number
 *                       description: Total revenue from delivered orders
 *                       example: 125000.50
 *                     pendingOrders:
 *                       type: integer
 *                       description: Number of pending orders
 *                       example: 45
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.get('/dashboard', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders
    ] = await Promise.all([
      prisma.user.count(),
      prisma.sellerProfile.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: 'DELIVERED' },
        _sum: { total: true }
      }),
      prisma.order.count({ where: { status: 'PENDING' } })
    ])

    res.json({
      stats: {
        totalUsers,
        totalSellers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        pendingOrders
      }
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a paginated list of all users with optional filtering
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *         name: role
 *         schema:
 *           type: string
 *           enum: [BUYER, SELLER, ADMIN, STAFF]
 *         description: Filter users by role
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search users by name or email
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter users by active status
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       name:
 *                         type: string
 *                       role:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.get('/users', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, role, search, isActive } = req.query
    
    const where: any = {}
    if (role) where.role = role
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ]
    }
    if (isActive !== undefined) where.isActive = isActive === 'true'

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.user.count({ where })

    res.json({ 
      users, 
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user information (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: User's name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *                 example: "user@example.com"
 *               role:
 *                 type: string
 *                 enum: [BUYER, SELLER, ADMIN, STAFF]
 *                 description: User's role
 *                 example: "SELLER"
 *               isActive:
 *                 type: boolean
 *                 description: User's active status
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/users/:id', authenticateToken, requireAdmin, validateUserUpdate, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const updateData = req.body

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.json({ user })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all sellers
router.get('/sellers', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, isVerified, isActive, search } = req.query
    
    const where: any = {}
    if (isVerified !== undefined) where.isVerified = isVerified === 'true'
    if (isActive !== undefined) where.isActive = isActive === 'true'
    if (search) {
      where.OR = [
        { businessName: { contains: search as string, mode: 'insensitive' } },
        { businessType: { contains: search as string, mode: 'insensitive' } },
        { user: { name: { contains: search as string, mode: 'insensitive' } } }
      ]
    }

    const sellers = await prisma.sellerProfile.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, name: true, isActive: true } },
        stores: true,
        _count: { select: { products: true, orders: true } }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.sellerProfile.count({ where })

    res.json({ 
      sellers, 
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) }
    })
  } catch (error) {
    console.error('Get sellers error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/admin/sellers/pending:
 *   get:
 *     summary: Get pending seller approvals
 *     description: Retrieve all sellers waiting for admin approval
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending sellers
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get('/sellers/pending', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const pendingSellers = await prisma.sellerProfile.findMany({
      where: {
        isApproved: false,
        isActive: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    res.json({
      success: true,
      sellers: pendingSellers,
      count: pendingSellers.length,
    })
  } catch (error) {
    console.error('Error fetching pending sellers:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/admin/sellers/{id}/approve:
 *   put:
 *     summary: Approve seller
 *     description: Approve a seller account and activate their profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Seller profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isApproved:
 *                 type: boolean
 *                 description: Whether to approve the seller
 *               notes:
 *                 type: string
 *                 description: Admin notes about the approval
 *     responses:
 *       200:
 *         description: Seller approval status updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Seller not found
 */
router.put('/sellers/:id/approve', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { isApproved, notes } = req.body

    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!sellerProfile) {
      return res.status(404).json({ error: 'Seller profile not found' })
    }

    // Update seller approval status
    const updatedSeller = await prisma.sellerProfile.update({
      where: { id },
      data: {
        isApproved: isApproved,
        isActive: isApproved, // Auto-activate if approved
        approvalDate: isApproved ? new Date() : null,
        approvedBy: isApproved ? req.user?.userId : null,
      },
      include: { user: true },
    })

    console.log(`✅ Seller ${updatedSeller.user.name} ${isApproved ? 'approved' : 'rejected'} by admin`)

    res.json({
      success: true,
      message: `Seller ${isApproved ? 'approved' : 'rejected'} successfully`,
      seller: updatedSeller,
    })
  } catch (error) {
    console.error('Error updating seller approval:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Verify seller
router.put('/sellers/:id/verify', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { isVerified } = req.body

    const seller = await prisma.sellerProfile.update({
      where: { id },
      data: { isVerified },
      include: {
        user: { select: { id: true, email: true, name: true } }
      }
    })

    res.json({ seller })
  } catch (error) {
    console.error('Verify seller error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all products
router.get('/products', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, sellerId, categoryId, isActive, search } = req.query
    
    const where: any = {}
    if (sellerId) where.sellerId = sellerId
    if (categoryId) where.categoryId = categoryId
    if (isActive !== undefined) where.isActive = isActive === 'true'
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        seller: { select: { businessName: true } },
        store: { select: { name: true } }
      },
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

// Get all orders
router.get('/orders', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status, sellerId, buyerId } = req.query
    
    const where: any = {}
    if (status) where.status = status
    if (sellerId) where.sellerId = sellerId
    if (buyerId) where.buyerId = buyerId

    const orders = await prisma.order.findMany({
      where,
      include: {
        buyer: { select: { id: true, name: true, email: true } },
        seller: { select: { businessName: true } },
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

export default router