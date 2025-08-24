import type { RouteRecordRaw } from 'vue-router'
import { requireAuth } from '@/router/guards'

export const generalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { 
      title: 'Home - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { 
      title: 'About - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/tailwind-test',
    name: 'tailwind-test',
    component: () => import('@/components/TailwindTest.vue'),
    meta: { 
      title: 'Tailwind CSS Test - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    beforeEnter: requireAuth,
    meta: { 
      requiresAuth: true, 
      title: 'Profile - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
    beforeEnter: requireAuth,
    meta: { 
      requiresAuth: true, 
      title: 'Settings - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { 
      title: 'Contact Us - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/HelpView.vue'),
    meta: { 
      title: 'Help & Support - WebProsHubMarketplace',
      layout: 'default'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { 
      title: 'Page Not Found - WebProsHubMarketplace',
      layout: 'default'
    }
  }
]
