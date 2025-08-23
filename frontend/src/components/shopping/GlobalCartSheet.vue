<template>
  <Sheet v-model:open="isGlobalCartOpen">
    <SheetContent class="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
        <SheetDescription>
          {{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }} in your cart
        </SheetDescription>
      </SheetHeader>
      <div class="p-4">
        <!-- Guest User Notice -->
        <div
          v-if="!isAuthenticated && cartItems.length > 0"
          class="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4"
        >
          <div class="flex items-start space-x-2">
            <svg
              class="w-5 h-5 text-primary mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div class="flex-1">
              <p class="text-sm text-primary font-medium">Guest User</p>
              <p class="text-xs text-primary/80 mt-1">
                Sign in to save your cart and complete your purchase
              </p>
              <div class="flex space-x-2 mt-2">
                <router-link
                  to="/login"
                  class="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </router-link>
                <router-link
                  to="/register"
                  class="text-xs border border-primary/30 text-primary px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                >
                  Sign Up
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Content -->
        <div class="flex-1 overflow-y-auto py-6">
          <!-- Empty Cart State -->
          <div v-if="cartItems.length === 0" class="text-center py-12">
            <div class="mx-auto h-24 w-24 text-muted-foreground mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
            <p class="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <SheetClose as-child>
              <router-link
                to="/marketplace"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
              >
                Browse Products
              </router-link>
            </SheetClose>
          </div>

          <!-- Cart Items -->
          <div v-else class="space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center space-x-4 p-4 bg-accent rounded-lg"
            >
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <SafeImage
                  :src="item.product.images?.[0] || '/placeholder-product.jpg'"
                  :alt="item.product.name"
                  class="w-16 h-16 object-cover rounded-md"
                  @error="handleImageError"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-foreground truncate">
                  {{ item.product.name }}
                </h4>
                <p class="text-sm text-muted-foreground">
                  Store: {{ item.product.seller?.businessName || 'Unknown Store' }}
                </p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-sm font-medium text-foreground">
                    ₱{{ formatPrice(item.product.price) }}
                  </span>
                  <div class="flex items-center space-x-2">
                    <!-- Quantity Controls -->
                    <button
                      @click="decreaseQuantity(item.id)"
                      :disabled="item.quantity <= 1"
                      class="w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span class="text-sm font-medium text-foreground min-w-[2rem] text-center">
                      {{ item.quantity }}
                    </span>

                    <button
                      @click="increaseQuantity(item.id)"
                      class="w-6 h-6 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Remove Button -->
              <button
                @click="removeFromCart(item.id)"
                class="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove item"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Cart Summary -->
      <SheetFooter v-if="cartItems.length > 0" class="border-t border-border pt-4 space-y-4">
        <!-- Subtotal -->
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Subtotal:</span>
          <span class="font-medium text-foreground">₱{{ formatPrice(totalPrice) }}</span>
        </div>

        <!-- Actions -->
        <div class="space-y-2">
          <!-- Checkout Button -->
          <button
            @click="handleCheckout"
            :disabled="isLoading"
            class="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
            <span v-else>
              {{ isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout' }}
            </span>
          </button>

          <!-- Clear Cart Button -->
          <button
            @click="clearCart"
            class="w-full border border-border text-foreground py-2 px-4 rounded-md hover:bg-accent transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'
import { useGlobalCart } from '@/composables/useGlobalCart'
import { toast } from 'vue3-toastify'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet'
import SafeImage from '../ui/SafeImage.vue'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()
const { isGlobalCartOpen, closeGlobalCart } = useGlobalCart()

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const cartItems = computed(() => (isAuthenticated.value ? cartStore.items : guestCartStore.items))
const totalPrice = computed(() =>
  isAuthenticated.value ? cartStore.total : guestCartStore.totalPrice,
)
const isLoading = computed(() =>
  isAuthenticated.value ? cartStore.isLoading : guestCartStore.isLoading,
)

// Methods
const increaseQuantity = async (itemId: string) => {
  if (isAuthenticated.value) {
    await cartStore.updateQuantity(itemId, 1)
  } else {
    guestCartStore.updateQuantity(itemId, 1)
  }
}

const decreaseQuantity = async (itemId: string) => {
  if (isAuthenticated.value) {
    await cartStore.updateQuantity(itemId, -1)
  } else {
    guestCartStore.updateQuantity(itemId, -1)
  }
}

const removeFromCart = async (itemId: string) => {
  if (isAuthenticated.value) {
    await cartStore.removeItem(itemId)
  } else {
    guestCartStore.removeItem(itemId)
  }
}

const clearCart = async () => {
  if (isAuthenticated.value) {
    await cartStore.clearCart()
  } else {
    guestCartStore.clearCart()
  }
}

const handleCheckout = () => {
  if (!isAuthenticated.value) {
    toast.info('Please sign in to complete your purchase')
    router.push('/login')
    closeGlobalCart()
    return
  }

  // For now, redirect to marketplace since checkout page might not exist
  toast.info('Checkout functionality coming soon!')
  router.push('/marketplace')
  closeGlobalCart()
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-product.jpg'
}

const formatPrice = (price: number | undefined) => {
  if (price === undefined || price === null) return '0.00'
  return price.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
