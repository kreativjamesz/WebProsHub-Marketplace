<template>
  <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2">
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
      <div class="flex items-center">
        <!-- Icon Container -->
        <div class="flex-shrink-0">
          <div :class="`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${iconShadowColor} border border-current/30`">
            <component :is="icon" :class="`w-6 h-6 ${iconTextColor}`" />
          </div>
        </div>
        
        <!-- Stats Info -->
        <div class="ml-4 flex-1">
          <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {{ title }}
          </p>
          <p class="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-indigo-500 transition-all duration-300">
            {{ formatValue(value) }}
          </p>
          <p :class="`text-sm ${growthColor} group-hover:brightness-110 transition-all duration-300`">
            {{ growthText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    <!-- Border Glow -->
    <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500 pointer-events-none group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  title: string
  value: string | number
  growth: number
  growthText: string
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

const growthColor = computed(() => {
  if (props.growth >= 0) return 'text-green-500'
  return 'text-red-500'
})

const formatValue = (value: string | number) => {
  if (typeof value === 'number') {
    if (value >= 1000000) {
      return `₱${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `₱${(value / 1000).toFixed(1)}K`
    }
    return `₱${value.toLocaleString()}`
  }
  return value
}
</script>
