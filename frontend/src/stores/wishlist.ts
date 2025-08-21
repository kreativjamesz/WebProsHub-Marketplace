import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    images: string[]
    seller?: {
      businessName: string
    }
  }
  addedAt: Date
}

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref<WishlistItem[]>([])
  const isLoading = ref(false)

  // Getters
  const count = computed(() => items.value.length)
  
  const isEmpty = computed(() => items.value.length === 0)

  const isInWishlist = (productId: string) => 
    items.value.some(item => item.product.id === productId)

  // Actions
  const addItem = (product: WishlistItem['product']) => {
    if (!isInWishlist(product.id)) {
      items.value.push({
        id: `${product.id}-${Date.now()}`,
        product,
        addedAt: new Date()
      })
    }
  }

  const removeItem = (productId: string) => {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const toggleItem = (product: WishlistItem['product']) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const clearWishlist = () => {
    items.value = []
  }

  const loadWishlist = async () => {
    isLoading.value = true
    try {
      // TODO: Load wishlist from API
      // const response = await api.get('/wishlist')
      // items.value = response.data.map((item: any) => ({
      //   ...item,
      //   addedAt: new Date(item.addedAt)
      // }))
    } catch (error) {
      console.error('Failed to load wishlist:', error)
    } finally {
      isLoading.value = false
    }
  }

  const saveWishlist = async () => {
    try {
      // TODO: Save wishlist to API
      // await api.post('/wishlist', { items: items.value })
    } catch (error) {
      console.error('Failed to save wishlist:', error)
    }
  }

  return {
    // State
    items,
    isLoading,
    
    // Getters
    count,
    isEmpty,
    isInWishlist,
    
    // Actions
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    loadWishlist,
    saveWishlist
  }
})
