<template>
  <router-link
    to="/wishlist"
    class="p-2 text-muted-foreground hover:text-foreground transition-colors relative rounded-lg hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    aria-label="Go to wishlist"
  >
    <svg 
      class="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
      />
    </svg>
    <span
      v-if="count > 0"
      class="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
      aria-label="Wishlist items count"
    >
      {{ count > 99 ? '99+' : count }}
    </span>
  </router-link>
</template>

<script setup lang="ts">
interface Props {
  count: number
}

defineProps<Props>()
</script>
