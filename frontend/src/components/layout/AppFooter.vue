<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <!-- Main Footer -->
        <div class="footer-main">
          <!-- Company Info -->
          <div class="footer-section">
            <div class="footer-brand">
              <div class="brand-logo">
                <MapPin class="logo-icon" />
              </div>
              <div class="brand-text">
                <h3 class="brand-name">WebProsHub</h3>
                <span class="brand-tagline">Marketplace</span>
              </div>
            </div>
            <p class="company-description">
              Professional marketplace with Google Maps integration. Connect buyers and sellers in your local area.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <Facebook class="social-icon" />
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <Twitter class="social-icon" />
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <Instagram class="social-icon" />
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <Linkedin class="social-icon" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4 class="footer-title">Quick Links</h4>
            <ul class="footer-links">
              <li><router-link to="/marketplace" class="footer-link">Marketplace</router-link></li>
              <li><router-link to="/stores" class="footer-link">Stores</router-link></li>
              <li><router-link to="/categories" class="footer-link">Categories</router-link></li>
              <li><router-link to="/about" class="footer-link">About Us</router-link></li>
              <li><router-link to="/contact" class="footer-link">Contact</router-link></li>
            </ul>
          </div>

          <!-- For Sellers -->
          <div class="footer-section">
            <h4 class="footer-title">For Sellers</h4>
            <ul class="footer-links">
              <li><router-link to="/seller/register" class="footer-link">Become a Seller</router-link></li>
              <li><router-link to="/seller/features" class="footer-link">Seller Features</router-link></li>
              <li><router-link to="/seller/pricing" class="footer-link">Pricing</router-link></li>
              <li><router-link to="/seller/support" class="footer-link">Seller Support</router-link></li>
              <li><router-link to="/seller/guidelines" class="footer-link">Guidelines</router-link></li>
            </ul>
          </div>

          <!-- For Buyers -->
          <div class="footer-section">
            <h4 class="footer-title">For Buyers</h4>
            <ul class="footer-links">
              <li><router-link to="/buyer/guide" class="footer-link">Shopping Guide</router-link></li>
              <li><router-link to="/buyer/support" class="footer-link">Customer Support</router-link></li>
              <li><router-link to="/buyer/returns" class="footer-link">Returns & Refunds</router-link></li>
              <li><router-link to="/buyer/faq" class="footer-link">FAQ</router-link></li>
              <li><router-link to="/buyer/feedback" class="footer-link">Feedback</router-link></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="footer-section">
            <h4 class="footer-title">Support</h4>
            <ul class="footer-links">
              <li><router-link to="/help" class="footer-link">Help Center</router-link></li>
              <li><router-link to="/contact" class="footer-link">Contact Us</router-link></li>
              <li><router-link to="/support" class="footer-link">Support</router-link></li>
              <li><router-link to="/status" class="footer-link">System Status</router-link></li>
              <li><router-link to="/feedback" class="footer-link">Feedback</router-link></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <div class="copyright">
              <p>&copy; {{ currentYear }} WebProsHubMarketplace. All rights reserved.</p>
            </div>
            <div class="footer-bottom-links">
              <router-link to="/privacy" class="footer-bottom-link">Privacy Policy</router-link>
              <router-link to="/terms" class="footer-bottom-link">Terms of Service</router-link>
              <router-link to="/cookies" class="footer-bottom-link">Cookie Policy</router-link>
            </div>
            <div class="theme-toggle">
              <ColorThemeDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-vue-next'
import ColorThemeDropdown from '@/components/ColorThemeDropdown.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background: #1f2937;
  color: #f9fafb;
  margin-top: auto;
}

.footer-content {
  padding: 3rem 0 1rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
}

.company-description {
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #374151;
  border-radius: 50%;
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: #4b5563;
  color: white;
  transform: translateY(-2px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.875rem;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1.5rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #9ca3af;
  font-size: 0.875rem;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.footer-bottom-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-bottom-link:hover {
  color: white;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
  }
  
  .company-description {
    max-width: none;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 2rem 0 1rem;
  }
  
  .footer-bottom-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
