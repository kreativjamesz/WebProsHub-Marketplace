<template>
  <div
    :class="[
      'min-h-screen transition-all duration-500',
      isDarkTheme
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    ]"
  >
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          :class="[
            'animate-spin rounded-full h-32 w-32 border-b-2 mx-auto',
            isDarkTheme ? 'border-purple-400' : 'border-blue-600',
          ]"
        ></div>
        <p :class="['mt-4 text-lg', isDarkTheme ? 'text-gray-300' : 'text-gray-600']">
          Loading store details...
        </p>
      </div>
    </div>

    <!-- Store Details -->
    <div v-else-if="store" class="container mx-auto px-4 py-8">
      <!-- Store Header with Dynamic Theme -->
      <div
        :class="[
          'relative rounded-3xl overflow-hidden shadow-2xl mb-12',
          isDarkTheme
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800'
            : 'bg-gradient-to-br from-white via-gray-50 to-white',
        ]"
        :style="storeThemeStyles"
      >
        <!-- Hero Background -->
        <div class="relative h-96">
          <!-- Animated Background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-pulse"
          ></div>

          <!-- Store Banner -->
          <img
            v-if="store.banner"
            :src="store.banner"
            :alt="store.name"
            class="w-full h-full object-cover opacity-80"
          />

          <!-- Fallback Banner -->
          <div v-else class="w-full h-full flex items-center justify-center">
            <div
              :class="[
                'text-8xl font-black opacity-20',
                isDarkTheme ? 'text-white' : 'text-gray-800',
              ]"
            >
              {{ store.name.charAt(0) }}
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="absolute top-10 left-10 w-20 h-20 bg-purple-400/20 rounded-full animate-bounce"
            ></div>
            <div
              class="absolute top-20 right-20 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce"
              style="animation-delay: 0.5s"
            ></div>
            <div
              class="absolute bottom-20 left-20 w-12 h-12 bg-pink-400/20 rounded-full animate-bounce"
              style="animation-delay: 1s"
            ></div>
          </div>

          <!-- Store Info Overlay -->
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8"
          >
            <div class="flex items-end justify-between">
              <div class="space-y-4">
                <h1
                  :class="[
                    'text-5xl font-black leading-tight',
                    isDarkTheme ? 'text-white' : 'text-white',
                  ]"
                >
                  {{ store.name }}
                </h1>
                <p :class="['text-xl max-w-2xl', isDarkTheme ? 'text-gray-200' : 'text-gray-100']">
                  {{ store.description }}
                </p>

                <!-- Store Stats -->
                <div class="flex items-center space-x-6">
                  <div class="flex items-center space-x-2">
                    <div
                      :class="[
                        'w-3 h-3 rounded-full',
                        isDarkTheme ? 'bg-green-400' : 'bg-green-500',
                      ]"
                    ></div>
                    <span
                      :class="[
                        'text-sm font-medium',
                        isDarkTheme ? 'text-gray-300' : 'text-gray-200',
                      ]"
                      >{{ store.products?.length || 0 }} products</span
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <div
                      :class="['w-3 h-3 rounded-full', isDarkTheme ? 'bg-blue-400' : 'bg-blue-500']"
                    ></div>
                    <span
                      :class="[
                        'text-sm font-medium',
                        isDarkTheme ? 'text-gray-300' : 'text-gray-200',
                      ]"
                      >{{ store.seller?.isVerified ? 'Verified' : 'Unverified' }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Store Actions -->
              <div class="flex space-x-3">
                <button
                  @click="followStore"
                  :class="[
                    'px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
                    isDarkTheme
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-white hover:bg-gray-100 text-gray-800',
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    <span>Follow</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Store Meta Information -->
      <div
        :class="[
          'grid grid-cols-1 md:grid-cols-4 gap-6 mb-12',
          isDarkTheme ? 'text-white' : 'text-gray-800',
        ]"
      >
        <!-- Location -->
        <div
          :class="[
            'p-6 rounded-2xl border transition-all duration-300 hover:scale-105',
            isDarkTheme
              ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500'
              : 'bg-white border-gray-200 hover:border-purple-300 shadow-lg',
          ]"
        >
          <div class="flex items-center space-x-3">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                isDarkTheme ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600',
              ]"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p :class="['text-sm font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                Location
              </p>
              <p class="font-semibold">{{ store.city }}, {{ store.state }}</p>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div
          :class="[
            'p-6 rounded-2xl border transition-all duration-300 hover:scale-105',
            isDarkTheme
              ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500'
              : 'bg-white border-gray-200 hover:border-blue-300 shadow-lg',
          ]"
        >
          <div class="flex items-center space-x-3">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                isDarkTheme ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600',
              ]"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p :class="['text-sm font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                Phone
              </p>
              <p class="font-semibold">{{ store.phone || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div
          :class="[
            'p-6 rounded-2xl border transition-all duration-300 hover:scale-105',
            isDarkTheme
              ? 'bg-slate-800/50 border-slate-700 hover:border-green-500'
              : 'bg-white border-gray-200 hover:border-green-300 shadow-lg',
          ]"
        >
          <div class="flex items-center space-x-3">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                isDarkTheme ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600',
              ]"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p :class="['text-sm font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                Email
              </p>
              <p class="font-semibold">{{ store.email || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Joined Date -->
        <div
          :class="[
            'p-6 rounded-2xl border transition-all duration-300 hover:scale-105',
            isDarkTheme
              ? 'bg-slate-800/50 border-slate-700 hover:border-pink-500'
              : 'bg-white border-gray-200 hover:border-pink-300 shadow-lg',
          ]"
        >
          <div class="flex items-center space-x-3">
            <div
              :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center',
                isDarkTheme ? 'bg-pink-600/20 text-pink-400' : 'bg-pink-100 text-pink-600',
              ]"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p :class="['text-sm font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                Joined
              </p>
              <p class="font-semibold">{{ formatDate(new Date(store.createdAt)) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div
        :class="[
          'rounded-3xl border p-8 mb-12',
          isDarkTheme ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-xl',
        ]"
      >
        <div class="flex items-center justify-between mb-8">
          <h2 :class="['text-3xl font-bold', isDarkTheme ? 'text-white' : 'text-gray-900']">
            Products
          </h2>

          <!-- Advanced Filters -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                :class="[
                  'pl-10 pr-4 py-2 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2',
                  isDarkTheme
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-purple-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500',
                ]"
              />
              <svg
                class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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

            <!-- Sort -->
            <select
              v-model="sortBy"
              :class="[
                'px-4 py-2 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2',
                isDarkTheme
                  ? 'bg-slate-700 border-slate-600 text-white focus:ring-purple-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500',
              ]"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Sort by Rating</option>
              <option value="newest">Newest First</option>
            </select>

            <!-- View Toggle -->
            <div
              class="flex rounded-xl border overflow-hidden"
              :class="isDarkTheme ? 'border-slate-600' : 'border-gray-300'"
            >
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'px-4 py-2 transition-all duration-300',
                  viewMode === 'grid'
                    ? isDarkTheme
                      ? 'bg-purple-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkTheme
                      ? 'bg-slate-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600',
                ]"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'px-4 py-2 transition-all duration-300',
                  viewMode === 'list'
                    ? isDarkTheme
                      ? 'bg-purple-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkTheme
                      ? 'bg-slate-700 text-gray-300'
                      : 'bg-gray-100 text-gray-600',
                ]"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid/List -->
        <div v-if="filteredProducts.length > 0" class="space-y-6">
          <div
            :class="[
              'grid gap-6',
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1',
            ]"
          >
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
              :view-mode="viewMode"
              @view-product="navigateToProduct"
              @toggle-wishlist="toggleWishlist"
              @add-to-cart="addToCart"
            />
          </div>
        </div>

        <!-- Empty Products State -->
        <div v-else class="text-center py-16">
          <div
            :class="[
              'w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center',
              isDarkTheme ? 'bg-slate-700/50' : 'bg-gray-100',
            ]"
          >
            <svg
              :class="['w-12 h-12', isDarkTheme ? 'text-gray-400' : 'text-gray-400']"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3
            :class="['text-xl font-semibold mb-2', isDarkTheme ? 'text-gray-300' : 'text-gray-900']"
          >
            No products found
          </h3>
          <p :class="['text-lg', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
            {{
              searchQuery
                ? 'Try adjusting your search terms'
                : "This store hasn't added any products yet."
            }}
          </p>
        </div>
      </div>

      <!-- Store Information Tabs -->
      <div
        :class="[
          'rounded-3xl border overflow-hidden',
          isDarkTheme ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-xl',
        ]"
      >
        <!-- Tab Navigation -->
        <div :class="['border-b', isDarkTheme ? 'border-slate-700' : 'border-gray-200']">
          <nav class="flex space-x-8 px-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-6 px-1 border-b-2 font-medium text-sm transition-all duration-300',
                activeTab === tab.id
                  ? isDarkTheme
                    ? 'border-purple-400 text-purple-400'
                    : 'border-blue-500 text-blue-600'
                  : isDarkTheme
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-8">
          <!-- About Tab -->
          <div v-if="activeTab === 'about'" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Store Description -->
              <div>
                <h3
                  :class="[
                    'text-xl font-semibold mb-4',
                    isDarkTheme ? 'text-white' : 'text-gray-900',
                  ]"
                >
                  About {{ store.name }}
                </h3>
                <p
                  :class="[
                    'text-lg leading-relaxed',
                    isDarkTheme ? 'text-gray-300' : 'text-gray-600',
                  ]"
                >
                  {{ store.description }}
                </p>
              </div>

              <!-- Store Details -->
              <div :class="['p-6 rounded-2xl', isDarkTheme ? 'bg-slate-700/50' : 'bg-gray-50']">
                <h4
                  :class="[
                    'text-lg font-semibold mb-4',
                    isDarkTheme ? 'text-white' : 'text-gray-900',
                  ]"
                >
                  Store Information
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span :class="['font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-600']"
                      >Business Type:</span
                    >
                    <span
                      :class="['font-semibold', isDarkTheme ? 'text-white' : 'text-gray-900']"
                      >{{ store.seller?.businessType || 'N/A' }}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span :class="['font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-600']"
                      >Address:</span
                    >
                    <span
                      :class="[
                        'font-semibold text-right max-w-xs',
                        isDarkTheme ? 'text-white' : 'text-gray-900',
                      ]"
                      >{{ store.address }}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span :class="['font-medium', isDarkTheme ? 'text-gray-400' : 'text-gray-600']"
                      >Website:</span
                    >
                    <a
                      v-if="store.website"
                      :href="store.website"
                      target="_blank"
                      :class="[
                        'font-semibold hover:underline',
                        isDarkTheme ? 'text-purple-400' : 'text-blue-600',
                      ]"
                    >
                      Visit Website
                    </a>
                    <span
                      v-else
                      :class="['font-semibold', isDarkTheme ? 'text-gray-500' : 'text-gray-500']"
                      >N/A</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Opening Hours Tab -->
          <div v-if="activeTab === 'hours'" class="space-y-6">
            <h3
              :class="['text-xl font-semibold mb-6', isDarkTheme ? 'text-white' : 'text-gray-900']"
            >
              Opening Hours
            </h3>

            <div v-if="store.openingHours" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(hours, day) in store.openingHours"
                :key="day"
                :class="[
                  'p-4 rounded-xl border',
                  isDarkTheme ? 'border-slate-600' : 'border-gray-200',
                ]"
              >
                <div class="flex items-center justify-between">
                  <span
                    :class="[
                      'font-semibold capitalize',
                      isDarkTheme ? 'text-white' : 'text-gray-900',
                    ]"
                    >{{ day }}</span
                  >
                  <span
                    :class="[
                      'text-sm',
                      hours.open === 'closed'
                        ? isDarkTheme
                          ? 'text-red-400'
                          : 'text-red-600'
                        : isDarkTheme
                          ? 'text-gray-300'
                          : 'text-gray-600',
                    ]"
                  >
                    {{ hours.open === 'closed' ? 'Closed' : `${hours.open} - ${hours.close}` }}
                  </span>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8">
              <p :class="['text-lg', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                Opening hours not available
              </p>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'" class="space-y-6">
            <h3
              :class="['text-xl font-semibold mb-6', isDarkTheme ? 'text-white' : 'text-gray-900']"
            >
              Customer Reviews
            </h3>

            <div v-if="reviews.length > 0" class="space-y-6">
              <div
                v-for="review in reviews"
                :key="review.id"
                :class="[
                  'p-6 rounded-2xl border',
                  isDarkTheme ? 'border-slate-600 bg-slate-700/30' : 'border-gray-200 bg-gray-50',
                ]"
              >
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div
                      :class="[
                        'w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold',
                        isDarkTheme ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600',
                      ]"
                    >
                      {{ review.buyer?.name?.charAt(0) || 'U' }}
                    </div>
                    <div>
                      <p :class="['font-semibold', isDarkTheme ? 'text-white' : 'text-gray-900']">
                        {{ review.buyer?.name || 'Anonymous' }}
                      </p>
                      <p :class="['text-sm', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                        {{ formatDate(new Date(review.createdAt)) }}
                      </p>
                    </div>
                  </div>

                  <!-- Rating -->
                  <div class="flex items-center space-x-1">
                    <svg
                      v-for="star in 5"
                      :key="star"
                      :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-400'"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                </div>

                <p
                  v-if="review.comment"
                  :class="[
                    'text-lg leading-relaxed',
                    isDarkTheme ? 'text-gray-300' : 'text-gray-600',
                  ]"
                >
                  {{ review.comment }}
                </p>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <div
                :class="[
                  'w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center',
                  isDarkTheme ? 'bg-slate-700/50' : 'bg-gray-100',
                ]"
              >
                <svg
                  :class="['w-12 h-12', isDarkTheme ? 'text-gray-400' : 'text-gray-400']"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3
                :class="[
                  'text-xl font-semibold mb-2',
                  isDarkTheme ? 'text-gray-300' : 'text-gray-900',
                ]"
              >
                No reviews yet
              </h3>
              <p :class="['text-lg', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
                Be the first to review this store!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!loading && !store" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          :class="[
            'w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center',
            isDarkTheme ? 'bg-red-900/30' : 'bg-red-100',
          ]"
        >
          <svg
            :class="['w-12 h-12', isDarkTheme ? 'text-red-400' : 'text-red-600']"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 :class="['text-2xl font-bold mb-4', isDarkTheme ? 'text-red-400' : 'text-red-600']">
          Store not found
        </h3>
        <p :class="['text-lg mb-6', isDarkTheme ? 'text-gray-400' : 'text-gray-500']">
          The store you're looking for doesn't exist or has been removed.
        </p>
        <button
          @click="router.push('/stores')"
          :class="[
            'px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
            isDarkTheme
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white',
          ]"
        >
          Back to Stores
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { useCartStore } from '@/stores/cart'
import { useGuestCartStore } from '@/stores/guestCart'
import { useAuthStore } from '@/stores/auth'
import { apiService } from '@/services/api'
import type { Store, Product, Review, StoreTheme } from '@/types/marketplace'
import ProductCard from '@/components/marketplace/ProductCard.vue'

