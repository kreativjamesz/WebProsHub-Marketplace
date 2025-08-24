import { ref } from 'vue'

// Global state for auth dialog
export const authDialogState = ref({
  open: false,
  mode: 'login' as 'login' | 'register'
})

// Event bus for auth triggers
class AuthEventBus {
  private listeners: Map<string, Function[]> = new Map()

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    if (!this.listeners.has(event)) return
    const callbacks = this.listeners.get(event)!
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)
    }
  }

  emit(event: string, data?: any) {
    if (!this.listeners.has(event)) return
    this.listeners.get(event)!.forEach(callback => callback(data))
  }
}

export const authEventBus = new AuthEventBus()

// Convenience functions
export const showLogin = () => {
  authDialogState.value = { open: true, mode: 'login' }
  authEventBus.emit('show-login')
}

export const showRegister = () => {
  authDialogState.value = { open: true, mode: 'register' }
  authEventBus.emit('show-register')
}

export const closeAuth = () => {
  authDialogState.value.open = false
  authEventBus.emit('close-auth')
}

// Listen for auth events
authEventBus.on('show-login', () => {
  authDialogState.value = { open: true, mode: 'login' }
})

authEventBus.on('show-register', () => {
  authDialogState.value = { open: true, mode: 'register' }
})

authEventBus.on('close-auth', () => {
  authDialogState.value.open = false
})
