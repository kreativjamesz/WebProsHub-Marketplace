<template>
  <footer class="app-footer-universe">
    <!-- Cosmic Background Elements -->
    <div class="footer-cosmic-bg">
      <div class="footer-star footer-star-1"></div>
      <div class="footer-star footer-star-2"></div>
      <div class="footer-star footer-star-3"></div>
      <div class="footer-star footer-star-4"></div>
      <div class="footer-nebula"></div>
      <div class="footer-cosmic-dust"></div>
    </div>
    
    <!-- Glow Effect Overlay -->
    <div class="footer-glow"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="footer-content-universe">
        <!-- Main Footer -->
        <div class="footer-main-universe">
          <!-- Company Info -->
          <div class="footer-section-universe">
            <div class="footer-brand-universe">
              <div class="brand-logo-universe">
                <div class="logo-glow-effect"></div>
                <MapPin class="logo-icon-universe" />
              </div>
              <div class="brand-text-universe">
                <h3 class="brand-name-universe">WebProsHub</h3>
                <span class="brand-tagline-universe">Marketplace</span>
              </div>
            </div>
            <p class="company-description-universe">
              Professional marketplace with Google Maps integration. Connect buyers and sellers in your local area.
            </p>
            <div class="social-links-universe">
              <a href="#" class="social-link-universe group" aria-label="Facebook">
                <div class="social-glow"></div>
                <Facebook class="social-icon-universe" />
              </a>
              <a href="#" class="social-link-universe group" aria-label="Twitter">
                <div class="social-glow"></div>
                <Twitter class="social-icon-universe" />
              </a>
              <a href="#" class="social-link-universe group" aria-label="Instagram">
                <div class="social-glow"></div>
                <Instagram class="social-icon-universe" />
              </a>
              <a href="#" class="social-link-universe group" aria-label="LinkedIn">
                <div class="social-glow"></div>
                <Linkedin class="social-icon-universe" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section-universe">
            <h4 class="footer-title-universe">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-universe-primary rounded-full mr-3 animate-pulse"></div>
                <span>Quick Links</span>
              </div>
            </h4>
            <ul class="footer-links-universe">
              <li><router-link to="/marketplace" class="footer-link-universe group">
                <span class="link-text">Marketplace</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/stores" class="footer-link-universe group">
                <span class="link-text">Stores</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/categories" class="footer-link-universe group">
                <span class="link-text">Categories</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/about" class="footer-link-universe group">
                <span class="link-text">About Us</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/contact" class="footer-link-universe group">
                <span class="link-text">Contact</span>
                <div class="link-glow"></div>
              </router-link></li>
            </ul>
          </div>

          <!-- For Sellers -->
          <div class="footer-section-universe">
            <h4 class="footer-title-universe">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-universe-secondary rounded-full mr-3 animate-pulse"></div>
                <span>For Sellers</span>
              </div>
            </h4>
            <ul class="footer-links-universe">
              <li><router-link to="/seller/register" class="footer-link-universe group">
                <span class="link-text">Become a Seller</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/seller/features" class="footer-link-universe group">
                <span class="link-text">Seller Features</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/seller/pricing" class="footer-link-universe group">
                <span class="link-text">Pricing</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/seller/support" class="footer-link-universe group">
                <span class="link-text">Seller Support</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/seller/guidelines" class="footer-link-universe group">
                <span class="link-text">Guidelines</span>
                <div class="link-glow"></div>
              </router-link></li>
            </ul>
          </div>

          <!-- For Buyers -->
          <div class="footer-section-universe">
            <h4 class="footer-title-universe">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-universe-accent rounded-full mr-3 animate-pulse"></div>
                <span>For Buyers</span>
              </div>
            </h4>
            <ul class="footer-links-universe">
              <li><router-link to="/buyer/guide" class="footer-link-universe group">
                <span class="link-text">Shopping Guide</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/buyer/support" class="footer-link-universe group">
                <span class="link-text">Customer Support</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/buyer/returns" class="footer-link-universe group">
                <span class="link-text">Returns & Refunds</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/buyer/faq" class="footer-link-universe group">
                <span class="link-text">FAQ</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/buyer/feedback" class="footer-link-universe group">
                <span class="link-text">Feedback</span>
                <div class="link-glow"></div>
              </router-link></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="footer-section-universe">
            <h4 class="footer-title-universe">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-gradient-to-r from-universe-primary to-universe-accent rounded-full mr-3 animate-pulse"></div>
                <span>Support</span>
              </div>
            </h4>
            <ul class="footer-links-universe">
              <li><router-link to="/help" class="footer-link-universe group">
                <span class="link-text">Help Center</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/contact" class="footer-link-universe group">
                <span class="link-text">Contact Us</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/support" class="footer-link-universe group">
                <span class="link-text">Support</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/status" class="footer-link-universe group">
                <span class="link-text">System Status</span>
                <div class="link-glow"></div>
              </router-link></li>
              <li><router-link to="/feedback" class="footer-link-universe group">
                <span class="link-text">Feedback</span>
                <div class="link-glow"></div>
              </router-link></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom-universe">
          <div class="footer-bottom-content-universe">
            <div class="copyright-universe">
              <p>&copy; {{ currentYear }} WebProsHubMarketplace. All rights reserved.</p>
            </div>
            <div class="footer-bottom-links-universe">
              <router-link to="/privacy" class="footer-bottom-link-universe group">
                <span>Privacy Policy</span>
                <div class="bottom-link-glow"></div>
              </router-link>
              <router-link to="/terms" class="footer-bottom-link-universe group">
                <span>Terms of Service</span>
                <div class="bottom-link-glow"></div>
              </router-link>
              <router-link to="/cookies" class="footer-bottom-link-universe group">
                <span>Cookie Policy</span>
                <div class="bottom-link-glow"></div>
              </router-link>
            </div>
            <div class="theme-toggle-universe">
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
/* App Footer Universe Theme Styles */
.app-footer-universe {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 50%,
    rgba(51, 65, 85, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  color: #f9fafb;
  margin-top: auto;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(147, 51, 234, 0.3);
}

/* Cosmic Background Elements */
.footer-cosmic-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

/* Animated Footer Stars */
.footer-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 0.6;
  animation: footer-twinkle 6s ease-in-out infinite;
}

