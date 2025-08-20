<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

// Import toast styles
import 'vue3-toastify/dist/index.css'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.checkAuth()
})
</script>

<template>
  <div id="app">
    <!-- Toast notifications -->
    <ToastContainer />

    <!-- Loading overlay -->
    <div v-if="!authStore.isInitialized" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading WebProsHubMarketplace...</p>
      </div>
    </div>

    <!-- Main app -->
    <div v-else>
      <!-- Navigation Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="main-content">
        <router-view />
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8fafc;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Main content */
.main-content {
  flex: 1;
  min-height: calc(100vh - 80px - 200px); /* Adjust based on header/footer height */
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover {
  background-color: #059669;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn-outline:hover {
  background-color: #f9fafb;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Form styles */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-error {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Card styles */
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

/* Grid system */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }

  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4,
  .grid-cols-5,
  .grid-cols-6 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .grid-cols-4,
  .grid-cols-5,
  .grid-cols-6 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
