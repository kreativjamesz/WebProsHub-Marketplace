#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const envContent = `# Database Configuration
DATABASE_URL="mysql://vue_user:vue_password@localhost:3306/vue_gmap_db"
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=vue_user
DB_PASSWORD=vue_password
DB_NAME=vue_gmap_db

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
`

const envPath = path.join(__dirname, '.env')

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env file with default configuration')
  console.log('📝 Please review and update the values as needed')
} else {
  console.log('⚠️  .env file already exists')
  console.log('📝 Please check if the configuration is correct')
}

console.log('\n🔧 Next steps:')
console.log('1. Start your MySQL database (docker-compose up mysql)')
console.log('2. Run: npm run db:generate')
console.log('3. Run: npm run db:push')
console.log('4. Start your backend server: npm run dev')
