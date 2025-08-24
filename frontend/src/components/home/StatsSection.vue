<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Props
interface Props {
  totalProducts: number
  totalStores: number
  totalCategories: number
}

const props = defineProps<Props>()

// Animation states
const animatedElements = ref<Set<string>>(new Set())
const statsVisible = ref(false)

// Theme-aware computed properties
const statsBackground = computed(() => {
  return themeStore.isLightMode
    ? 'bg-gradient-to-b from-white to-slate-50'
    : 'bg-gradient-to-b from-slate-900 to-slate-800'
})

// Stats data
const stats = [
  {
    value: props.totalProducts,
    label: 'Products Available',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    value: props.totalStores,
    label: 'Active Stores',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    value: props.totalCategories,
    label: 'Product Categories',
    icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  },
]

// Animation methods
const animateOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-animate-id')
          if (id) {
            animatedElements.value.add(id)
          }
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('[data-animate-id]').forEach((el) => {
    observer.observe(el)
  })
}

const startStatsAnimation = () => {
  statsVisible.value = true
}

// Lifecycle
onMounted(() => {
  animateOnScroll()

  // Start stats animation after a delay
  setTimeout(startStatsAnimation, 1000)
})
</script>

<template>
  <!-- Marketplace Stats with Animated Counters -->
  <div :class="['py-24 relative overflow-hidden', statsBackground]">
    <!-- Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
            background-size: 100px 100px;
          "
        ></div>
      </div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-4xl md:text-6xl font-bold mb-6',
            themeStore.isLightMode ? 'text-slate-800' : 'text-white',
            animatedElements.has('stats-title') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10',
          ]"
          data-animate-id="stats-title"
        >
          Zig by the
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
            >Numbers</span
          >
        </h2>
        <p
          :class="[
            'text-xl max-w-3xl mx-auto',
            themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300',
          ]"
        >
          Join thousands of satisfied customers and successful sellers in our growing community
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          :data-animate-id="`stat-${index}`"
          :class="[
            'transition-all duration-1000 ease-out transform',
            animatedElements.has(`stat-${index}`)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10',
          ]"
          :style="{ transitionDelay: `${index * 300}ms` }"
        >
          <div class="mb-6">
            <div
              class="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="stat.icon"
                />
              </svg>
            </div>
          </div>
          <div
            class="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4"
            :class="statsVisible ? 'animate-count-up' : ''"
          >
            {{ statsVisible ? stat.value : 0 }}
          </div>
          <p :class="['text-xl', themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300']">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes count-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-count-up {
  animation: count-up 0.8s ease-out forwards;
}
</style>
