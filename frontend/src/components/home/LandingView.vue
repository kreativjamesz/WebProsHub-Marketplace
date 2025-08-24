<template>
  <div :class="rootClass">
    <header class="site-header">
      <div class="container nav">
        <a href="#" class="logo" aria-label="Home">
          <span class="logo-mark" aria-hidden="true"></span>
          <span>{{ config.logoText }}</span>
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme" title="Toggle theme">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm9-7a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM6 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM18.36 5.64a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 1 1-1.41-1.41l1.41-1.42a1 1 0 0 1 1.42 0Zm-9.9 9.9a1 1 0 0 1 0 1.41l-1.41 1.42a1 1 0 1 1-1.42-1.41l1.42-1.42a1 1 0 0 1 1.41 0ZM18.36 18.36a1 1 0 0 1-1.41 0l-1.42-1.41a1 1 0 0 1 1.41-1.42l1.42 1.42a1 1 0 0 1 0 1.41ZM8.46 6.46a1 1 0 0 1-1.42 0L5.62 5.05A1 1 0 0 1 7.03 3.64l1.42 1.42a1 1 0 0 1 0 1.4Z" fill="currentColor"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>

    <main>
      <!-- HERO -->
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">{{ config.available ? 'Available for freelance' : 'Booked — waitlist' }}</div>
            <h1>
              Hi, I’m <span class="hl">{{ config.name }}</span>.<br />
              I craft interfaces that convert.
            </h1>
            <p class="lead">
              Designer/developer hybrid specializing in fast, animated web experiences.
              Currently focused on <strong ref="roleEl">{{ currentRole }}</strong>.
            </p>
            <div class="cta">
              <a href="#contact" class="btn primary">Let’s work together</a>
              <a href="#work" class="btn ghost">View portfolio</a>
            </div>
            <div class="socials">
              <a
                v-for="s in config.socials"
                :key="s.label"
                class="sbtn"
                :href="s.url"
                target="_blank"
                rel="noopener"
                :title="s.label"
                :aria-label="s.label"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="s.icon" />
                </svg>
              </a>
            </div>

            <div class="marquee" aria-hidden="true">
              <div class="marquee-track">
                <span>Design Systems</span><span>Micro-interactions</span><span>Accessibility</span><span>Web Performance</span>
                <span>Design Systems</span><span>Micro-interactions</span><span>Accessibility</span><span>Web Performance</span>
              </div>
            </div>
          </div>

          <aside class="hero-portrait">
            <div class="blob"></div>
            <div class="portrait-ring">
              <div class="portrait-in" role="img" aria-label="Portrait or brand image placeholder"></div>
            </div>
            <div class="badges">
              <span class="pill">UI/UX</span>
              <span class="pill">Frontend</span>
              <span class="pill">Motion</span>
              <span class="pill">Brand</span>
            </div>
          </aside>
        </div>
      </section>

      <!-- WORK -->
      <section class="container" id="work">
        <div class="section-head">
          <h2>Selected Work</h2>
          <p class="muted">A few projects that show craft, clarity, and conversion.</p>
        </div>

        <div class="work-grid">
          <a v-for="w in config.work" :key="w.title" :href="w.url" class="card reveal">
            <div class="card-media"><img :alt="w.title" :src="w.img" /></div>
            <div class="card-body">
              <h3>{{ w.title }}</h3>
              <div class="tags">
                <span v-for="t in w.tags" :key="t" class="pill">{{ t }}</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="container" id="about">
        <div class="section-head">
          <h2>About</h2>
          <p class="muted">Strategy first. Details obsessed. Results driven.</p>
        </div>

        <div class="about">
          <div class="box reveal">
            <h3>Approach</h3>
            <p>
              I blend product thinking with visual storytelling. My process: clarify the problem, prototype quickly, then
              refine with motion and micro-interactions that make the experience memorable.
            </p>
            <ul>
              <li>Design systems that scale</li>
              <li>Accessible, semantic markup</li>
              <li>Performance budgets & audits</li>
              <li>Collaborative delivery with devs</li>
            </ul>
          </div>

          <div class="box reveal" aria-label="Stats">
            <div class="stat">
              <big>{{ config.stats.years }}</big>
              <div><strong>Years shipping</strong><br /><span class="muted">Product & websites</span></div>
            </div>
            <div class="stat">
              <big>{{ config.stats.nps }}</big>
              <div><strong>NPS lift</strong><br /><span class="muted">Best launch quarter</span></div>
            </div>
            <div class="stat">
              <big>{{ config.stats.uplift }}</big>
              <div><strong>Conversion uplift</strong><br /><span class="muted">Through design & perf</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section class="container" id="contact" aria-labelledby="contactTitle">
        <div class="section-head">
          <h2 id="contactTitle">Let’s build something that slaps</h2>
          <p class="muted">Brief me in 30 seconds—I'll reply with a plan.</p>
        </div>

        <div class="contact">
          <div class="panel reveal">
            <form @submit.prevent="onSubmit">
              <label for="name">Name</label><br />
              <input id="name" v-model="form.name" required placeholder="Your name" class="input" />
              <label for="email">Email</label><br />
              <input id="email" v-model="form.email" type="email" required placeholder="you@domain.com" class="input" />
              <label for="msg">Project</label><br />
              <textarea id="msg" v-model="form.msg" rows="5" required placeholder="Budget, timeline, goals…" class="input"></textarea>
              <button class="btn primary" type="submit">Send inquiry</button>
            </form>
          </div>

          <div class="panel reveal">
            <h3>Prefer email?</h3>
            <p class="muted">Shoot a note and include any links or references.</p>
            <a class="btn ghost" :href="`mailto:${email}`">{{ email }}</a>
            <div class="socials" style="margin-top:16px">
              <a
                v-for="s in config.socials"
                :key="'b-' + s.label"
                class="sbtn"
                :href="s.url"
                target="_blank"
                rel="noopener"
                :title="s.label"
                :aria-label="s.label"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="s.icon" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container">© {{ year }} {{ config.name }} — Designed & built with intent.</div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