.footer-star-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.footer-star-2 {
  top: 40%;
  right: 15%;
  animation-delay: 1.5s;
}

.footer-star-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 3s;
}

.footer-star-4 {
  bottom: 60%;
  right: 25%;
  animation-delay: 4.5s;
}

@keyframes footer-twinkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.4);
    filter: brightness(1.5);
  }
}

/* Footer Nebula Effect */
.footer-nebula {
  position: absolute;
  top: -20%;
  left: -20%;
  right: -20%;
  bottom: -20%;
  background: radial-gradient(
    ellipse at center,
    rgba(147, 51, 234, 0.06) 0%,
    rgba(79, 70, 229, 0.04) 40%,
    rgba(236, 72, 153, 0.03) 70%,
    transparent 100%
  );
  animation: footer-nebula-float 30s ease-in-out infinite;
}

@keyframes footer-nebula-float {
  0%, 100% { 
    transform: rotate(0deg) scale(1) translateY(0px); 
  }
  50% { 
    transform: rotate(90deg) scale(1.05) translateY(-8px); 
  }
}

/* Footer Cosmic Dust */
.footer-cosmic-dust {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 100px 100px, rgba(255, 255, 255, 0.2), transparent),
    radial-gradient(1px 1px at 200px 200px, rgba(255, 255, 255, 0.15), transparent),
    radial-gradient(1px 1px at 300px 300px, rgba(255, 255, 255, 0.25), transparent);
  background-size: 400px 400px;
  animation: footer-dust-float 25s linear infinite;
}

@keyframes footer-dust-float {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-400px); }
}

/* Footer Glow Effect */
.footer-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(147, 51, 234, 0.08) 0%,
    transparent 30%,
    rgba(79, 70, 229, 0.05) 100%
  );
  z-index: 2;
  pointer-events: none;
}

/* Footer Content */
.footer-content-universe {
  padding: 4rem 0 2rem;
  position: relative;
  z-index: 10;
}

