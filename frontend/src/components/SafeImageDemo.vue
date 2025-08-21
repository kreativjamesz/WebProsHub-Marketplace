<template>
  <div class="safe-image-demo">
    <h2 class="demo-title">SafeImage Component Demo</h2>
    
    <div class="demo-section">
      <h3>Working Image</h3>
      <SafeImage
        src="https://picsum.photos/300/200"
        alt="Working image"
        class="demo-image"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>
    
    <div class="demo-section">
      <h3>Broken Image (Shows Fallback)</h3>
      <SafeImage
        src="https://invalid-url-that-will-fail.com/image.jpg"
        alt="Broken image"
        class="demo-image"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>
    
    <div class="demo-section">
      <h3>Empty Source (Shows Fallback)</h3>
      <SafeImage
        src=""
        alt="Empty source"
        class="demo-image"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>
    
    <div class="demo-section">
      <h3>Custom Fallback Image</h3>
      <SafeImage
        src="https://invalid-url-that-will-fail.com/image.jpg"
        alt="Custom fallback"
        fallback-src="https://picsum.photos/300/200?random=1"
        class="demo-image"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>
    
    <div class="demo-section">
      <h3>Different Object Fit Options</h3>
      <div class="object-fit-demo">
        <div class="fit-option">
          <h4>Cover</h4>
          <SafeImage
            src="https://picsum.photos/300/200"
            alt="Cover fit"
            object-fit="cover"
            class="demo-image-small"
          />
        </div>
        <div class="fit-option">
          <h4>Contain</h4>
          <SafeImage
            src="https://picsum.photos/300/200"
            alt="Contain fit"
            object-fit="contain"
            class="demo-image-small"
          />
        </div>
        <div class="fit-option">
          <h4>Fill</h4>
          <SafeImage
            src="https://picsum.photos/300/200"
            alt="Fill fit"
            object-fit="fill"
            class="demo-image-small"
          />
        </div>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>Rounded Corners</h3>
      <SafeImage
        src="https://picsum.photos/300/200"
        alt="Rounded image"
        class="demo-image"
        borderRadius="20px"
        @load="handleImageLoad"
        @error="handleImageError"
      />
    </div>
    
    <div class="demo-section">
      <h3>Event Logs</h3>
      <div class="event-logs">
        <div v-for="(log, index) in eventLogs" :key="index" class="log-entry">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-event">{{ log.event }}</span>
          <span class="log-details">{{ log.details }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SafeImage from './ui/SafeImage.vue'

interface EventLog {
  time: string
  event: string
  details: string
}

const eventLogs = ref<EventLog[]>([])

const addLog = (event: string, details: string) => {
  const now = new Date()
  const time = now.toLocaleTimeString()
  eventLogs.value.unshift({ time, event, details })
  
  // Keep only last 10 logs
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

const handleImageLoad = () => {
  addLog('Image Loaded', 'Image loaded successfully')
}

const handleImageError = () => {
  addLog('Image Error', 'Image failed to load, showing fallback')
}
</script>

<style scoped>
.safe-image-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-title {
  text-align: center;
  color: #1f2937;
  margin-bottom: 30px;
  font-size: 2rem;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
}

.demo-section h3 {
  color: #374151;
  margin-bottom: 15px;
  font-size: 1.25rem;
}

.demo-image {
  width: 300px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.demo-image-small {
  width: 150px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.object-fit-demo {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.fit-option {
  text-align: center;
}

.fit-option h4 {
  margin-bottom: 10px;
  color: #6b7280;
  font-size: 0.875rem;
}

.event-logs {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
}

.log-entry {
  display: flex;
  gap: 15px;
  padding: 5px 0;
  border-bottom: 1px solid #f3f4f6;
  font-family: monospace;
  font-size: 0.875rem;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: #6b7280;
  min-width: 80px;
}

.log-event {
  color: #059669;
  font-weight: 600;
  min-width: 100px;
}

.log-details {
  color: #374151;
}

@media (max-width: 768px) {
  .object-fit-demo {
    flex-direction: column;
    align-items: center;
  }
  
  .demo-image {
    width: 100%;
    max-width: 300px;
  }
}
</style>
