<template>
  <button
    @click="$emit('click')"
    class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2 text-left"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <!-- Floating Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.03)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
      
      <!-- Floating Particles -->
      <div class="absolute top-4 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse shadow-lg shadow-purple-400/50"></div>
      <div class="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 animate-pulse shadow-lg shadow-pink-400/50"></div>
    </div>

    <!-- Content -->
    <div class="relative p-6">
      <!-- Icon Container -->
      <div :class="`w-16 h-16 ${iconBgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ${iconShadowColor} border border-current/30`">
        <component :is="icon" :class="`w-8 h-8 ${iconTextColor}`" />
      </div>

      <!-- Action Info -->
      <h3 class="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-indigo-500 transition-all duration-300">
        {{ title }}
      </h3>
      <p class="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
        {{ description }}
      </p>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    <!-- Border Glow -->
    <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500 pointer-events-none group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"></div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  title: string
  description: string
  icon: Component
  variant?: 'success' | 'info' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info'
})

const iconBgColor = computed(() => {
  switch (props.variant) {
    case 'success': return 'bg-green-900/30 border-green-500/30'
    case 'info': return 'bg-blue-900/30 border-blue-500/30'
    case 'warning': return 'bg-yellow-900/30 border-yellow-500/30'
    case 'danger': return 'bg-red-900/30 border-red-500/30'
    default: return 'bg-purple-900/30 border-purple-500/30'
  }
})

const iconTextColor = computed(() => {
  switch (props.variant) {
    case 'success': return 'text-green-400'
    case 'info': return 'text-blue-400'
    case 'warning': return 'text-yellow-400'
    case 'danger': return 'text-red-400'
    default: return 'text-purple-400'
  }
})

const iconShadowColor = computed(() => {
  switch (props.variant) {
    case 'success': return 'shadow-green-500/30'
    case 'info': return 'shadow-blue-500/30'
    case 'warning': return 'shadow-yellow-500/30'
    case 'danger': return 'shadow-red-500/30'
    default: return 'shadow-purple-500/30'
  }
})

defineEmits<{
  click: []
}>()
</script>
