import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import { authenticateToken, requireBuyer } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Validation middleware
const validateCartItem = [
  body('productId').isString().notEmpty(),
  body('quantity').isInt({ min: 1 })
]

const validateReview = [
  body('productId').isString().notEmpty(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().trim().isLength({ max: 500 })
]

// Get buyer profile
router.get('/profile', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const buyerProfile = await prisma.buyerProfile.findUnique({
      where: { userId: req.user!.userId },
      include: {
        user: {
          select: { id: true, email: true, name: true, phone: true, avatar: true }
        }
      }
    })

    if (!buyerProfile) {
      return res.status(404).json({ error: 'Buyer profile not found' })
    }

    res.json({ buyer: buyerProfile })
  } catch (error) {
    console.error('Get buyer profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get cart items
router.get('/cart', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { buyerId: req.user!.userId },
      include: { product: { include: { seller: true, store: true } } }
    })

    res.json({ cart: cartItems })
  } catch (error) {
    console.error('Get cart error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add to cart
router.post('/cart', authenticateToken, requireBuyer, validateCartItem, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { productId, quantity } = req.body

    // Check if product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' })
    }

    // Check if already in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: { 
        buyerId_productId: { 
          buyerId: req.user!.userId, 
          productId 
        } 
      }
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: { include: { seller: true, store: true } } }
      })
      return res.json({ cartItem: updatedItem })
    }

    // Add new item
    const cartItem = await prisma.cartItem.create({
      data: { buyerId: req.user!.userId, productId, quantity },
      include: { product: { include: { seller: true, store: true } } }
    })

    res.status(201).json({ cartItem })
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update cart item
router.put('/cart/:id', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id, buyerId: req.user!.userId }
    })

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' })
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: { product: { include: { seller: true, store: true } } }
    })

    res.json({ cartItem: updatedItem })
  } catch (error) {
    console.error('Update cart error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Remove from cart
router.delete('/cart/:id', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const cartItem = await prisma.cartItem.findFirst({
      where: { id, buyerId: req.user!.userId }
    })

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.delete({ where: { id } })

    res.json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Remove from cart error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get wishlist
router.get('/wishlist', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { buyerId: req.user!.userId },
      include: { product: { include: { seller: true, store: true } } }
    })

    res.json({ wishlist: wishlistItems })
  } catch (error) {
    console.error('Get wishlist error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add to wishlist
router.post('/wishlist', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const { productId } = req.body

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Check if already in wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: { 
        buyerId_productId: { 
          buyerId: req.user!.userId, 
          productId 
        } 
      }
    })

    if (existingItem) {
      return res.status(400).json({ error: 'Product already in wishlist' })
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: { buyerId: req.user!.userId, productId },
      include: { product: { include: { seller: true, store: true } } }
    })

    res.status(201).json({ wishlistItem })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Remove from wishlist
router.delete('/wishlist/:id', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const wishlistItem = await prisma.wishlistItem.findFirst({
      where: { id, buyerId: req.user!.userId }
    })

    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' })
    }

    await prisma.wishlistItem.delete({ where: { id } })

    res.json({ message: 'Item removed from wishlist' })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get buyer orders
router.get('/orders', authenticateToken, requireBuyer, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    
    const where: any = { buyerId: req.user!.userId }
    if (status) where.status = status

    const orders = await prisma.order.findMany({
      where,
      include: { 
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

// Create review
router.post('/reviews', authenticateToken, requireBuyer, validateReview, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { productId, rating, comment, images } = req.body

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Check if already reviewed
    const existingReview = await prisma.review.findUnique({
      where: { 
        buyerId_productId: { 
          buyerId: req.user!.userId, 
          productId 
        } 
      }
    })

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' })
    }

    const review = await prisma.review.create({
      data: { buyerId: req.user!.userId, productId, rating, comment, images },
      include: { product: true }
    })

    res.status(201).json({ review })
  } catch (error) {
    console.error('Create review error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router