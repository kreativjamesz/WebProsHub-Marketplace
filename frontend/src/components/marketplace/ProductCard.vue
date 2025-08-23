<template>
     <div
     :class="viewMode === 'grid' ? 'card-hover cursor-pointer border-2 border-primary rounded-lg' : 'card-hover cursor-pointer flex border-2 border-primary rounded-lg'"
     @click="viewProduct(product.id)"
   >
    <!-- Product Image -->
    <div :class="viewMode === 'grid' ? 'relative' : 'relative w-32 h-32 flex-shrink-0'">
      <SafeImage
        :src="product.images[0] || '/placeholder-product.jpg'"
        :alt="product.name"
        :class="viewMode === 'grid' ? 'w-full h-48 rounded-t-lg' : 'w-full h-full rounded-l-lg'"
        object-fit="cover"
      />
      <div :class="viewMode === 'grid' ? 'absolute top-2 right-2' : 'absolute top-2 right-2'">
        <button
          @click.stop="toggleWishlist(product.id)"
          :class="isInWishlist(product.id) ? 'text-destructive' : 'text-muted-foreground'"
          class="p-2 bg-background rounded-full shadow-sm hover:shadow-md transition-all"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

         <!-- Product Info -->
     <div :class="viewMode === 'grid' ? 'p-0 pt-2' : 'p-3 flex-1'">
             <h3 class="font-semibold text-foreground mb-1 line-clamp-2">
         {{ product.name }}
       </h3>
       
       <!-- Category Breadcrumb -->
       <div class="flex items-center text-xs text-muted-foreground mb-1 space-x-1">
        <span v-if="product.mainCategory?.name" class="hover:text-primary transition-colors cursor-pointer">
          {{ product.mainCategory.name }}
        </span>
        <span v-if="product.mainCategory?.name && product.category?.name" class="text-muted-foreground/50">/</span>
        <span v-if="product.category?.name" class="hover:text-primary transition-colors cursor-pointer">
          {{ product.category.name }}
        </span>
        <span v-if="product.category?.name && product.subcategory?.name" class="text-muted-foreground/50">/</span>
        <span v-if="product.subcategory?.name" class="hover:text-primary transition-colors cursor-pointer">
          {{ product.subcategory.name }}
        </span>
      </div>
      
             <p class="text-sm text-muted-foreground mb-2 line-clamp-2">
         {{ product.description }}
       </p>

             <!-- Price -->
       <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold text-foreground">
            ₱{{ Number(product.price).toFixed(2) }}
          </span>
          <span v-if="product.comparePrice" class="text-sm text-muted-foreground line-through">
            ₱{{ Number(product.comparePrice).toFixed(2) }}
          </span>
        </div>

        <!-- Rating -->
        <div class="flex items-center space-x-1">
          <div class="flex items-center">
            <svg
              v-for="star in 5"
              :key="star"
              :class="star <= (product.rating || 0) ? 'text-yellow-400' : 'text-muted'"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <span class="text-sm text-muted-foreground">({{ product._count?.reviews || 0 }})</span>
        </div>
      </div>

             <!-- Store Info -->
       <div class="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>{{ product.seller?.businessName || 'Unknown Store' }}</span>
        <span>{{ product.store?.city || 'Unknown Location' }}</span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart(product.id)"
        class="btn-primary w-full"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/marketplace'
import SafeImage from '@/components/ui/SafeImage.vue'

interface Props {
  product: Product
  viewMode: 'grid' | 'list'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewProduct: [id: string]
  toggleWishlist: [id: string]
  addToCart: [id: string]
}>()

const viewProduct = (productId: string) => {
  emit('viewProduct', productId)
}

const toggleWishlist = (productId: string) => {
  emit('toggleWishlist', productId)
}

const addToCart = (productId: string) => {
  emit('addToCart', productId)
}

const isInWishlist = (productId: string) => {
  // TODO: Check if product is in wishlist
  return false
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
