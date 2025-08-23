import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

export const databaseConfig = {
  url: process.env.DATABASE_URL || 'mysql://vue_user:vue_password@localhost:3306/vue_gmap_db',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'vue_user',
  password: process.env.DB_PASSWORD || 'vue_password',
  database: process.env.DB_NAME || 'vue_gmap_db',
}

export const serverConfig = {
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
}

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
}
