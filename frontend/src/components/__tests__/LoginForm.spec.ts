import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import { useAuthStore } from '@/stores/auth'

// Mock the auth store
vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(),
}))

describe('LoginForm', () => {
  let wrapper: ReturnType<typeof mount>
  let mockAuthStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())

    // Create mock store
    mockAuthStore = {
      login: vi.fn(),
      isLoading: false,
      error: null,
      clearError: vi.fn(),
    } as any
    ;(useAuthStore as any).mockReturnValue(mockAuthStore)

    wrapper = mount(LoginForm)
  })

  it('renders login form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows loading state when submitting', async () => {
    // Mock async login
    mockAuthStore.login.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

    // Fill form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')

    // Submit form
    await wrapper.find('form').trigger('submit')

    // Check if loading state is shown
    expect(wrapper.find('button[type="submit"]').text()).toContain('Loading')
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })

  it('calls login method with correct credentials', async () => {
    mockAuthStore.login.mockResolvedValue({ success: true, user: {} })

    // Fill form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')

    // Submit form
    await wrapper.find('form').trigger('submit')

    expect(mockAuthStore.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('shows error message when login fails', async () => {
    const errorMessage = 'Invalid credentials'
    mockAuthStore.error = errorMessage

    // Re-render with error
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('clears error when input changes', async () => {
    mockAuthStore.error = 'Some error'

    // Re-render with error
    await wrapper.vm.$nextTick()

    // Change email input
    await wrapper.find('input[type="email"]').setValue('new@example.com')

    expect(mockAuthStore.clearError).toHaveBeenCalled()
  })

  it('validates required fields', async () => {
    // Submit empty form
    await wrapper.find('form').trigger('submit')

    // Should not call login
    expect(mockAuthStore.login).not.toHaveBeenCalled()
  })

  it('shows success message after successful login', async () => {
    mockAuthStore.login.mockResolvedValue({ success: true, user: { name: 'Test User' } })

    // Fill and submit form
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit')

    // Wait for async operation
    await nextTick()

    expect(wrapper.text()).toContain('Welcome, Test User!')
  })
})
