import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { PrismaClient, UserRole } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Validation middleware
const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
]

const validateRegister = [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('accountType').optional().isIn(['BUYER', 'SELLER']),
]

// JWT options
const jwtOptions: SignOptions = {
  expiresIn: Number(process.env.JWT_EXPIRES_IN) || 24 * 60 * 60,
}

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      jwtOptions
    )

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user
    res.json({
      success: true,
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description: Create a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: User's full name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', validateRegister, async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, accountType = 'BUYER' } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with specified role
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: accountType as UserRole,
      },
    })

    console.log(`✅ User registered successfully: ${user.name} as ${user.role}`)

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      jwtOptions
    )

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Logout route (client-side token removal)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' })
})

// Refresh token route
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Get fresh user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // Generate new token
    const newToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      jwtOptions
    )

    const { password: _, ...userWithoutPassword } = user
    res.json({
      success: true,
      user: userWithoutPassword,
      token: newToken,
    })
  } catch (error) {
    console.error('Token refresh error:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
