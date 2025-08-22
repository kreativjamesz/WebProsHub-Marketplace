<template>
  <div class="min-h-screen bg-accent">
    <!-- Hero Section -->
    <div class="bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">Help & Support</h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
            Find answers to your questions and get the support you need to make the most of our
            marketplace.
          </p>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="py-12 bg-accent">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-foreground mb-4">How can we help you?</h2>
          <p class="text-muted-foreground">Search our knowledge base for quick answers</p>
        </div>

        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for help articles, guides, or topics..."
            class="w-full px-4 py-3 pl-12 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-lg"
          />
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              class="h-6 w-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
    </div>

    <!-- Quick Help Categories -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-foreground text-center mb-12">Quick Help Categories</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="category in helpCategories"
            :key="category.id"
            class="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="selectCategory(category)"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg
                  class="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="category.icon"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-foreground">{{ category.title }}</h3>
            </div>
            <p class="text-muted-foreground mb-4">{{ category.description }}</p>
            <div class="text-sm text-primary font-medium">Browse articles →</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Help Topics -->
    <div class="py-16 bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-foreground text-center mb-12">Popular Help Topics</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div
              v-for="topic in popularTopics.slice(0, 5)"
              :key="topic.id"
              class="border-b border-border pb-4"
            >
              <h3 class="text-lg font-medium text-foreground mb-2">{{ topic.title }}</h3>
              <p class="text-muted-foreground mb-3">{{ topic.excerpt }}</p>
              <div class="flex items-center text-sm text-muted-foreground">
                <span>{{ topic.views }} views</span>
                <span class="mx-2">•</span>
                <span>{{ topic.category }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div
              v-for="topic in popularTopics.slice(5, 10)"
              :key="topic.id"
              class="border-b border-border pb-4"
            >
              <h3 class="text-lg font-medium text-foreground mb-2">{{ topic.title }}</h3>
              <p class="text-muted-foreground mb-3">{{ topic.excerpt }}</p>
              <div class="flex items-center text-sm text-muted-foreground">
                <span>{{ topic.views }} views</span>
                <span class="mx-2">•</span>
                <span>{{ topic.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step-by-Step Guides -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-foreground text-center mb-12">Step-by-Step Guides</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="guide in stepByStepGuides"
            :key="guide.id"
            class="bg-card rounded-lg shadow-md overflow-hidden"
          >
            <div class="p-6">
              <h3 class="text-xl font-medium text-foreground mb-3">{{ guide.title }}</h3>
              <p class="text-muted-foreground mb-4">{{ guide.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">{{ guide.steps }} steps</span>
                <button class="text-primary hover:text-primary/80 font-medium">Read Guide →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Tutorials -->
    <div class="py-16 bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-foreground text-center mb-12">Video Tutorials</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="video in videoTutorials"
            :key="video.id"
            class="bg-card rounded-lg shadow-md overflow-hidden"
          >
            <div class="aspect-w-16 aspect-h-9 bg-muted">
              <div class="flex items-center justify-center h-48">
                <div class="text-center">
                  <svg
                    class="w-16 h-16 text-muted-foreground mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-muted-foreground">Video thumbnail</p>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-medium text-foreground mb-2">{{ video.title }}</h3>
              <p class="text-muted-foreground mb-3">{{ video.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">{{ video.duration }}</span>
                <button class="text-primary hover:text-primary/80 font-medium">
                  Watch Video →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Support -->
    <div class="py-16 bg-accent">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-foreground mb-6">Still Need Help?</h2>
        <p class="text-lg text-muted-foreground mb-8">
          Can't find what you're looking for? Our support team is here to help you.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/contact"
            class="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            Contact Support
          </router-link>
          <button
            class="px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-accent transition-colors duration-200"
          >
            Live Chat
          </button>
        </div>

        <div class="mt-8 text-sm text-muted-foreground">
          <p>Average response time: 2-4 hours</p>
          <p>Available Monday - Friday, 9:00 AM - 6:00 PM (PHT)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Search query
const searchQuery = ref('')

// Help categories
const helpCategories = ref([
  {
    id: '1',
    title: 'Getting Started',
    description: 'Learn the basics of using our marketplace platform',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    id: '2',
    title: 'Buying & Shopping',
    description: 'Everything you need to know about making purchases',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
  {
    id: '3',
    title: 'Selling & Business',
    description: 'Guidance for sellers and business owners',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    id: '4',
    title: 'Account & Security',
    description: 'Manage your account settings and security',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    id: '5',
    title: 'Payment & Billing',
    description: 'Information about payment methods and billing',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
  },
  {
    id: '6',
    title: 'Shipping & Delivery',
    description: 'Learn about shipping options and delivery times',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
])

// Popular help topics
const popularTopics = ref([
  {
    id: '1',
    title: 'How to create your first listing',
    excerpt: 'Step-by-step guide to creating your first product listing as a seller',
    views: 1247,
    category: 'Selling',
  },
  {
    id: '2',
    title: 'Understanding payment processing',
    excerpt: "Learn how payments are processed and when you'll receive your funds",
    views: 892,
    category: 'Payments',
  },
  {
    id: '3',
    title: 'Setting up your store profile',
    excerpt: 'Complete guide to setting up your store profile and branding',
    views: 756,
    category: 'Selling',
  },
  {
    id: '4',
    title: 'Managing your orders efficiently',
    excerpt: 'Best practices for managing and fulfilling customer orders',
    views: 634,
    category: 'Orders',
  },
  {
    id: '5',
    title: 'Security best practices',
    excerpt: 'Keep your account and business information secure',
    views: 589,
    category: 'Security',
  },
  {
    id: '6',
    title: 'Understanding shipping rates',
    excerpt: 'How shipping rates are calculated and applied to orders',
    views: 523,
    category: 'Shipping',
  },
  {
    id: '7',
    title: 'Customer service guidelines',
    excerpt: 'Best practices for providing excellent customer service',
    views: 478,
    category: 'Service',
  },
  {
    id: '8',
    title: 'Tax and compliance information',
    excerpt: 'Important information about taxes and business compliance',
    views: 445,
    category: 'Business',
  },
  {
    id: '9',
    title: 'Mobile app features',
    excerpt: 'Complete guide to using our mobile app features',
    views: 412,
    category: 'Mobile',
  },
  {
    id: '10',
    title: 'Troubleshooting common issues',
    excerpt: 'Solutions to frequently encountered problems',
    views: 389,
    category: 'Support',
  },
])

// Step-by-step guides
const stepByStepGuides = ref([
  {
    id: '1',
    title: 'Complete Seller Setup',
    description: 'From registration to your first sale - everything you need to know',
    steps: 12,
  },
  {
    id: '2',
    title: 'Product Photography Guide',
    description: 'Learn how to take professional product photos that sell',
    steps: 8,
  },
  {
    id: '3',
    title: 'Customer Service Excellence',
    description: 'Build a loyal customer base through exceptional service',
    steps: 10,
  },
  {
    id: '4',
    title: 'Marketing Your Store',
    description: 'Effective strategies to promote your store and products',
    steps: 15,
  },
  {
    id: '5',
    title: 'Inventory Management',
    description: 'Keep your inventory organized and up-to-date',
    steps: 7,
  },
  {
    id: '6',
    title: 'Analytics and Reporting',
    description: 'Understand your business performance with detailed analytics',
    steps: 9,
  },
])

// Video tutorials
const videoTutorials = ref([
  {
    id: '1',
    title: 'Getting Started with WebProsHub',
    description: 'Complete walkthrough of the platform for new users',
    duration: '15:30',
  },
  {
    id: '2',
    title: 'Creating Compelling Product Listings',
    description: 'Tips and tricks for writing product descriptions that convert',
    duration: '12:45',
  },
  {
    id: '3',
    title: 'Managing Your Store Dashboard',
    description: 'Navigate and use your seller dashboard effectively',
    duration: '18:20',
  },
  {
    id: '4',
    title: 'Customer Communication Best Practices',
    description: 'How to communicate professionally with your customers',
    duration: '14:15',
  },
  {
    id: '5',
    title: 'Understanding Analytics and Reports',
    description: 'Make data-driven decisions with your business analytics',
    duration: '22:10',
  },
  {
    id: '6',
    title: 'Mobile App Walkthrough',
    description: 'Complete guide to using our mobile app features',
    duration: '16:35',
  },
])

// Computed properties
const filteredTopics = computed(() => {
  if (!searchQuery.value) return popularTopics.value

  return popularTopics.value.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      topic.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Methods
const selectCategory = (category: any) => {
  // TODO: Navigate to category-specific help page
  console.log('Selected category:', category.title)
}

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'Help & Support - WebProsHub Marketplace'
})
</script>
