import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  authRoutes,
  marketplaceRoutes,
  buyerRoutes,
  sellerRoutes,
  adminRoutes,
  generalRoutes
} from './routes/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...generalRoutes,
    ...authRoutes,
    ...marketplaceRoutes,
    ...buyerRoutes,
    ...sellerRoutes,
    ...adminRoutes
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth to be initialized
  if (!authStore.isInitialized) {
    await authStore.checkAuth()
  }
  
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // Guest routes (login/register) - redirect if already authenticated
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  // Seller-specific status checks (Layer 1: Route Guard)
  if (to.meta.role === 'SELLER' && authStore.isAuthenticated) {
    const sellerStatus = await authStore.checkSellerStatus()
    
    // Don't redirect if already going to these routes
    if (to.name === 'seller-pending-approval' || to.name === 'seller-onboarding') {
      next()
      return
    }
    
    // Redirect based on seller status
    if (sellerStatus === 'pending-approval') {
      next('/seller/pending-approval')
      return
    } else if (sellerStatus === 'no-store') {
      next('/seller/onboarding')
      return
    }
  }
  
  next()
})

export default router
