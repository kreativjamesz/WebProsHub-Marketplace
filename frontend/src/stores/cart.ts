import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/marketplace'

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
  const addItem = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find(item => item.productId === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.updatedAt = new Date().toISOString()
    } else {
      const newItem: CartItem = {
        id: crypto.randomUUID(),
        buyerId: 'temp-buyer-id', // TODO: Get from auth store
        productId: product.id,
        product,
        quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      items.value.push(newItem)
    }
    
    saveCart()
  }

  const removeItem = (itemId: string) => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const loadCart = async () => {
    isLoading.value = true
    try {
      // TODO: Load cart from API
      // const response = await api.get('/cart')
      // items.value = response.data
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      isLoading.value = false
    }
  }

  const saveCart = async () => {
    try {
      // TODO: Save cart to API
      // await api.post('/cart', { items: items.value })
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
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