/* Footer Main Grid */
.footer-main-universe {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Footer Sections */
.footer-section-universe {
  display: flex;
  flex-direction: column;
}

/* Footer Brand */
.footer-brand-universe {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.brand-logo-universe {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(79, 70, 229, 0.8) 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(147, 51, 234, 0.3);
}

.logo-glow-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(147, 51, 234, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.brand-logo-universe:hover .logo-glow-effect {
  opacity: 1;
}

.logo-icon-universe {
  width: 28px;
  height: 28px;
  color: white;
  z-index: 1;
  position: relative;
}

.brand-text-universe {
  display: flex;
  flex-direction: column;
}

.brand-name-universe {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, rgba(147, 51, 234, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline-universe {
  font-size: 0.875rem;
  color: rgba(147, 51, 234, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.company-description-universe {
  color: rgba(209, 213, 219, 0.9);
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 320px;
  font-size: 0.95rem;
}

/* Social Links */
.social-links-universe {
  display: flex;
  gap: 1rem;
}

.social-link-universe {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(147, 51, 234, 0.1);
  border: 1px solid rgba(147, 51, 234, 0.3);
  border-radius: 50%;
  color: rgba(147, 51, 234, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(147, 51, 234, 0.3), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link-universe:hover {
  background: rgba(147, 51, 234, 0.2);
  border-color: rgba(147, 51, 234, 0.6);
  color: white;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(147, 51, 234, 0.3);
}

.social-link-universe:hover .social-glow {
  opacity: 1;
}

.social-icon-universe {
  width: 22px;
  height: 22px;
  z-index: 1;
  position: relative;
}

/* Footer Titles */
.footer-title-universe {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

/* Footer Links */
.footer-links-universe {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link-universe {
  color: rgba(209, 213, 219, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  position: relative;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.link-glow {
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.8));
  border-radius: 1px;
  transition: width 0.3s ease;
}

.footer-link-universe:hover {
  color: white;
  transform: translateX(8px);
}

.footer-link-universe:hover .link-glow {
  width: 20px;
}

.link-text {
  position: relative;
  z-index: 1;
}

/* Footer Bottom */
.footer-bottom-universe {
  border-top: 1px solid rgba(147, 51, 234, 0.2);
  padding-top: 2rem;
  position: relative;
}

.footer-bottom-universe::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), transparent);
}

.footer-bottom-content-universe {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright-universe {
  color: rgba(156, 163, 175, 0.8);
  font-size: 0.875rem;
}

.footer-bottom-links-universe {
  display: flex;
  gap: 2rem;
}

.footer-bottom-link-universe {
  color: rgba(156, 163, 175, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.bottom-link-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(147, 51, 234, 0.8), rgba(79, 70, 229, 0.8));
  border-radius: 1px;
  transition: width 0.3s ease;
}

.footer-bottom-link-universe:hover {
  color: white;
}

.footer-bottom-link-universe:hover .bottom-link-glow {
  width: 100%;
}

.theme-toggle-universe {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-main-universe {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-main-universe {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .footer-bottom-content-universe {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .footer-bottom-links-universe {
    justify-content: center;
  }
  
  .company-description-universe {
    max-width: none;
  }
  
  .footer-content-universe {
    padding: 3rem 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-content-universe {
    padding: 2.5rem 0 1rem;
  }
  
  .footer-bottom-links-universe {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .social-links-universe {
    gap: 0.75rem;
  }
  
  .social-link-universe {
    width: 40px;
    height: 40px;
  }
}

/* Dark Mode Enhancements */
.dark .app-footer-universe {
  background: linear-gradient(
    135deg,
    rgba(2, 6, 23, 0.98) 0%,
    rgba(15, 23, 42, 0.95) 50%,
    rgba(30, 41, 59, 0.98) 100%
  );
}

.dark .footer-star {
  opacity: 0.8;
}

.dark .footer-nebula {
  opacity: 0.7;
}

.dark .footer-cosmic-dust {
  opacity: 0.6;
}

/* Smooth transitions for theme switching */
.app-footer-universe,
.app-footer-universe * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
.footer-link-universe:focus-visible,
.footer-bottom-link-universe:focus-visible,
.social-link-universe:focus-visible {
  outline: 2px solid rgba(147, 51, 234, 0.6);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Glass morphism effect for child components */
.app-footer-universe > * {
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}
</style>
