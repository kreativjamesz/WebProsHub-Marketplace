import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, requireSeller } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

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
        stores: true,
        categories: true
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

export default router