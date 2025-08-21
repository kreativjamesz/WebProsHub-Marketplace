<template>
  <button
    @click="$emit('toggle')"
    class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    :aria-expanded="isActive"
    aria-label="Toggle mobile menu"
  >
    <svg 
      class="w-6 h-6 transition-transform duration-200" 
      :class="{ 'rotate-90': isActive }"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        v-if="!isActive"
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M4 6h16M4 12h16M4 18h16" 
      />
      <path 
        v-else
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M6 18L18 6M6 6l12 12" 
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