const router = useRouter()
const route = useRoute()

// Reactive data
const store = ref<Store | null>(null)
const products = ref<Product[]>([])
const reviews = ref<Review[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// UI State
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('name')
const searchQuery = ref('')
const activeTab = ref('about')

// Global theme from ColorThemeDropdown
const mode = useColorMode()
const isDarkTheme = computed(() => mode.value === 'dark')

// Tabs configuration
const tabs = [
  { id: 'about', name: 'About' },
  { id: 'hours', name: 'Opening Hours' },
  { id: 'reviews', name: 'Reviews' },
]

// Stores
const cartStore = useCartStore()
const guestCartStore = useGuestCartStore()
const authStore = useAuthStore()

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'price-low':
      return filtered.sort((a, b) => Number(a.price) - Number(b.price))
    case 'price-high':
      return filtered.sort((a, b) => Number(b.price) - Number(a.price))
    case 'rating':
      return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case 'newest':
      return filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    default:
      return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }
})

const storeThemeStyles = computed(() => {
  if (!store.value?.seller?.theme?.css) return {}

  try {
    // Parse and apply custom CSS from store theme
    const css = store.value.seller.theme.css
    return {
      '--store-primary-color': css.match(/--primary-color:\s*([^;]+)/)?.[1] || '#8b5cf6',
      '--store-secondary-color': css.match(/--secondary-color:\s*([^;]+)/)?.[1] || '#6366f1',
      '--store-accent-color': css.match(/--accent-color:\s*([^;]+)/)?.[1] || '#ec4899',
    }
  } catch (error) {
    console.warn('Failed to parse store theme CSS:', error)
    return {}
  }
})

