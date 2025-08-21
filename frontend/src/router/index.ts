import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  authRoutes,
  marketplaceRoutes,
  buyerRoutes,
  sellerRoutes,
  adminRoutes,
  generalRoutes
} from './routes.index'

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
  
  // Protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Role-based access control
  if (to.meta.role && authStore.userRole !== to.meta.role) {
    if (authStore.canAccessAdmin) {
      next('/admin/dashboard')
    } else if (authStore.isSeller) {
      next('/seller/dashboard')
    } else if (authStore.isBuyer) {
      next('/buyer/dashboard')
    } else {
      next('/')
    }
    return
  }
  
  next()
})

export default router
