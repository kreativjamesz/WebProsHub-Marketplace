import { computed } from 'vue'
import { authDialogState, showLogin, showRegister, closeAuth } from '@/utils/authEvents'

export function useAuthDialog() {
  return {
    // State
    authDialogState,
    
    // Actions
    showLogin,
    showRegister,
    closeAuth,
    
    // Computed
    isOpen: computed(() => authDialogState.value.open),
    currentMode: computed(() => authDialogState.value.mode),
    
    // Convenience methods
    triggerLogin: () => showLogin(),
    triggerRegister: () => showRegister(),
    triggerAuth: (mode: 'login' | 'register' = 'login') => {
      if (mode === 'login') {
        showLogin()
      } else {
        showRegister()
      }
    }
  }
}
