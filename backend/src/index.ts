import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import sellerRoutes from './routes/sellers'
import buyerRoutes from './routes/buyers'
import marketplaceRoutes from './routes/marketplace'
import adminRoutes from './routes/admin'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Compression
app.use(compression())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sellers', sellerRoutes)
app.use('/api/buyers', buyerRoutes)
app.use('/api/marketplace', marketplaceRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    app: 'WebProsHubMarketplace',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  })
})

// API info
app.get('/api', (req: Request, res: Response) => {
  res.json({
    app: 'WebProsHubMarketplace',
    version: '1.0.0',
    description: 'Professional marketplace with Google Maps integration',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      sellers: '/api/sellers',
      buyers: '/api/buyers',
      marketplace: '/api/marketplace',
      admin: '/api/admin',
    },
  })
})

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 WebProsHubMarketplace Backend running on port ${PORT}`)
  console.log(`🏪 Marketplace API: http://localhost:${PORT}/api`)
  console.log(` Health check: http://localhost:${PORT}/health`)
})
