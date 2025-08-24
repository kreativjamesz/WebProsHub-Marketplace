<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Animation states
const animatedElements = ref<Set<string>>(new Set())

// Theme-aware computed properties
const servicesBackground = computed(() => {
  return themeStore.isLightMode 
    ? 'bg-gradient-to-b from-slate-50 to-white'
    : 'bg-gradient-to-b from-slate-900 to-slate-800'
})

// Services data
const services = [
  {
    title: 'Local Discovery',
    description: 'Find amazing products from businesses in your area with our intelligent location-based search',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Trusted Quality',
    description: 'Verified sellers and quality products you can rely on with our comprehensive vetting system',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Fast & Secure',
    description: 'Quick delivery and secure payment processing with enterprise-grade security protocols',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    color: 'from-purple-500 to-pink-500'
  }
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

// Lifecycle
onMounted(() => {
  animateOnScroll()
})
</script>

<template>
  <!-- Services Showcase Section - Displays Platform Benefits & Value Props -->
  <div :class="['py-24 relative overflow-hidden', servicesBackground]">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%239C92AC fill-opacity=0.4%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2
          :class="[
            'text-4xl md:text-6xl font-bold mb-6',
            themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100',
            animatedElements.has('services-title')
              ? 'animate-fade-in-up'
              : 'opacity-100 translate-y-0'
          ]"
          data-animate-id="services-title"
        >
          Why Choose
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
            >Zig</span
          >?
        </h2>
        <p :class="['text-xl max-w-3xl mx-auto leading-relaxed', themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300']">
          Experience a creative marketplace designed to showcase unique talents and connect artists with art lovers
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          :data-animate-id="`service-${index}`"
          :class="[
            'group text-center transition-all duration-700 ease-out transform',
            animatedElements.has(`service-${index}`)
              ? 'opacity-100 translate-y-0'
              : 'opacity-100 translate-y-0',
          ]"
          :style="{ transitionDelay: `${index * 200}ms` }"
        >
          <div class="relative mb-8">
            <div
              class="w-24 h-24 mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full blur-xl"
                :class="service.color"
              ></div>
              <div
                class="relative w-full h-full bg-gradient-to-r rounded-full flex items-center justify-center shadow-2xl"
                :class="service.color"
              >
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="service.icon"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3
            :class="[
              'text-2xl font-bold mb-4 transition-colors duration-300',
              themeStore.isLightMode 
                ? 'text-slate-800 group-hover:text-slate-900' 
                : 'text-slate-100 group-hover:text-slate-50'
            ]"
          >
            {{ service.title }}
          </h3>
          <p
            :class="[
              'leading-relaxed transition-colors duration-300',
              themeStore.isLightMode 
                ? 'text-slate-600 group-hover:text-slate-700' 
                : 'text-slate-300 group-hover:text-slate-200'
            ]"
          >
            {{ service.description }}
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
</style>
