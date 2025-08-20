import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/api'
import { USER_ROLES } from '@/config/app'
import type { User, LoginCredentials, RegisterData } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === USER_ROLES.ADMIN)
  const isSeller = computed(() => user.value?.role === USER_ROLES.SELLER)
  const isBuyer = computed(() => user.value?.role === USER_ROLES.BUYER)
  const isStaff = computed(() => user.value?.role === USER_ROLES.STAFF)
  const userRole = computed(() => user.value?.role || null)
  const canAccessAdmin = computed(() => isAdmin.value || isStaff.value)

  // Actions
  const login = async (credentials: LoginCredentials) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await apiService.auth.login(credentials)
      const { user: userData, token: authToken } = response.data
      
      user.value = userData
      token.value = authToken
      
      // Store in localStorage
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { success: true, user: userData }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Login failed'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await apiService.auth.register(data)
      const { user: userData, token: authToken } = response.data
      
      user.value = userData
      token.value = authToken
      
      // Store in localStorage
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      return { success: true, user: userData }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Registration failed'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await apiService.auth.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local state
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  }

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        try {
          token.value = storedToken
          user.value = JSON.parse(storedUser)
          
          // Verify token is still valid
          await apiService.users.getProfile()
        } catch {
          // Token invalid, clear everything
          logout()
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      logout()
    } finally {
      isInitialized.value = true
    }
  }

  const refreshToken = async () => {
    try {
      if (!token.value) return false
      
      const response = await apiService.auth.refresh(token.value)
      const { token: newToken } = response.data
      
      token.value = newToken
      localStorage.setItem('auth_token', newToken)
      
      return true
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
      return false
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await apiService.users.updateProfile(data)
      const updatedUser = response.data.user
      
      user.value = { ...user.value, ...updatedUser }
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return { success: true, user: updatedUser }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Profile update failed'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const hasPermission = (permission: string) => {
    if (!user.value) return false
    
    // Admin has all permissions
    if (isAdmin.value) return true
    
    // Staff permissions
    if (isStaff.value) {
      const staffPermissions = ['moderate_reviews', 'view_orders', 'support_users']
      return staffPermissions.includes(permission)
    }
    
    // Seller permissions
    if (isSeller.value) {
      const sellerPermissions = ['manage_products', 'manage_store', 'view_orders']
      return sellerPermissions.includes(permission)
    }
    
    // Buyer permissions
    if (isBuyer.value) {
      const buyerPermissions = ['place_orders', 'write_reviews', 'manage_cart']
      return buyerPermissions.includes(permission)
    }
    
    return false
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    isInitialized,
    
    // Getters
    isAuthenticated,
    isAdmin,
    isSeller,
    isBuyer,
    isStaff,
    userRole,
    canAccessAdmin,
    
    // Actions
    login,
    register,
    logout,
    checkAuth,
    refreshToken,
    updateProfile,
    clearError,
    hasPermission,
  }
})
