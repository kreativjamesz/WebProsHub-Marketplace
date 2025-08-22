<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Leading E-commerce Platform
          </div>
          <h1 class="text-5xl font-bold text-foreground sm:text-6xl md:text-7xl mb-6">
            About <span class="text-primary">WebProsHub</span>
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            We're revolutionizing the e-commerce landscape in the Philippines by creating meaningful connections between businesses and customers through innovative technology and exceptional user experiences.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/marketplace"
              class="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Marketplace
              <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </router-link>
            <router-link
              to="/contact"
              class="inline-flex items-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Get in Touch
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Mission -->
          <div class="group bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-border">
            <div class="flex items-center mb-6">
              <div class="flex-shrink-0">
                <div class="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-7 h-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h2 class="ml-4 text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p class="text-muted-foreground leading-relaxed text-lg">
              To democratize e-commerce by providing a comprehensive marketplace platform that empowers businesses of all sizes to thrive online. We believe in creating meaningful connections between buyers and sellers through innovative technology, transparent processes, and exceptional user experiences that drive growth and success.
            </p>
          </div>

          <!-- Vision -->
          <div class="group bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-border">
            <div class="flex items-center mb-6">
              <div class="flex-shrink-0">
                <div class="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-7 h-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <h2 class="ml-4 text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p class="text-muted-foreground leading-relaxed text-lg">
              To become the leading e-commerce marketplace in the Philippines and Southeast Asia, recognized for innovation, trust, and community impact. We envision a future where every business can thrive online, every customer discovers amazing products, and our platform becomes the backbone of digital commerce in the region.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Story -->
    <div class="py-20 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
          <p class="text-xl text-muted-foreground">From humble beginnings to marketplace innovation</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl font-bold text-primary">2019</span>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Foundation</h3>
            <p class="text-muted-foreground leading-relaxed">
              WebProsHub was founded with a vision to create a better e-commerce experience for Filipino businesses and consumers, starting with a small team of passionate developers and entrepreneurs.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl font-bold text-primary">2021</span>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Growth & Expansion</h3>
            <p class="text-muted-foreground leading-relaxed">
              Rapid expansion with thousands of sellers and customers joining our platform, establishing us as a trusted marketplace and expanding our team to 50+ professionals.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-3xl font-bold text-primary">2024</span>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Innovation & Leadership</h3>
            <p class="text-muted-foreground leading-relaxed">
              Launch of advanced features including AI-powered recommendations, Google Maps integration, mobile-first experiences, and establishing ourselves as the go-to marketplace in the Philippines.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Values -->
    <div class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p class="text-xl text-muted-foreground">The principles that guide everything we do</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Trust & Integrity</h3>
            <p class="text-muted-foreground leading-relaxed">
              Building lasting relationships through transparency, security, reliability, and ethical business practices that our community can depend on.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Innovation</h3>
            <p class="text-muted-foreground leading-relaxed">
              Continuously improving and embracing new technologies to serve our community better, staying ahead of industry trends and customer needs.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Community First</h3>
            <p class="text-muted-foreground leading-relaxed">
              Fostering a supportive ecosystem where businesses and customers thrive together, creating value for all stakeholders in our marketplace.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-3">Excellence</h3>
            <p class="text-muted-foreground leading-relaxed">
              Committed to delivering the highest quality service and user experience possible, never settling for anything less than exceptional.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div class="py-20 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
          <p class="text-xl text-muted-foreground">The passionate people driving WebProsHub Marketplace forward</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg class="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">John Doe</h3>
            <p class="text-primary font-medium mb-3">CEO & Founder</p>
            <p class="text-muted-foreground leading-relaxed">
              Visionary leader with 15+ years of experience in e-commerce and technology. Former executive at leading tech companies, passionate about empowering Filipino businesses.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg class="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">Jane Smith</h3>
            <p class="text-primary font-medium mb-3">CTO</p>
            <p class="text-muted-foreground leading-relaxed">
              Technology expert driving innovation and platform development. 12+ years in software engineering, specializing in scalable e-commerce solutions and AI integration.
            </p>
          </div>
          
          <div class="text-center group">
            <div class="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg class="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">Mike Johnson</h3>
            <p class="text-primary font-medium mb-3">Head of Operations</p>
            <p class="text-muted-foreground leading-relaxed">
              Operations specialist ensuring smooth marketplace operations and customer satisfaction. Expert in process optimization and customer experience management.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-foreground mb-4">By The Numbers</h2>
          <p class="text-xl text-muted-foreground">Our impact in the e-commerce ecosystem</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
            <p class="text-muted-foreground text-lg font-medium">Active Sellers</p>
            <p class="text-sm text-muted-foreground mt-2">Growing businesses across the Philippines</p>
          </div>
          
          <div class="text-center group">
            <div class="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">1M+</div>
            <p class="text-muted-foreground text-lg font-medium">Happy Customers</p>
            <p class="text-sm text-muted-foreground mt-2">Satisfied shoppers nationwide</p>
          </div>
          
          <div class="text-center group">
            <div class="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">500K+</div>
            <p class="text-muted-foreground text-lg font-medium">Products Listed</p>
            <p class="text-sm text-muted-foreground mt-2">Diverse product catalog</p>
          </div>
          
          <div class="text-center group">
            <div class="text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">99.9%</div>
            <p class="text-muted-foreground text-lg font-medium">Platform Uptime</p>
            <p class="text-sm text-muted-foreground mt-2">Reliable service delivery</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="py-20 bg-gradient-to-r from-primary to-primary/90">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-primary-foreground mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          Join thousands of businesses and customers who are already thriving on WebProsHub Marketplace. Let's build the future of e-commerce together.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/contact"
            class="inline-flex items-center px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Contact Our Team
            <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </router-link>
          <router-link
            to="/marketplace"
            class="inline-flex items-center px-8 py-4 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-all duration-200"
          >
            Explore Marketplace
            <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Lifecycle
onMounted(() => {
  // Set page title
  document.title = 'About Us - WebProsHub Marketplace'
})
</script>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