// ===== Quick Config (edit these or pass as props) =====
const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      name: 'James Billy',
      available: true,
      roles: ['Product Designer', 'Frontend Engineer', 'Brand Maker', 'Motion Lover'],
      brand: '#6b7cff',
      brand2: '#00e1ff',
      logoText: 'JB • Designer',
      email: 'you@domain.com',
      stats: { years: '7+', nps: '+42', uplift: '+68%' },
      socials: [
        { label: 'Dribbble', url: 'https://dribbble.com', icon: 'M8,20c6.6,0,12-5.4,12-12S14.6,-4,8,-4S-4,1.4-4,8S1.4,20,8,20z' },
        { label: 'GitHub', url: 'https://github.com', icon: 'M12 .5a11.5 11.5 0 0 0-3.64 22.42c.57.1.78-.24.78-.55v-2.1c-3.18.69-3.86-1.54-3.86-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.53-2.54-.29-5.22-1.27-5.22-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.12 3.02.73.8 1.17 1.82 1.17 3.07 0 4.39-2.69 5.35-5.25 5.63.41.36.78 1.06.78 2.15v3.19c0 .31.2.66.79.55A11.5 11.5 0 0 0 12 .5Z' },
        { label: 'LinkedIn', url: 'https://linkedin.com', icon: 'M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM7.4 20.4H4.1V9.2h3.3v11.2zM5.7 7.8c-1 0-1.9-.8-1.9-1.9 0-1 .9-1.8 1.9-1.8s1.9.8 1.9 1.9-.9 1.8-1.9 1.8zM20.4 20.4h-3.3v-6.1c0-1.5-.5-2.6-1.9-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1 1v6.3H8.2s.1-10.2 0-11.2h3.3v1.6c.4-.6 1.2-1.6 3-1.6 2.2 0 3.9 1.4 3.9 4.5v6.7z' }
      ],
      work: [
        { title: 'E-commerce Redesign', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1500&auto=format&fit=crop', tags: ['UX Strategy', 'Shop UX', 'Design System'], url: '#' },
        { title: 'SaaS Analytics Dashboard', img: 'https://images.unsplash.com/photo-1551281044-8d8d0d8d8d8d?q=80&w=1500&auto=format&fit=crop', tags: ['Data Viz', 'Motion', 'Frontend'], url: '#' },
        { title: 'Brand & Marketing Site', img: 'https://images.unsplash.com/photo-1506801310323-534be5e7f004?q=80&w=1500&auto=format&fit=crop', tags: ['Brand', 'Copy', 'Perf'], url: '#' },
        { title: 'Mobile Product Landing', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1500&auto=format&fit=crop', tags: ['Launch', 'A/B Test', 'WebGL-lite'], url: '#' }
      ]
    })
  }
})

