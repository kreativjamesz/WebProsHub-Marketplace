<template>
  <div class="flex-1 max-w-lg mx-8 hidden lg:block">
    <div class="relative">
      <input
        :value="modelValue"
        type="text"
        placeholder="Search for products, stores, or categories..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('search')"
        aria-label="Search for products, stores, or categories"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg 
          class="h-5 w-5 text-gray-400" 
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  showMobileSearch?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
  (e: 'toggle-mobile'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
