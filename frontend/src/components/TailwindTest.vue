<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">
        Tailwind CSS Test Component
      </h1>
      
      <!-- Color Palette -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Color Palette</h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="bg-primary-500 text-white p-4 rounded-lg text-center">
            Primary 500
          </div>
          <div class="bg-secondary-500 text-white p-4 rounded-lg text-center">
            Secondary 500
          </div>
          <div class="bg-green-500 text-white p-4 rounded-lg text-center">
            Green 500
          </div>
          <div class="bg-red-500 text-white p-4 rounded-lg text-center">
            Red 500
          </div>
          <div class="bg-yellow-500 text-white p-4 rounded-lg text-center">
            Yellow 500
          </div>
        </div>
      </div>
      
      <!-- Buttons -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Buttons</h2>
        <div class="flex flex-wrap gap-4">
          <button class="btn-primary">Primary Button</button>
          <button class="btn-secondary">Secondary Button</button>
          <button class="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            Success Button
          </button>
        </div>
      </div>
      
      <!-- Cards -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Cards</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="text-xl font-semibold mb-2">Card 1</h3>
            <p class="text-gray-600">This is a sample card with some content.</p>
          </div>
          <div class="card">
            <h3 class="text-xl font-semibold mb-2">Card 2</h3>
            <p class="text-gray-600">Another sample card with different content.</p>
          </div>
          <div class="card">
            <h3 class="text-xl font-semibold mb-2">Card 3</h3>
            <p class="text-gray-600">Third sample card for demonstration.</p>
          </div>
        </div>
      </div>
      
      <!-- Animations -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Animations</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="animate-fade-in bg-blue-100 p-6 rounded-lg">
            <p class="text-center">Fade In Animation</p>
          </div>
          <div class="animate-slide-up bg-green-100 p-6 rounded-lg">
            <p class="text-center">Slide Up Animation</p>
          </div>
          <div class="animate-bounce-gentle bg-purple-100 p-6 rounded-lg">
            <p class="text-center">Bounce Animation</p>
          </div>
        </div>
      </div>
      
      <!-- Responsive Grid -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Responsive Grid</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-gray-200 p-4 rounded-lg text-center">1</div>
          <div class="bg-gray-200 p-4 rounded-lg text-center">2</div>
          <div class="bg-gray-200 p-4 rounded-lg text-center">3</div>
          <div class="bg-gray-200 p-4 rounded-lg text-center">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this test component
</script>
