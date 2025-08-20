import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import type { LoginCredentials, RegisterData } from '../auth'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Auth Store', () => {
  let store: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia())
    store = useAuthStore()

    // Clear all mocks
    vi.clearAllMocks()

    // Reset localStorage mock
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
  })

  afterEach(() => {
    // Clean up after each test
    if (store) {
      store.logout()
    }
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should have correct initial computed values', () => {
      expect(store.isAuthenticated).toBe(false)
      expect(store.isAdmin).toBe(false)
      expect(store.isUser).toBe(false)
    })
  })

  describe('Login', () => {
    it('should successfully login a regular user', async () => {
      const credentials: LoginCredentials = {
        email: 'user@example.com',
        password: 'password123',
      }

      const result = await store.login(credentials)

      expect(store.isLoading).toBe(false)
      expect(store.user).toBeTruthy()
      expect(store.token).toBeTruthy()
      expect(store.error).toBeNull()
      expect(store.isAuthenticated).toBe(true)
      expect(store.isUser).toBe(true)
      expect(store.isAdmin).toBe(false)
      expect(result.success).toBe(true)
      expect(result.user?.email).toBe(credentials.email)
      expect(result.user?.role).toBe('user')
    })

    it('should successfully login an admin user', async () => {
      const credentials: LoginCredentials = {
        email: 'admin@example.com',
        password: 'admin123',
      }

      await store.login(credentials)

      expect(store.isAdmin).toBe(true)
      expect(store.isUser).toBe(false)
      expect(store.user?.role).toBe('admin')
    })

    it('should store data in localStorage after successful login', async () => {
      const credentials: LoginCredentials = {
        email: 'user@example.com',
        password: 'password123',
      }

      await store.login(credentials)

      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', expect.any(String))
      expect(localStorageMock.setItem).toHaveBeenCalledWith('user', expect.any(String))
    })

    it('should handle login errors', async () => {
      // Mock a failed login by throwing an error
      vi.spyOn(store, 'login').mockRejectedValueOnce(new Error('Invalid credentials'))

      const credentials: LoginCredentials = {
        email: 'invalid@example.com',
        password: 'wrong',
      }

      await expect(store.login(credentials)).rejects.toThrow('Invalid credentials')
      expect(store.error).toBe('Invalid credentials')
      expect(store.isLoading).toBe(false)
    })
  })

  describe('Register', () => {
    it('should successfully register a new user', async () => {
      const data: RegisterData = {
        email: 'newuser@example.com',
        password: 'newpassword123',
        name: 'New User',
      }

      const result = await store.register(data)

      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(result.success).toBe(true)
      expect(result.user?.email).toBe(data.email)
      expect(result.user?.name).toBe(data.name)
      expect(result.user?.role).toBe('user')
    })

    it('should handle registration errors', async () => {
      // Mock a failed registration
      vi.spyOn(store, 'register').mockRejectedValueOnce(new Error('Email already exists'))

      const data: RegisterData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Existing User',
      }

      await expect(store.register(data)).rejects.toThrow('Email already exists')
      expect(store.error).toBe('Email already exists')
      expect(store.isLoading).toBe(false)
    })
  })

  describe('Logout', () => {
    it('should clear user data and token on logout', async () => {
      // First login
      await store.login({
        email: 'user@example.com',
        password: 'password123',
      })

      expect(store.isAuthenticated).toBe(true)

      // Then logout
      store.logout()

      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isAuthenticated).toBe(false)
      expect(store.isAdmin).toBe(false)
      expect(store.isUser).toBe(false)
    })

    it('should clear localStorage on logout', async () => {
      // First login
      await store.login({
        email: 'user@example.com',
        password: 'password123',
      })

      // Then logout
      store.logout()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
    })
  })

  describe('Check Auth', () => {
    it('should restore user session from localStorage', () => {
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
        role: 'user' as const,
        createdAt: new Date(),
      }
      const mockToken = 'mock-token-123'

      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return mockToken
        if (key === 'user') return JSON.stringify(mockUser)
        return null
      })

      store.checkAuth()

      expect(store.user).toEqual(mockUser)
      expect(store.token).toBe(mockToken)
      expect(store.isAuthenticated).toBe(true)
    })

    it('should handle invalid localStorage data', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return 'invalid-token'
        if (key === 'user') return 'invalid-json'
        return null
      })

      store.checkAuth()

      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })

    it('should not restore session if localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null)

      store.checkAuth()

      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should clear error when clearError is called', async () => {
      // First set an error
      store.error = 'Some error occurred'
      expect(store.error).toBe('Some error occurred')

      // Clear the error
      store.clearError()
      expect(store.error).toBeNull()
    })
  })

  describe('Loading States', () => {
    it('should set loading to true during async operations', async () => {
      const credentials: LoginCredentials = {
        email: 'user@example.com',
        password: 'password123',
      }

      // Start login (async operation)
      const loginPromise = store.login(credentials)

      // Check loading state during operation
      expect(store.isLoading).toBe(true)

      // Wait for completion
      await loginPromise

      // Check loading state after completion
      expect(store.isLoading).toBe(false)
    })
  })
})
