import { ref } from 'vue'

// Global state for cart visibility
const isGlobalCartOpen = ref(false)

export function useGlobalCart() {
  const openGlobalCart = () => {
    isGlobalCartOpen.value = true
  }

  const closeGlobalCart = () => {
    isGlobalCartOpen.value = false
  }

  const toggleGlobalCart = () => {
    isGlobalCartOpen.value = !isGlobalCartOpen.value
  }

  return {
    isGlobalCartOpen,
    openGlobalCart,
    closeGlobalCart,
    toggleGlobalCart
  }
}
