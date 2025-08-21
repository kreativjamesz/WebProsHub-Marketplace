<template>
  <div class="flex items-center">
    <router-link 
      to="/" 
      class="flex items-center space-x-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
      aria-label="Go to homepage"
    >
      <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <svg 
          class="w-5 h-5 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
          />
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </div>
      <span v-if="!solo" class="text-foreground text-xl font-bold">WebProsHub</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  solo?: boolean
}>()
</script>
