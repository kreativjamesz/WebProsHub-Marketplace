<template>
  <button
    @click="$emit('toggle')"
    class="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mobile-search-toggle"
    :aria-expanded="isActive"
    aria-label="Toggle search"
  >
    <svg 
      class="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
interface Props {
  isActive: boolean
}

interface Emits {
  (e: 'toggle'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