const config = computed(() => props.config)
const email = computed(() => config.value.email || 'you@domain.com')
const year = new Date().getFullYear()

// Theme handling
const rootClass = ref('')
const toggleTheme = () => {
  if (rootClass.value.includes('light')) rootClass.value = 'dark'
  else if (rootClass.value.includes('dark')) rootClass.value = 'light'
  else rootClass.value = 'light'
  localStorage.setItem('theme', rootClass.value)
}

// Role rotator
const currentRole = ref(config.value.roles[0])
let roleTimer
const roleEl = ref(null)

// Form (demo)
const form = ref({ name: '', email: '', msg: '' })
const onSubmit = () => {
  alert(`Thanks, ${form.value.name}! I’ll get back to you at ${form.value.email}.`)
}

// Scroll reveal
let io

// Hover magnet for buttons
function magnetize(el, strength = 10) {
  const onMove = (e) => {
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const onLeave = () => (el.style.transform = 'translate(0,0)')
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

onMounted(() => {
  // theme init
  const saved = localStorage.getItem('theme')
  if (saved) rootClass.value = saved

  // brand colors
  const root = document.documentElement
  root.style.setProperty('--brand', config.value.brand)
  root.style.setProperty('--brand-2', config.value.brand2)

  // rotate roles
  let i = 0
  roleTimer = setInterval(() => {
    i = (i + 1) % config.value.roles.length
    const el = roleEl.value
    if (!el) return
    el.animate(
      [{ opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(6px)' }],
      { duration: 180, fill: 'forwards' }
    ).onfinish = () => {
      currentRole.value = config.value.roles[i]
      el.animate(
        [{ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0px)' }],
        { duration: 220, fill: 'forwards' }
      )
    }
  }, 2200)

  // scroll reveal
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) {
          ent.target.classList.add('in')
          io.unobserve(ent.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

  // magnet buttons
  const cleanups = []
  document.querySelectorAll('.btn.primary, .btn.ghost').forEach((b) => {
    cleanups.push(magnetize(b, 10))
  })

  // reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.marquee-track').forEach((el) => (el.style.animation = 'none'))
  }
})

onBeforeUnmount(() => {
  if (roleTimer) clearInterval(roleTimer)
  if (io) io.disconnect()
})
</script>

<style scoped>
/* ---------- Design Tokens ---------- */
:root {
  --bg: #0b0b10;
  --bg-soft: #11121a;
  --text: #e9ecf1;
  --muted: #a7b0be;
  --card: #151726;
  --card-2: #11131f;
  --brand: #6b7cff;
  --brand-2: #00e1ff;
  --ring: rgba(107, 124, 255, 0.25);
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.35);

  --radius: 14px;
  --gap: clamp(16px, 2.5vw, 28px);
  --maxw: 1120px;
  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, 'Helvetica Neue', Arial,
    'Apple Color Emoji', 'Segoe UI Emoji';
}

:host(.light), .light {
  --bg: #fbfcff;
  --bg-soft: #f3f6fb;
  --text: #0f1222;
  --muted: #5a6173;
  --card: #ffffff;
  --card-2: #f7f9fe;
  --ring: rgba(107, 124, 255, 0.35);
  --shadow: 0 8px 30px rgba(25, 25, 35, 0.08);
}

* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

.container {
  width: min(100% - 40px, var(--maxw));
  margin-inline: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ---------- Header ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: saturate(140%) blur(10px);
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--text) 8%, transparent);
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: conic-gradient(from 210deg, var(--brand), var(--brand-2), var(--brand));
  box-shadow: 0 8px 20px color-mix(in oklab, var(--brand) 35%, transparent);
}
.nav-links {
  display: flex;
  gap: 18px;
  align-items: center;
}
.nav-links a {
  padding: 8px 12px;
  border-radius: 10px;
  color: var(--muted);
}
.nav-links a:hover {
  color: var(--text);
  background: color-mix(in oklab, var(--text) 7%, transparent);
}
.theme-toggle {
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  background: var(--card);
  border-radius: 999px;
  padding: 8px 10px;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 0.2s ease;
}
.theme-toggle:focus-visible {
  outline: 3px solid var(--ring);
}
.theme-toggle:hover {
  transform: translateY(-1px);
}

/* ---------- Body BG ---------- */
:host, .dark, .light {
  background:
    radial-gradient(1200px 600px at 75% -20%, rgba(107,124,255,.12), transparent 60%),
    radial-gradient(800px 400px at 15% 120%, rgba(0,225,255,.10), transparent 60%),
    var(--bg);
  color: var(--text);
  line-height: 1.55;
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  padding: clamp(48px, 7vw, 96px) 0 clamp(48px, 8vw, 120px);
  overflow: clip;
}
.hero-grid {
  display: grid;
  gap: var(--gap);
  grid-template-columns: 1.2fr 0.8fr;
}
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 6px 10px;
  border: 1px dashed color-mix(in oklab, var(--text) 14%, transparent);
  border-radius: 999px;
  width: fit-content;
  backdrop-filter: blur(6px);
}
h1 {
  font-size: clamp(36px, 6.6vw, 84px);
  line-height: 1.02;
  margin: 16px 0 12px;
  letter-spacing: -0.02em;
}
.hl {
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
}
.lead {
  font-size: clamp(16px, 1.4vw, 20px);
  color: var(--muted);
  max-width: 58ch;
}
.cta {
  display: flex;
  gap: 12px;
  margin-top: 26px;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid transparent;
  transform: translateZ(0);
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  will-change: transform;
  position: relative;
  isolation: isolate;
  cursor: pointer;
}
.btn.primary {
  background: linear-gradient(
    180deg,
    color-mix(in oklab, var(--brand) 90%, #fff 10%),
    color-mix(in oklab, var(--brand) 80%, #000 20%)
  );
  color: #0a0d1f;
  box-shadow: 0 8px 24px color-mix(in oklab, var(--brand) 35%, transparent);
}
.btn.ghost {
  border-color: color-mix(in oklab, var(--text) 16%, transparent);
  background: linear-gradient(180deg, var(--card), var(--card-2));
  color: var(--text);
}
.btn:hover {
  transform: translateY(-2px);
}
.btn:active {
  transform: translateY(0);
}
.btn:focus-visible {
  outline: 3px solid var(--ring);
}

.hero-portrait {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 360px;
  border-radius: var(--radius);
  background: radial-gradient(280px 160px at 70% 20%, color-mix(in oklab, var(--brand) 26%, transparent), transparent 60%),
    linear-gradient(180deg, var(--card), var(--card-2));
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  box-shadow: var(--shadow);
  overflow: hidden;
}
.blob {
  position: absolute;
  inset: auto -40% -40% auto;
  width: 80vmax;
  aspect-ratio: 1/1;
  filter: blur(40px) saturate(120%);
  opacity: 0.18;
  pointer-events: none;
  background:
    radial-gradient(closest-side, var(--brand), transparent 70%) 0% 0%/50% 50% no-repeat,
    radial-gradient(closest-side, var(--brand-2), transparent 70%) 100% 100%/50% 50% no-repeat;
  animation: float 16s ease-in-out infinite alternate;
}
@keyframes float {
  0% {
    transform: translate3d(-10%, -6%, 0) rotate(0deg) scale(1);
  }
  100% {
    transform: translate3d(8%, 6%, 0) rotate(30deg) scale(1.06);
  }
}
.portrait-ring {
  width: 200px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: conic-gradient(from var(--ang, 0deg), var(--brand), var(--brand-2), var(--brand));
  padding: 8px;
  animation: spin 10s linear infinite;
  box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--text) 8%, transparent), 0 6px 24px rgba(0, 0, 0, 0.2);
}
@keyframes spin {
  to {
    --ang: 360deg;
  }
}
.portrait-in {
  height: 100%;
  border-radius: 50%;
  background:
    radial-gradient(80px 80px at 70% 30%, rgba(255, 255, 255, 0.25), transparent 50%),
    url('https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop') center/cover,
    linear-gradient(180deg, #2b2f52, #16182b);
  border: 6px solid var(--bg);
}
.badges {
  position: absolute;
  bottom: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.pill {
  font: 600 12px/1 var(--font);
  padding: 8px 10px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--text) 10%, transparent);
  border: 1px solid color-mix(in oklab, var(--text) 16%, transparent);
  color: var(--text);
  backdrop-filter: blur(6px);
}

/* ---------- Marquee ---------- */
.marquee {
  position: relative;
  margin-top: 36px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  background: linear-gradient(180deg, var(--card), var(--card-2));
}
.marquee-track {
  display: flex;
  gap: 40px;
  padding: 10px 0;
  will-change: transform;
  animation: scroll 26s linear infinite;
  color: color-mix(in oklab, var(--text) 70%, transparent);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 13px;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
.marquee-track span {
  white-space: nowrap;
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* ---------- Sections ---------- */
section {
  padding: clamp(48px, 7vw, 90px) 0;
}
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
}
.section-head h2 {
  font-size: clamp(22px, 2.6vw, 34px);
  margin: 0;
  letter-spacing: -0.02em;
}
.muted {
  color: var(--muted);
}

/* Work Grid */
.work-grid {
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(12, 1fr);
}
.card {
  grid-column: span 6;
  background: linear-gradient(180deg, var(--card), var(--card-2));
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: var(--shadow);
}
.card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklab, var(--brand) 38%, var(--text) 12%);
  box-shadow: 0 18px 50px color-mix(in oklab, var(--brand) 24%, transparent);
}
.card-media {
  aspect-ratio: 16/10;
  background: #0a0c15;
  overflow: hidden;
}
.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.6s ease;
}
.card:hover .card-media img {
  transform: scale(1.07);
}
.card-body {
  padding: 18px;
}
.card h3 {
  margin: 0 0 6px;
  font-size: clamp(18px, 1.6vw, 22px);
}
.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 12px;
}
.tags .pill {
  border-style: solid;
  padding: 6px 8px;
  background: transparent;
}
@media (max-width: 900px) {
  .card {
    grid-column: span 12;
  }
}

