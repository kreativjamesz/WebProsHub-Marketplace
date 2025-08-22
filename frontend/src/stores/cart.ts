import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/marketplace'
import { api } from '@/services/api'
import type { AxiosError } from 'axios'

export interface CartItem {
  id: string
  buyerId: string
  productId: string
  product: Product
  quantity: number
  createdAt: string
  updatedAt: string
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const isLoading = ref(false)

  // Getters
  const count = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const total = computed(() => 
    items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  )
  
  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = async (product: Product, quantity: number = 1) => {
    try {
      const response = await api.post('/buyers/cart', {
        productId: product.id,
        quantity
      })
      
      // Refresh cart after adding item
      await loadCart()
      return response.data.cartItem
    } catch (error) {
      console.error('Failed to add item to cart:', error)
      throw error
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await api.delete(`/buyers/cart/${itemId}`)
      
      // Remove from local state
      const index = items.value.findIndex(item => item.id === itemId)
      if (index > -1) {
        items.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
      throw error
    }
  }

  const updateQuantity = async (itemId: string, change: number) => {
    try {
      const item = items.value.find(item => item.id === itemId)
      if (!item) return

      const newQuantity = item.quantity + change
      if (newQuantity <= 0) {
        await removeItem(itemId)
        return
      }

      const response = await api.put(`/buyers/cart/${itemId}`, {
        quantity: newQuantity
      })
      
      // Update local state
      item.quantity = newQuantity
      item.updatedAt = response.data.cartItem.updatedAt
    } catch (error) {
      console.error('Failed to update quantity:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      // Remove all items one by one
      const itemIds = items.value.map(item => item.id)
      await Promise.all(itemIds.map(id => removeItem(id)))
      
      // Clear local state
      items.value = []
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    }
  }

  const loadCart = async () => {
    isLoading.value = true
    try {
      const response = await api.get('/buyers/cart')
      items.value = response.data.cart
    } catch (error) {
      console.error('Failed to load cart:', error)
      // If unauthorized, clear cart
      if ((error as AxiosError).response?.status === 401) {
        items.value = []
      }
    } finally {
      isLoading.value = false
    }
  }

  const saveCart = async () => {
    // Cart is automatically saved when using individual API calls
    // This method is kept for compatibility but doesn't need to do anything
    return Promise.resolve()
  }

  return {
    // State
    items,
    isLoading,
    
    // Getters
    count,
    total,
    isEmpty,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadCart,
    saveCart
  }
})
