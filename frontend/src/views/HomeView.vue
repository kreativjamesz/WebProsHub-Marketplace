<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import SafeImage from '@/components/ui/SafeImage.vue'
import { useMarketplaceStore } from '@/stores/marketplace'

const router = useRouter()
const marketplaceStore = useMarketplaceStore()

// State
const featuredProducts = ref<any[]>([])
const loading = ref({
  categories: false,
  products: false,
})

// Animation states
const animatedElements = ref<Set<string>>(new Set())
const heroVisible = ref(false)
const statsVisible = ref(false)

// Computed properties for real data
const featuredCategories = computed(() => {
  return marketplaceStore.mainCategories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.image || '/category-placeholder.jpg',
    productCount: marketplaceStore.getProductsByMainCategory(cat.id).length,
    description: cat.description,
  }))
})

const totalProducts = computed(() => marketplaceStore.products.length)
const totalStores = computed(() => marketplaceStore.stores.length)

// Methods
const navigateToCategory = (categoryId: number) => {
  router.push(`/marketplace?mainCategory=${categoryId}`)
}

const viewProduct = (productId: string) => {
  router.push(`/marketplace/products/${productId}`)
}

const toggleWishlist = (productId: string) => {
  // TODO: Implement wishlist toggle
  toast.success('Added to wishlist!')
}

const addToCart = (productId: string) => {
  // TODO: Implement add to cart
  toast.success('Added to cart!')
}

const isInWishlist = (productId: string) => {
  // TODO: Check if product is in wishlist
  return false
}

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

const startHeroAnimation = async () => {
  await nextTick()
  heroVisible.value = true
}

const startStatsAnimation = () => {
  statsVisible.value = true
}

// Load data from database
const loadHomeData = async () => {
  try {
    loading.value.categories = true
    loading.value.products = true

    // Load categories and products in parallel
    await Promise.all([
      marketplaceStore.fetchCategories(),
      marketplaceStore.fetchProducts({ limit: 8, featured: true }),
    ])

    // Get featured products
    featuredProducts.value = marketplaceStore.products.slice(0, 8)
  } catch (error) {
    console.error('Error loading home data:', error)
    toast.error('Failed to load homepage data')
  } finally {
    loading.value.categories = false
    loading.value.products = false
  }
}