/* ---------- About ---------- */
.about {
  display: grid;
  gap: var(--gap);
  grid-template-columns: 1fr 1fr;
  align-items: start;
}
.about .box {
  background: linear-gradient(180deg, var(--card), var(--card-2));
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow);
}
.stat {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px dashed color-mix(in oklab, var(--text) 10%, transparent);
}
.stat:last-child {
  border-bottom: 0;
}
.stat big {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
  -webkit-background-clip: text;
  color: transparent;
}
@media (max-width: 900px) {
  .about {
    grid-template-columns: 1fr;
  }
}

/* ---------- Contact ---------- */
.contact {
  display: grid;
  gap: var(--gap);
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
}
.contact .panel {
  background: linear-gradient(180deg, var(--card), var(--card-2));
  border: 1px solid color-mix(in oklab, var(--text) 12%, transparent);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}
.input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid color-mix(in oklab, var(--text) 16%, transparent);
  background: var(--bg-soft);
  color: var(--text);
  margin: 6px 0 12px;
}
@media (max-width: 900px) {
  .contact {
    grid-template-columns: 1fr;
  }
}

/* ---------- Socials ---------- */
.socials {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.sbtn {
  border: 1px solid color-mix(in oklab, var(--text) 16%, transparent);
  background: linear-gradient(180deg, var(--card), var(--card-2));
  border-radius: 10px;
  padding: 8px;
  display: grid;
  place-items: center;
  transition: transform 0.16s ease, border-color 0.16s ease;
}
.sbtn:hover {
  transform: translateY(-2px) scale(1.02);
  border-color: color-mix(in oklab, var(--brand) 32%, var(--text) 16%);
}
.sbtn svg {
  width: 18px;
  height: 18px;
}

/* ---------- Scroll Reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
  filter: saturate(0.7);
}
.reveal.in {
  opacity: 1;
  transform: none;
  filter: none;
  transition: all 0.7s cubic-bezier(0.2, 0.7, 0.1, 1);
}

/* ---------- Reduced Motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .marquee-track,
  .blob,
  .portrait-ring {
    animation: none !important;
  }
  .btn,
  .card {
    transition: none;
  }
}

footer {
  padding: 28px 0 60px;
  color: var(--muted);
  text-align: center;
  font-size: 14px;
}
</style>