// Methods
const followStore = () => {
  // TODO: Implement follow store functionality
  console.log('Following store:', store.value?.id)
}

const navigateToProduct = (productId: string) => {
  router.push(`/products/${productId}`)
}

const toggleWishlist = (productId: string) => {
  // TODO: Implement wishlist toggle
  console.log('Toggle wishlist for product:', productId)
}

const addToCart = (productId: string) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    if (authStore.isAuthenticated) {
      cartStore.addItem(product, 1)
    } else {
      guestCartStore.addItem(product, 1)
    }
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const loadStoreDetails = async () => {
  loading.value = true
  try {
    const storeId = route.params.id as string

    // Fetch store details
    const storeResponse = await apiService.marketplace.getStore(storeId)
    store.value = storeResponse.data.store

    // Fetch store products
    const productsResponse = await apiService.marketplace.getProductsByStore(storeId)
    products.value = productsResponse.data.products || []

    // TODO: Fetch store reviews when API is available
    // const reviewsResponse = await apiService.marketplace.getStoreReviews(storeId)
    // reviews.value = reviewsResponse.data.reviews || []
  } catch (err: any) {
    console.error('Error loading store details:', err)
    error.value = err.response?.data?.error || 'Failed to load store'
  } finally {
    loading.value = false
  }
}

// Load store details on mount
onMounted(() => {
  loadStoreDetails()
})

// Watch for route changes
watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      loadStoreDetails()
    }
  },
)
</script>

<style scoped>
/* Custom store theme variables */
:root {
  --store-primary-color: #8b5cf6;
  --store-secondary-color: #6366f1;
  --store-accent-color: #ec4899;
}

/* Animated background elements */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Smooth transitions */
* {
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow,
    transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
