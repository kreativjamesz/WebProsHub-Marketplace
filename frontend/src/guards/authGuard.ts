import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { showLogin } from '@/utils/authEvents'

export interface AuthGuardOptions {
  redirectTo?: string
  showDialog?: boolean
  requireAuth?: boolean
  allowedRoles?: string[]
}

export function createAuthGuard(options: AuthGuardOptions = {}) {
  const {
    redirectTo = '/',
    showDialog = true, // Default to showing dialog
    requireAuth = true,
    allowedRoles = []
  } = options

  return async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    
    // Wait for auth to be initialized
    if (!authStore.isInitialized) {
      await authStore.checkAuth()
    }

    // If route doesn't require auth, allow access
    if (!requireAuth) {
      return next()
    }

    // User is authenticated
    if (authStore.isAuthenticated) {
      // Check role-based access if specified
      if (allowedRoles.length > 0) {
        const userRole = authStore.user?.role || 'user'
        if (!allowedRoles.includes(userRole)) {
          // User doesn't have required role
          if (showDialog) {
            // Could show a different dialog for role restrictions
            showLogin()
            return next(false)
          } else {
            return next(redirectTo)
          }
        }
      }
      
      // User has access, allow navigation
      return next()
    }

    // User is NOT authenticated - this is where the magic happens! ✨
    if (showDialog) {
      // Store the intended destination
      authStore.setIntendedRoute(to.fullPath)
      
      // Show the login dialog automatically
      showLogin()
      
      // Prevent navigation (user needs to login first)
      return next(false)
    } else {
      // Fallback to redirect if dialog is disabled
      return next(redirectTo)
    }
  }
}

// Pre-configured guards for common use cases
export const requireAuth = createAuthGuard({ requireAuth: true, showDialog: true })
export const requireGuest = createAuthGuard({ requireAuth: false })
export const requireAdmin = createAuthGuard({ 
  requireAuth: true, 
  showDialog: true, 
  allowedRoles: ['admin'] 
})
export const requireSeller = createAuthGuard({ 
  requireAuth: true, 
  showDialog: true, 
  allowedRoles: ['seller'] 
})

// Custom guard for specific scenarios
export const requireAuthNoDialog = createAuthGuard({ 
  requireAuth: true, 
  showDialog: false 
})
