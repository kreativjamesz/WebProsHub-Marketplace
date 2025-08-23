<template>
  <div class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
          {{ title }}
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90">
          {{ subtitle }}
        </p>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full px-6 py-4 text-foreground rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-primary-foreground/20 bg-background/90"
              @keyup.enter="handleSearch"
            />
            <button
              @click="handleSearch"
              class="absolute right-2 top-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex justify-center items-center space-x-4 mt-6">
          <CartButton />
          <span class="text-primary-foreground/80">Quick access to your cart</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartButton from '@/components/shopping/CartButton.vue'

interface Props {
  title?: string
  subtitle?: string
  searchPlaceholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Discover Amazing Products',
  subtitle: 'Shop from thousands of local businesses and sellers',
  searchPlaceholder: 'Search for products, stores, or categories...'
})

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>
