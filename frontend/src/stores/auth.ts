import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isUser = computed(() => user.value?.role === 'user')

  // Actions
  const login = async (credentials: LoginCredentials) => {
    try {
      isLoading.value = true
      error.value = null

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        role: credentials.email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date(),
      }

      const mockToken = 'mock-jwt-token-' + Date.now()

      user.value = mockUser
      token.value = mockToken

      // Store in localStorage
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))

      return { success: true, user: mockUser }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    try {
      isLoading.value = true
      error.value = null

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: 'user',
        createdAt: new Date(),
      }

      return { success: true, user: mockUser }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      } catch {
        logout()
      }
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    isAdmin,
    isUser,

    // Actions
    login,
    register,
    logout,
    checkAuth,
    clearError,
  }
})
