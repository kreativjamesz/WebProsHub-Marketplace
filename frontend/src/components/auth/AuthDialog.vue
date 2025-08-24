<template>
  <div id="auth-dialog" class="auth-dialog-container">
    <!-- Login Dialog -->
    <LoginDialog
      :open="showLogin"
      @update:open="showLogin = $event"
      @show-register="switchToRegister"
    />

    <!-- Register Dialog -->
    <RegisterDialog
      :open="showRegister"
      @update:open="showRegister = $event"
      @show-login="switchToLogin"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import LoginDialog from './LoginDialog.vue'
import RegisterDialog from './RegisterDialog.vue'

// Props
interface Props {
  open: boolean
  initialMode?: 'login' | 'register'
}

const props = withDefaults(defineProps<Props>(), {
  initialMode: 'login'
})

// Emits
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

// State
const showLogin = ref(props.initialMode === 'login')
const showRegister = ref(props.initialMode === 'register')

// Watch for open prop changes
watch(() => props.open, (newOpen) => {
  if (newOpen) {
    // Show the appropriate dialog based on initial mode
    if (props.initialMode === 'login') {
      showLogin.value = true
      showRegister.value = false
    } else {
      showLogin.value = false
      showRegister.value = true
    }
  } else {
    // Close both dialogs
    showLogin.value = false
    showRegister.value = false
  }
})

// Watch for dialog state changes to emit open state
watch([showLogin, showRegister], ([loginOpen, registerOpen]) => {
  emit('update:open', loginOpen || registerOpen)
})

// Methods
const switchToLogin = () => {
  showRegister.value = false
  showLogin.value = true
}

const switchToRegister = () => {
  showLogin.value = false
  showRegister.value = true
}

// Expose methods for external use
defineExpose({
  showLogin: () => {
    showLogin.value = true
    showRegister.value = false
  },
  showRegister: () => {
    showLogin.value = false
    showRegister.value = true
  }
})
</script>

<style scoped>
/* Ensure the auth dialog container has proper z-index and positioning */
.auth-dialog-container {
  position: relative;
  z-index: 9999; /* Very high z-index to ensure it's above everything */
}

/* Override Shadcn Dialog z-index to ensure proper layering */
:deep(.auth-dialog-container [data-slot="dialog-content"]) {
  z-index: 10000 !important; /* Force highest z-index */
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

:deep(.auth-dialog-container [data-slot="dialog-overlay"]) {
  z-index: 9999 !important; /* Ensure overlay is below content but above everything else */
}

/* Ensure proper centering and positioning */
:deep(.auth-dialog-container .login-dialog),
:deep(.auth-dialog-container .register-dialog) {
  position: relative;
  z-index: 10000;
}

/* Force dialog to be above all other elements */
:deep(.auth-dialog-container [data-slot="dialog-content"]) {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

/* Fix content positioning issues */
:deep(.auth-dialog-container [data-slot="dialog-content"] > *) {
  position: relative !important;
  z-index: 10001 !important;
}

/* Ensure form elements are properly positioned */
:deep(.auth-dialog-container form),
:deep(.auth-dialog-container .space-y-6),
:deep(.auth-dialog-container .space-y-8) {
  position: relative !important;
  z-index: 10001 !important;
}
</style>
