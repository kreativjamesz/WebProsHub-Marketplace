<template>
  <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <!-- Floating Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.01)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
    </div>

    <!-- Header -->
    <div class="relative px-6 py-4 border-b border-purple-500/20">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-indigo-500 transition-all duration-300">
          {{ title }}
        </h2>
        <router-link
          :to="viewAllLink"
          class="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 hover:shadow-sm hover:shadow-purple-400/30"
        >
          View all
        </router-link>
      </div>
    </div>
    
    <!-- Content -->
    <div class="relative p-6">
      <slot />
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    <!-- Border Glow -->
    <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500 pointer-events-none group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  viewAllLink: string
}

defineProps<Props>()
</script>
