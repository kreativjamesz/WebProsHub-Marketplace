import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/marketplace'

export const useGuestCartStore = defineStore('guestCart', () => {
  // State
  const items = ref<Array<{ product: Product; quantity: number; id: string }>>([])
  const isLoading = ref(false)

  // Getters
  const itemCount = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() => 
    items.value.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    )
  )

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        product,
        quantity,
        id: `guest-${Date.now()}-${Math.random()}`
      })
    }
    
    saveToLocalStorage()
  }

  const removeItem = (itemId: string) => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateQuantity = (itemId: string, change: number) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = newQuantity
        saveToLocalStorage()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('guestCart')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Failed to load guest cart from localStorage:', error)
      items.value = []
    }
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('guestCart', JSON.stringify(items.value))
    } catch (error) {
      console.error('Failed to save guest cart to localStorage:', error)
    }
  }

  const migrateToUserCart = () => {
    // This will be called when a guest user logs in
    // The actual cart store will handle the migration
    const cartData = items.value
    clearCart()
    return cartData
  }

  // Initialize
  loadFromLocalStorage()

  return {
    // State
    items,
    isLoading,
    
    // Getters
    itemCount,
    totalPrice,
    isEmpty,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadFromLocalStorage,
    saveToLocalStorage,
    migrateToUserCart
  }
})
