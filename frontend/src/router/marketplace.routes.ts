import type { RouteRecordRaw } from 'vue-router'

export const marketplaceRoutes: RouteRecordRaw[] = [
  {
    path: '/marketplace',
    name: 'marketplace',
    component: () => import('@/views/marketplace/MarketplaceView.vue'),
    meta: { title: 'Marketplace - WebProsHubMarketplace' }
  },
  {
    path: '/stores',
    name: 'stores',
    component: () => import('@/views/marketplace/StoresView.vue'),
    meta: { title: 'Stores - WebProsHubMarketplace' }
  },
  {
    path: '/stores/:id',
    name: 'store-detail',
    component: () => import('@/views/marketplace/StoreDetailView.vue'),
    meta: { title: 'Store Details - WebProsHubMarketplace' }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/marketplace/CategoriesView.vue'),
    meta: { title: 'Categories - WebProsHubMarketplace' }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('@/views/marketplace/ProductDetailView.vue'),
    meta: { title: 'Product Details - WebProsHubMarketplace' }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/marketplace/SearchView.vue'),
    meta: { title: 'Search Results - WebProsHubMarketplace' }
  }
]