// Lifecycle
onMounted(async () => {
  await loadHomeData()
  await startHeroAnimation()
  animateOnScroll()

  // Start stats animation after a delay
  setTimeout(startStatsAnimation, 1000)
})
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <!-- Hero Section with Parallax -->
    <div class="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <!-- Floating Particles -->
        <div class="absolute inset-0">
          <div
            v-for="i in 50"
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
      <div class="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
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
           <p class="text-2xl md:text-3xl mb-8 opacity-90 font-light">
             Where <span class="text-cyan-300 font-semibold">Creativity</span> Meets Commerce
           </p>
           
           <!-- Description -->
           <p class="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
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
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Features Section with 3D Cards -->
    <div class="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
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
            class="text-4xl md:text-6xl font-bold text-slate-800 mb-6"
            data-animate-id="features-title"
            :class="
              animatedElements.has('features-title')
                ? 'animate-fade-in-up'
                : 'opacity-0 translate-y-10'
            "
          >
            Why Choose
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
              >Zig</span
            >?
          </h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience a creative marketplace designed to showcase unique talents and connect artists with art lovers
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in [
              {
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Local Discovery',
                description:
                  'Find amazing products from businesses in your area with our intelligent location-based search',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Trusted Quality',
                description:
                  'Verified sellers and quality products you can rely on with our comprehensive vetting system',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Fast & Secure',
                description:
                  'Quick delivery and secure payment processing with enterprise-grade security protocols',
                color: 'from-purple-500 to-pink-500',
              },
            ]"
            :key="index"
            :data-animate-id="`feature-${index}`"
            :class="[
              'group text-center transition-all duration-700 ease-out transform',
              animatedElements.has(`feature-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10',
            ]"
            :style="{ transitionDelay: `${index * 200}ms` }"
          >
            <div class="relative mb-8">
              <div
                class="w-24 h-24 mx-auto mb-6 relative group-hover:scale-110 transition-transform duration-300"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full blur-xl"
                  :class="feature.color"
                ></div>
                <div
                  class="relative w-full h-full bg-gradient-to-r rounded-full flex items-center justify-center shadow-2xl"
                  :class="feature.color"
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
                      :d="feature.icon"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h3
              class="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300"
            >
              {{ feature.title }}
            </h3>
            <p
              class="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300"
            >
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories with Hover Effects -->
    <div
      class="py-24 bg-gradient-to-br from-slate-100 via-purple-50 to-cyan-50 relative overflow-hidden"
    >
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-6xl font-bold text-slate-800 mb-6"
            data-animate-id="categories-title"
            :class="
              animatedElements.has('categories-title')
                ? 'animate-fade-in-up'
                : 'opacity-0 translate-y-10'
            "
          >
            Shop by
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600"
              >Category</span
            >
          </h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our curated collection of product categories, each designed to enhance your
            shopping experience
          </p>
        </div>

        <!-- Loading state for categories -->
        <div v-if="loading.categories" class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center animate-pulse"
          >
            <div class="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-6"></div>
            <div class="h-6 bg-slate-200 rounded mb-3"></div>
            <div class="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>

        <!-- Real categories from database -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="(category, index) in featuredCategories"
            :key="category.id"
            :data-animate-id="`category-${index}`"
            :class="[
              'group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl hover:bg-white/90',
              animatedElements.has(`category-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10',
            ]"
            :style="{ transitionDelay: `${index * 150}ms` }"
            @click="navigateToCategory(category.id)"
          >
            <div class="relative mb-6">
              <div
                class="w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300"
              >
                <SafeImage
                  :src="category.icon"
                  :alt="category.name"
                  class="w-full h-full rounded-2xl object-cover shadow-lg"
                  fallback="/zig-logo.svg"
                />
              </div>
              <div
                class="absolute -inset-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
              ></div>
            </div>
            <h3
              class="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300"
            >
              {{ category.name }}
            </h3>
            <p class="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
              {{ category.productCount }} products
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products with Modern Cards -->
    <div class="py-24 bg-white relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex items-center justify-between mb-16">
          <div>
            <h2
              class="text-4xl md:text-6xl font-bold text-slate-800 mb-4"
              data-animate-id="products-title"
              :class="
                animatedElements.has('products-title')
                  ? 'animate-fade-in-up'
                  : 'opacity-0 translate-y-10'
              "
            >
              Featured
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
                >Products</span
              >
            </h2>
            <p class="text-xl text-slate-600 max-w-2xl">
              Handpicked products from our top sellers, curated for exceptional quality and value
            </p>
          </div>
          <router-link
            to="/marketplace"
            class="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span class="relative z-10">View All</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            ></div>
          </router-link>
        </div>

        <!-- Loading state for products -->
        <div v-if="loading.products" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-white rounded-2xl shadow-lg border border-slate-100 animate-pulse overflow-hidden"
          >
            <div class="w-full h-64 bg-slate-200"></div>
            <div class="p-6">
              <div class="h-6 bg-slate-200 rounded mb-3"></div>
              <div class="h-4 bg-slate-200 rounded mb-4"></div>
              <div class="h-12 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Real products from database -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(product, index) in featuredProducts"
            :key="product.id"
            :data-animate-id="`product-${index}`"
            :class="[
              'group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 cursor-pointer border border-slate-100 overflow-hidden',
              animatedElements.has(`product-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10',
            ]"
            :style="{ transitionDelay: `${index * 100}ms` }"
            @click="viewProduct(product.id)"
          >
            <div class="relative overflow-hidden">
              <SafeImage
                :src="product.images?.[0] || '/webproshub-logo.svg'"
                :alt="product.name"
                class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                 fallback="/zig-logo.svg"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <!-- Wishlist Button -->
              <div class="absolute top-4 right-4">
                <button
                  @click.stop="toggleWishlist(product.id)"
                  :class="isInWishlist(product.id) ? 'text-red-500' : 'text-white'"
                  class="p-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="p-6">
              <h3
                class="font-bold text-slate-800 mb-3 text-lg line-clamp-2 group-hover:text-slate-900 transition-colors duration-300"
              >
                {{ product.name }}
              </h3>

              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
                >
                  ₱{{ Number(product.price).toFixed(2) }}
                </span>
                <div class="flex items-center space-x-1">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    :class="star <= 4 ? 'text-yellow-400' : 'text-slate-300'"
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span class="text-sm text-slate-500">({{ product.reviews?.length || 0 }})</span>
                </div>
              </div>

              <div
                class="text-sm text-slate-600 mb-6 group-hover:text-slate-700 transition-colors duration-300"
              >
                {{ product.store?.name || 'Store' }}
              </div>

              <button
                @click.stop="addToCart(product.id)"
                class="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- No products message -->
        <div v-if="!loading.products && featuredProducts.length === 0" class="text-center py-16">
          <div
            class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p class="text-slate-500 text-xl">No featured products available at the moment.</p>
        </div>
      </div>
    </div>

    <!-- Marketplace Stats with Animated Counters -->
    <div
      class="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
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
            class="text-4xl md:text-6xl font-bold text-white mb-6"
            data-animate-id="stats-title"
            :class="
              animatedElements.has('stats-title')
                ? 'animate-fade-in-up'
                : 'opacity-0 translate-y-10'
            "
          >
                         Zig by the
             <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
               >Numbers</span
             >
          </h2>
          <p class="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers and successful sellers in our growing community
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div
            v-for="(stat, index) in [
              {
                value: totalProducts,
                label: 'Products Available',
                icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
              },
              {
                value: totalStores,
                label: 'Active Stores',
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
              },
              {
                value: featuredCategories.length,
                label: 'Product Categories',
                icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
              },
            ]"
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
            <p class="text-xl text-slate-300">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action with Parallax -->
    <div
      class="py-24 bg-gradient-to-br from-cyan-600 via-purple-600 to-purple-800 relative overflow-hidden"
    >
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
          class="text-4xl md:text-6xl font-bold text-white mb-6"
          data-animate-id="cta-title"
          :class="
            animatedElements.has('cta-title') ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          "
        >
          Ready to Start
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300"
            >Selling</span
          >?
        </h2>
        <p class="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                     Join thousands of successful creators on Zig and grow your creative business with our
           powerful marketplace platform. Start your journey to success today.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <router-link
            to="/register"
            class="group relative px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span class="relative z-10">Create Store</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            ></div>
          </router-link>

          <router-link
            to="/seller/guide"
            class="group px-12 py-5 border-2 border-white/30 text-white rounded-full font-bold text-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50"
          >
            <span class="relative z-10">Learn More</span>
          </router-link>
        </div>
      </div>
    </div>
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

/* Animation Classes */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-count-up {
  animation: count-up 0.8s ease-out forwards;
}

/* Line Clamp Utility */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #0891b2, #7c3aed);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Performance Optimizations */
* {
  will-change: transform;
}

/* Hover Effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Backdrop Blur Support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
}
</style>
