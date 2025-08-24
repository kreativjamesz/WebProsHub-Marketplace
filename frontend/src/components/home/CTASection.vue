<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Animation states
const animatedElements = ref<Set<string>>(new Set())

const ctaBackground = computed(() => {
  return themeStore.isLightMode
    ? 'bg-gradient-to-b from-slate-50 to-slate-100'
    : 'bg-gradient-to-b from-slate-800 via-slate-900 to-purple-950/10'
})

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
  <!-- Call to Action with Parallax -->
  <div class="py-24 relative overflow-hidden" :class="ctaBackground">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute inset-0"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.4%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "
      ></div>
    </div>

    <div class="container mx-auto px-4 text-center relative z-10">
      <h2
        class="text-4xl md:text-6xl font-bold mb-6"
        :class="[
          themeStore.isLightMode ? 'text-slate-800' : 'text-slate-100',
          animatedElements.has('cta-title') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10',
        ]"
        data-animate-id="cta-title"
      >
        Ready to Start
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
          >Selling</span
        >?
      </h2>
      <p
        :class="[
          'text-xl mb-12 max-w-3xl mx-auto leading-relaxed',
          themeStore.isLightMode ? 'text-slate-600' : 'text-slate-300',
        ]"
      >
        Join thousands of successful creators on Zig and grow your creative business with our
        powerful marketplace platform. Start your journey to success today.
      </p>
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <router-link
          to="/register"
          :class="[
            'group relative px-12 py-5 rounded-full font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl',
            themeStore.isLightMode
              ? 'bg-slate-800 text-white hover:bg-slate-900'
              : 'bg-white text-slate-900 hover:bg-slate-100',
          ]"
        >
          <span class="relative z-10">Create Store</span>
        </router-link>

        <router-link
          to="/seller/guide"
          :class="[
            'group px-12 py-5 border-2 rounded-full font-bold text-xl backdrop-blur-sm transition-all duration-300 hover:scale-105',
            themeStore.isLightMode
              ? 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
              : 'border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500',
          ]"
        >
          <span class="relative z-10">Learn More</span>
        </router-link>
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
