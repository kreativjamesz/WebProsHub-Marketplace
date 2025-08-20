import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Define JWT payload interface
interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' })
  }
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

export const requireSeller = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'SELLER') {
    return res.status(403).json({ error: 'Seller access required' })
  }
  next()
}

export const requireBuyer = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'BUYER') {
    return res.status(403).json({ error: 'Buyer access required' })
  }
  next()
}

export const requireStaff = (req: Request, res: Response, next: NextFunction) => {
  if (!['ADMIN', 'STAFF'].includes(req.user?.role || '')) {
    return res.status(403).json({ error: 'Staff access required' })
  }
  next()
}