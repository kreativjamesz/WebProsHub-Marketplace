<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()

// Animation states
const heroVisible = ref(false)

// Theme-aware computed properties
const heroBackground = computed(() => {
  return themeStore.isLightMode
    ? 'bg-gradient-to-b from-slate-50 to-slate-100'
    : 'bg-gradient-to-b from-slate-900 to-slate-800'
})

const heroTextColor = computed(() => {
  return themeStore.isLightMode ? 'text-slate-800' : 'text-white'
})

const heroSubtitleColor = computed(() => {
  return themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300'
})

// Animation methods
const startHeroAnimation = async () => {
  await nextTick()
  heroVisible.value = true
}

// Lifecycle
onMounted(async () => {
  await startHeroAnimation()
})
</script>

<template>
  <!-- Hero Section with Parallax -->
  <div class="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
    <!-- Animated Background -->
    <div :class="['absolute inset-0', heroBackground]">
      <!-- Floating Grid Pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(147,51,234,0.03)_50%,transparent_100%)] opacity-30"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(147,51,234,0.02)_50%,transparent_100%)] opacity-20"
      ></div>

      <!-- Floating Particles -->
      <div
        class="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"
      ></div>
      <div
        class="absolute top-40 right-32 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40 animate-pulse delay-1000"
      ></div>
      <div
        class="absolute bottom-32 left-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse delay-2000"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-30 animate-pulse delay-1500"
      ></div>

      <!-- Additional Floating Particles -->
      <div class="absolute inset-0">
        <div
          v-for="i in 30"
          :key="`particle-${i}`"
          class="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }"
        ></div>
      </div>

      <!-- Animated Grid -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
            background-size: 50px 50px;
          "
        ></div>
      </div>
    </div>

    <!-- Hero Content -->
    <div :class="['relative z-10 text-center max-w-6xl mx-auto px-4', heroTextColor]">
      <div
        class="transition-all duration-1000 ease-out"
        :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <!-- Logo Animation -->
        <div class="mb-8">
          <div
            class="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
          >
            <img src="/zig-logo.svg" alt="Zig" class="w-24 h-24" />
          </div>
        </div>

        <!-- Main Heading -->
        <h1
          class="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent"
        >
          Zig
        </h1>

        <!-- Subtitle -->
        <p :class="['text-2xl md:text-3xl mb-8 opacity-90 font-light', heroSubtitleColor]">
          Where <span class="text-cyan-300 font-semibold">Creativity</span> Meets Commerce
        </p>

        <!-- Description -->
        <p
          :class="[
            'text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed',
            heroSubtitleColor,
          ]"
        >
          Discover unique creations from talented artists, designers, and makers. A marketplace
          where every product tells a story and every creator finds their audience.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <router-link
            to="/marketplace"
            class="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span class="relative z-10">Start Shopping</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
              class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            ></div>
          </router-link>

          <router-link
            to="/register"
            class="group px-10 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50"
          >
            <span class="relative z-10">Become a Seller</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div
        :class="[
          'w-6 h-10 border-2 rounded-full flex justify-center',
          themeStore.isLightMode ? 'border-slate-400/30' : 'border-white/30',
        ]"
      >
        <div
          :class="[
            'w-1 h-3 rounded-full mt-2 animate-pulse',
            themeStore.isLightMode ? 'bg-slate-600' : 'bg-white/60',
          ]"
        ></div>
      </div>
    </div>

    <!-- Bottom Glow Effect -->
    <div
      :class="[
        'absolute bottom-0 left-0 right-0 h-32',
        themeStore.isLightMode
          ? 'bg-gradient-to-t from-slate-100 via-transparent to-transparent'
          : 'bg-gradient-to-t from-slate-900 via-transparent to-transparent',
      ]"
    ></div>
  </div>
</template>

<style scoped>
/* Custom Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
