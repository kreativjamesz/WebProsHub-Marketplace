import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Global test configuration
beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks()
  
  // Mock console methods to reduce noise in tests
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  // Clean up after each test
  vi.restoreAllMocks()
})

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})

// Mock window.alert
Object.defineProperty(window, 'alert', {
  writable: true,
  value: vi.fn(),
})

// Mock window.confirm
Object.defineProperty(window, 'confirm', {
  writable: true,
  value: vi.fn(),
})

// Mock window.prompt
Object.defineProperty(window, 'prompt', {
  writable: true,
  value: vi.fn(),
})

// Vue Test Utils global configuration
config.global.stubs = {
  // Stub common components globally
  'router-link': true,
  'router-view': true,
  'transition': false,
  'transition-group': false,
}

// Mock fetch globally
global.fetch = vi.fn()

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mocked-url')

// Mock URL.revokeObjectURL
global.URL.revokeObjectURL = vi.fn()

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'mocked-uuid'),
  },
})

// Mock performance.now
Object.defineProperty(global, 'performance', {
  value: {
    now: vi.fn(() => 1234567890),
  },
})

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0))

// Mock cancelAnimationFrame
global.cancelAnimationFrame = vi.fn()

// Mock setTimeout with faster execution for tests
global.setTimeout = vi.fn((cb, delay) => {
  if (delay === 0) {
    // Execute immediately for 0 delay
    return setTimeout(cb, 0)
  }
  return setTimeout(cb, delay)
})

// Mock setInterval
global.setInterval = vi.fn((cb, delay) => {
  return setInterval(cb, delay)
})

// Mock clearTimeout
global.clearTimeout = vi.fn()

// Mock clearInterval
global.clearInterval = vi.fn()

// Mock addEventListener and removeEventListener
Object.defineProperty(global, 'addEventListener', {
  value: vi.fn(),
})

Object.defineProperty(global, 'removeEventListener', {
  value: vi.fn(),
})

// Mock dispatchEvent
Object.defineProperty(global, 'dispatchEvent', {
  value: vi.fn(),
})

// Mock getComputedStyle
Object.defineProperty(global, 'getComputedStyle', {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ''),
  })),
})

// Mock Element.prototype methods
Element.prototype.scrollIntoView = vi.fn()
Element.prototype.scrollTo = vi.fn()
Element.prototype.focus = vi.fn()
Element.prototype.blur = vi.fn()
Element.prototype.click = vi.fn()

// Mock HTMLElement.prototype methods
HTMLElement.prototype.focus = vi.fn()
HTMLElement.prototype.blur = vi.fn()
HTMLElement.prototype.click = vi.fn()

// Mock HTMLFormElement.prototype methods
HTMLFormElement.prototype.submit = vi.fn()
HTMLFormElement.prototype.reset = vi.fn()

// Mock HTMLInputElement.prototype methods
HTMLInputElement.prototype.select = vi.fn()
HTMLInputElement.prototype.setSelectionRange = vi.fn()

// Mock HTMLTextAreaElement.prototype methods
HTMLTextAreaElement.prototype.select = vi.fn()
HTMLTextAreaElement.prototype.setSelectionRange = vi.fn()

// Mock HTMLSelectElement.prototype methods
HTMLSelectElement.prototype.add = vi.fn()
HTMLSelectElement.prototype.remove = vi.fn()

// Mock File constructor
global.File = vi.fn().mockImplementation((content, name, options) => ({
  name: name || 'test.txt',
  size: content ? content.length : 0,
  type: options?.type || 'text/plain',
  lastModified: options?.lastModified || Date.now(),
  slice: vi.fn(),
  stream: vi.fn(),
  text: vi.fn(() => Promise.resolve(content || '')),
  arrayBuffer: vi.fn(() => Promise.resolve(new ArrayBuffer(0)),
}))

// Mock FileReader
global.FileReader = vi.fn().mockImplementation(() => ({
  readAsText: vi.fn(),
  readAsDataURL: vi.fn(),
  readAsArrayBuffer: vi.fn(),
  result: null,
  error: null,
  readyState: 0,
  onload: null,
  onerror: null,
  onloadend: null,
  onloadstart: null,
  onprogress: null,
  onabort: null,
  abort: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

// Mock Blob
global.Blob = vi.fn().mockImplementation((content, options) => ({
  size: content ? content.length : 0,
  type: options?.type || 'text/plain',
  slice: vi.fn(),
  stream: vi.fn(),
  text: vi.fn(() => Promise.resolve(content || '')),
  arrayBuffer: vi.fn(() => Promise.resolve(new ArrayBuffer(0)),
}))

// Mock FormData
global.FormData = vi.fn().mockImplementation(() => ({
  append: vi.fn(),
  delete: vi.fn(),
  get: vi.fn(),
  getAll: vi.fn(),
  has: vi.fn(),
  set: vi.fn(),
  forEach: vi.fn(),
  entries: vi.fn(() => []),
  keys: vi.fn(() => []),
  values: vi.fn(() => []),
}))

// Mock Headers
global.Headers = vi.fn().mockImplementation(() => ({
  append: vi.fn(),
  delete: vi.fn(),
  get: vi.fn(),
  has: vi.fn(),
  set: vi.fn(),
  forEach: vi.fn(),
  entries: vi.fn(() => []),
  keys: vi.fn(() => []),
  values: vi.fn(() => []),
}))

// Mock Request
global.Request = vi.fn().mockImplementation(() => ({
  url: 'http://localhost',
  method: 'GET',
  headers: new Headers(),
  body: null,
  bodyUsed: false,
  clone: vi.fn(),
  arrayBuffer: vi.fn(() => Promise.resolve(new ArrayBuffer(0))),
  blob: vi.fn(() => Promise.resolve(new Blob())),
  formData: vi.fn(() => Promise.resolve(new FormData())),
  json: vi.fn(() => Promise.resolve({})),
  text: vi.fn(() => Promise.resolve('')),
}))

// Mock Response
global.Response = vi.fn().mockImplementation(() => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  headers: new Headers(),
  body: null,
  bodyUsed: false,
  clone: vi.fn(),
  arrayBuffer: vi.fn(() => Promise.resolve(new ArrayBuffer(0))),
  blob: vi.fn(() => Promise.resolve(new Blob())),
  formData: vi.fn(() => Promise.resolve(new FormData())),
  json: vi.fn(() => Promise.resolve({})),
  text: vi.fn(() => Promise.resolve('')),
}))

// Export test utilities
export * from './utils/__tests__/test-utils'
