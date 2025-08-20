import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, requireAdmin } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Validation middleware
const validateUserUpdate = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['BUYER', 'SELLER', 'ADMIN', 'STAFF']),
  body('isActive').optional().isBoolean()
]

// Get admin dashboard stats
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

// Get all users
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

// Update user
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