import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { ComponentPublicInstance } from 'vue'
import type { App } from 'vue'

// Test utilities for Vue components
export function createTestWrapper<T = ComponentPublicInstance>(
  component: any,
  options: any = {},
): VueWrapper<T> {
  // Create a fresh pinia instance
  const pinia = createPinia()
  setActivePinia(pinia)

  return mount(component, {
    global: {
      plugins: [pinia],
      stubs: {
        // Stub common components
        'router-link': true,
        'router-view': true,
        transition: false,
        'transition-group': false,
      },
      mocks: {
        // Mock common globals
        $route: { path: '/', params: {}, query: {} },
        $router: {
          push: vi.fn(),
          replace: vi.fn(),
          go: vi.fn(),
          back: vi.fn(),
        },
      },
    },
    ...options,
  })
}

// Mock localStorage
export function mockLocalStorage() {
  const store: Record<string, string> = {}

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        Object.keys(store).forEach((key) => delete store[key])
      }),
      length: Object.keys(store).length,
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
    },
    writable: true,
  })
}

// Mock router
export function mockRouter() {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: {
      value: {
        path: '/',
        name: 'home',
        params: {},
        query: {},
        hash: '',
        fullPath: '/',
        matched: [],
        meta: {},
      },
    },
  }
}

// Mock API responses
export function mockApiResponse<T>(data: T, delay = 100): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

export function mockApiError(message: string, delay = 100): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), delay))
}

// Test data factories
export const createMockUser = (overrides: Partial<any> = {}) => ({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user' as const,
  createdAt: new Date('2024-01-01'),
  ...overrides,
})

export const createMockAdmin = (overrides: Partial<any> = {}) => ({
  id: '2',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin' as const,
  createdAt: new Date('2024-01-01'),
  ...overrides,
})

export const createMockLoginCredentials = (overrides: Partial<any> = {}) => ({
  email: 'test@example.com',
  password: 'password123',
  ...overrides,
})

export const createMockRegisterData = (overrides: Partial<any> = {}) => ({
  email: 'newuser@example.com',
  password: 'newpassword123',
  name: 'New User',
  ...overrides,
})

// Async testing helpers
export const waitForNextTick = () => new Promise((resolve) => setTimeout(resolve, 0))

export const waitForCondition = (
  condition: () => boolean,
  timeout = 5000,
  interval = 100,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkCondition = () => {
      if (condition()) {
        resolve()
        return
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error('Condition timeout'))
        return
      }

      setTimeout(checkCondition, interval)
    }

    checkCondition()
  })
}

// Form testing helpers
export const fillForm = async (wrapper: VueWrapper, formData: Record<string, string>) => {
  for (const [field, value] of Object.entries(formData)) {
    const input = wrapper.find(`[data-testid="${field}"]`)
    if (input.exists()) {
      await input.setValue(value)
    }
  }
}

export const submitForm = async (wrapper: VueWrapper, formSelector = 'form') => {
  const form = wrapper.find(formSelector)
  if (form.exists()) {
    await form.trigger('submit')
  }
}

// Assertion helpers
export const expectElementToBeVisible = (wrapper: VueWrapper, testId: string) => {
  const element = wrapper.find(`[data-testid="${testId}"]`)
  expect(element.exists()).toBe(true)
  expect(element.isVisible()).toBe(true)
}

export const expectElementToNotExist = (wrapper: VueWrapper, testId: string) => {
  const element = wrapper.find(`[data-testid="${testId}"]`)
  expect(element.exists()).toBe(false)
}

export const expectElementToContainText = (wrapper: VueWrapper, testId: string, text: string) => {
  const element = wrapper.find(`[data-testid="${testId}"]`)
  expect(element.text()).toContain(text)
}

// Cleanup helper
export function cleanupTest() {
  // Clear all mocks
  vi.clearAllMocks()

  // Clear localStorage mock
  if (window.localStorage) {
    window.localStorage.clear()
  }

  // Reset pinia
  setActivePinia(createPinia())
}
