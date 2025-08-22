import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/marketplace'

export const useGuestWishlistStore = defineStore('guestWishlist', () => {
  // State
  const items = ref<Product[]>([])
  const isLoading = ref(false)

  // Getters
  const itemCount = computed(() => items.value.length)

  const isEmpty = computed(() => items.value.length === 0)

  const hasItem = computed(() => (productId: string) => 
    items.value.some(item => item.id === productId)
  )

  // Actions
  const addItem = (product: Product) => {
    if (!hasItem.value(product.id)) {
      items.value.push(product)
      saveToLocalStorage()
    }
  }

  const removeItem = (productId: string) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const clearWishlist = () => {
    items.value = []
    saveToLocalStorage()
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('guestWishlist')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Failed to load guest wishlist from localStorage:', error)
      items.value = []
    }
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('guestWishlist', JSON.stringify(items.value))
    } catch (error) {
      console.error('Failed to save guest wishlist to localStorage:', error)
    }
  }

  const migrateToUserWishlist = () => {
    // This will be called when a guest user logs in
    // The actual wishlist store will handle the migration
    const wishlistData = items.value
    clearWishlist()
    return wishlistData
  }

  // Initialize
  loadFromLocalStorage()

  return {
    // State
    items,
    isLoading,
    
    // Getters
    itemCount,
    isEmpty,
    hasItem,
    
    // Actions
    addItem,
    removeItem,
    clearWishlist,
    loadFromLocalStorage,
    saveToLocalStorage,
    migrateToUserWishlist
  }
})
