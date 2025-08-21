import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WebProsHubMarketplace API',
      version: '1.0.0',
      description: 'Professional marketplace API with Google Maps integration',
      contact: {
        name: 'WebProsHub Team',
        email: 'support@webproshub.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      },
      {
        url: 'https://api.webproshub.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890abcdef' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', enum: ['BUYER', 'SELLER', 'ADMIN', 'STAFF'], example: 'BUYER' },
            phone: { type: 'string', example: '+1234567890' },
            avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890abcdef' },
            name: { type: 'string', example: 'iPhone 15 Pro' },
            description: { type: 'string', example: 'Latest iPhone with advanced features' },
            price: { type: 'number', format: 'decimal', example: 999.99 },
            images: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
            },
            stock: { type: 'integer', example: 50 },
            isActive: { type: 'boolean', example: true }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890abcdef' },
            buyerId: { type: 'string', example: 'clx1234567890abcdef' },
            productId: { type: 'string', example: 'clx1234567890abcdef' },
            quantity: { type: 'integer', example: 2 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            product: { $ref: '#/components/schemas/Product' }
          }
        },
        WishlistItem: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890abcdef' },
            buyerId: { type: 'string', example: 'clx1234567890abcdef' },
            productId: { type: 'string', example: 'clx1234567890abcdef' },
            createdAt: { type: 'string', format: 'date-time' },
            product: { $ref: '#/components/schemas/Product' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'clx1234567890abcdef' },
            buyerId: { type: 'string', example: 'clx1234567890abcdef' },
            sellerId: { type: 'string', example: 'clx1234567890abcdef' },
            status: { 
              type: 'string', 
              enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'],
              example: 'PENDING'
            },
            total: { type: 'number', format: 'decimal', example: 999.99 },
            subtotal: { type: 'number', format: 'decimal', example: 899.99 },
            tax: { type: 'number', format: 'decimal', example: 89.99 },
            shipping: { type: 'number', format: 'decimal', example: 10.01 },
            discount: { type: 'number', format: 'decimal', example: 0.00 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Error message' },
            status: { type: 'integer', example: 400 },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/types/*.ts'
  ]
}

export const specs = swaggerJsdoc(options)
