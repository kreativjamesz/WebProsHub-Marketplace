<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold text-center mb-8">WebProsHub Logo Variants</h1>
    
    <!-- Icon Only Variant -->
    <div class="demo-section">
      <h2 class="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">1. Icon Only</h2>
      <div class="demo-item">
        <AppLogo variant="icon-only" />
        <code class="text-sm text-slate-600 dark:text-slate-400">variant="icon-only"</code>
      </div>
    </div>
    
    <!-- Icon Title Variant -->
    <div class="demo-section">
      <h2 class="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">2. Icon + Title</h2>
      <div class="demo-item">
        <AppLogo variant="icon-title" />
        <code class="text-sm text-slate-600 dark:text-slate-400">variant="icon-title"</code>
      </div>
    </div>
    
    <!-- Icon Stacked Variant -->
    <div class="demo-section">
      <h2 class="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">3. Icon + Title + Marketplace</h2>
      <div class="demo-item">
        <AppLogo variant="icon-stacked" />
        <code class="text-sm text-slate-600 dark:text-slate-400">variant="icon-stacked"</code>
      </div>
    </div>
    
    <!-- Default Variant -->
    <div class="demo-section">
      <h2 class="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">4. Default (Icon + Title)</h2>
      <div class="demo-item">
        <AppLogo />
        <code class="text-sm text-slate-600 dark:text-slate-400">No variant prop (defaults to icon-title)</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from './AppLogo.vue'
</script>

<style scoped>
.demo-section {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  background: #f8fafc;
}

.dark .demo-section {
  border-color: #334155;
  background: #1e293b;
}

.demo-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.dark .demo-item {
  background: #334155;
  border-color: #475569;
}
</style>
