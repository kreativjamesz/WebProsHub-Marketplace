# Backend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
npm run setup:env
```
This will create a `.env` file with default configuration.

### 3. Start Database
```bash
# From the root directory
docker-compose up mysql -d
```

### 4. Generate Prisma Client
```bash
npm run db:generate
```

### 5. Push Database Schema
```bash
npm run db:push
```

### 6. Seed Database (Optional)
```bash
npm run db:seed
```

### 7. Start Development Server
```bash
npm run dev
```

## 🔧 Database Configuration

The default configuration connects to:
- **Host**: localhost
- **Port**: 3306
- **Database**: vue_gmap_db
- **Username**: vue_user
- **Password**: vue_password

## 📝 Environment Variables

Create a `.env` file with these variables:

```env
# Database Configuration
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
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Start only MySQL
docker-compose up mysql -d

# View logs
docker-compose logs mysql

# Stop services
docker-compose down

# Reset database
docker-compose down -v
docker-compose up mysql -d
```

## 🚨 Troubleshooting

### Database Connection Error
If you get "Can't reach database server" error:

1. **Check if MySQL is running:**
   ```bash
   docker-compose ps
   ```

2. **Check MySQL logs:**
   ```bash
   docker-compose logs mysql
   ```

3. **Verify port configuration:**
   - MySQL should be running on port 3306
   - Check if port 3306 is not used by another service

4. **Reset database:**
   ```bash
   docker-compose down -v
   docker-compose up mysql -d
   npm run db:push
   ```

### Prisma Issues
1. **Regenerate Prisma client:**
   ```bash
   npm run db:generate
   ```

2. **Reset database schema:**
   ```bash
   npm run db:reset
   ```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup:env` - Setup environment variables
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run test` - Run tests
- `npm run lint` - Run linting
