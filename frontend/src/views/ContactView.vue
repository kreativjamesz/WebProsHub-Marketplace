<template>
  <div class="min-h-screen bg-accent">
    <!-- Hero Section -->
    <div class="bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">Contact Us</h1>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
            Get in touch with our team. We're here to help with any questions, concerns, or feedback
            you might have.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-card rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-foreground mb-2"
                    >Email Address</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-foreground mb-2"
                    >Phone Number (Optional)</label
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <select
                    v-model="form.subject"
                    class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    v-model="form.message"
                    rows="6"
                    class="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  ></textarea>
                </div>

                <div class="flex items-center">
                  <input
                    v-model="form.newsletter"
                    type="checkbox"
                    class="h-4 w-4 text-primary focus:ring-ring border-border rounded"
                  />
                  <label class="ml-2 block text-sm text-foreground">
                    Subscribe to our newsletter for updates and special offers
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {{ submitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Office Location -->
            <div class="bg-card rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
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
                <h3 class="ml-3 text-lg font-medium text-foreground">Office Location</h3>
              </div>
              <p class="text-muted-foreground">
                123 Business Street<br />
                Makati City, Metro Manila<br />
                Philippines 1200
              </p>
            </div>

            <!-- Contact Details -->
            <div class="bg-card rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-foreground">Contact Details</h3>
              </div>
              <div class="space-y-3 text-muted-foreground">
                <p>
                  <span class="font-medium">Phone:</span><br />
                  +63 2 8123 4567
                </p>
                <p>
                  <span class="font-medium">Email:</span><br />
                  info@webproshub.com
                </p>
                <p>
                  <span class="font-medium">Support:</span><br />
                  support@webproshub.com
                </p>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="bg-card rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-foreground">Business Hours</h3>
              </div>
              <div class="space-y-2 text-muted-foreground">
                <div class="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <!-- Emergency Contact -->
            <div class="bg-card rounded-lg shadow-md p-6">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 class="ml-3 text-lg font-medium text-foreground">Emergency Contact</h3>
              </div>
              <p class="text-muted-foreground">
                For urgent technical issues:<br />
                <span class="font-medium">+63 917 123 4567</span><br />
                Available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="py-16 bg-card">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p class="mt-4 text-lg text-muted-foreground">Find quick answers to common questions</p>
        </div>

        <div class="max-w-3xl mx-auto space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-accent rounded-lg p-6">
            <h3 class="text-lg font-medium text-foreground mb-3">{{ faq.question }}</h3>
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="py-16 bg-accent">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground">Find Us</h2>
          <p class="mt-4 text-lg text-muted-foreground">Visit our office or explore our location</p>
        </div>

        <div class="bg-card rounded-lg shadow-md p-6">
          <div class="h-96 bg-muted rounded-lg flex items-center justify-center">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p class="text-muted-foreground">Map placeholder</p>
              <p class="text-sm text-muted-foreground">
                Google Maps integration will be added here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false,
})

const submitting = ref(false)

// FAQ data
const faqs = ref([
  {
    question: 'How can I become a seller on your platform?',
    answer:
      'To become a seller, simply register for an account and select "Seller" as your account type. You\'ll need to provide business information and complete the verification process before you can start listing products.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept various payment methods including credit cards, debit cards, PayPal, bank transfers, and cash on delivery for eligible orders.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      "Shipping times vary depending on your location and the seller's shipping method. Most orders are delivered within 3-7 business days within the Philippines.",
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Some items may have different return policies based on the seller.',
  },
  {
    question: 'How do I track my order?',
    answer:
      "You can track your order through your account dashboard. Once your order ships, you'll receive tracking information via email and can monitor its progress in real-time.",
  },
])

// Methods
const submitForm = async () => {
  submitting.value = true

  try {
    // TODO: Replace with actual API call
    // await apiService.contact.submit(form.value)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false,
    }

    // Show success message
    alert("Thank you for your message! We'll get back to you soon.")
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('There was an error sending your message. Please try again.')
  } finally {
    submitting.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'Contact Us - WebProsHub Marketplace'
})
</script>
