import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import sellerRoutes from './routes/sellers'
import buyerRoutes from './routes/buyers'
import marketplaceRoutes from './routes/marketplace'
import adminRoutes from './routes/admin'

// Import Swagger specs
import { specs } from './config/swagger'

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

// CORS - Must come before other middleware
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    const allowedOrigins = [
      'http://localhost:5173',  // Vite dev server
      'http://localhost:3000',  // Alternative frontend port
      'http://localhost:80'     // If you have this configured
    ]
    
    console.log('🌐 CORS request from origin:', origin)
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('❌ CORS blocked origin:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200,
  preflightContinue: false
}

app.use(cors(corsOptions))

// Handle preflight requests explicitly
app.options('*', cors(corsOptions))

// Debug middleware to log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`)
  next()
})

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Compression
app.use(compression())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'WebProsHubMarketplace API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    deepLinking: true
  }
}))

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
    documentation: '/api-docs',
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
