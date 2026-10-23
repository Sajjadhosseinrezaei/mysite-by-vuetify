```vue
<template>
  <main class="home-page">
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-background" aria-hidden="true">
        <div class="web-pattern"></div>
        <div class="glow glow-red"></div>
        <div class="glow glow-blue"></div>
        <div class="scanlines"></div>
        <div class="hero-grid"></div>
      </div>

      <v-container class="hero-container">
        <v-row align="center" class="hero-row">
          <v-col cols="12" md="8" lg="7">
            <div class="hero-content">
              <div class="hero-eyebrow">
                <span class="status-dot"></span>
                PYTHON BACKEND DEVELOPER
              </div>

              <h1 class="hero-title">
                <span class="title-greeting">سلام، من</span>
                <span class="title-name glitch-text" data-text="سجاد حسین">
                  سجاد حسین
                </span>
                <span class="title-greeting">هستم.</span>
              </h1>

              <h2 class="hero-subtitle">
                ایده‌ها را به
                <span class="neon-text">APIهای کاربردی</span>
                تبدیل می‌کنم.
              </h2>

              <p class="hero-description">
                توسعه‌دهنده بک‌اند Python و Django؛ از طراحی مدل‌ها و
                پیاده‌سازی API تا احراز هویت، تست و استقرار پروژه.
              </p>

              <div class="tech-stack" aria-label="فناوری‌های اصلی">
                <span class="tech-chip">Python</span>
                <span class="tech-chip">Django REST Framework</span>
                <span class="tech-chip">PostgreSQL</span>
              </div>

              <div class="hero-actions">
                <v-btn
                  to="/projects"
                  class="primary-action"
                  size="large"
                  append-icon="mdi-arrow-top-left"
                  rounded="lg"
                >
                  مشاهده پروژه‌ها
                </v-btn>

                <v-btn
                  to="/about"
                  class="secondary-action"
                  size="large"
                  variant="outlined"
                  rounded="lg"
                >
                  درباره من
                </v-btn>
              </div>

              <div class="hero-bottom-label">
                <span class="label-line"></span>
                BUILDING THE BACKEND BEYOND THE ORDINARY
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="4" lg="5" class="hero-visual-column">
            <div class="hero-visual" aria-hidden="true">
              <div class="visual-ring ring-outer"></div>
              <div class="visual-ring ring-middle"></div>
              <div class="visual-ring ring-inner"></div>

              <div class="visual-cross cross-one"></div>
              <div class="visual-cross cross-two"></div>

              <div class="code-window">
                <div class="code-window-header">
                  <div class="window-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>backend.py</span>
                </div>

                <div class="code-lines" dir="ltr">
                  <p><span class="code-purple">class</span> <span class="code-blue">Developer</span>:</p>
                  <p class="code-indent"><span class="code-purple">def</span> <span class="code-yellow">build</span>(self):</p>
                  <p class="code-indent code-indent-two">return <span class="code-green">"Great APIs"</span></p>
                  <p class="code-spacer"></p>
                  <p><span class="code-comment"># Turning ideas into code</span></p>
                  <p><span class="code-blue">status</span> = <span class="code-green">"building..."</span><span class="cursor-blink">_</span></p>
                </div>

                <div class="code-window-footer">
                  <span class="footer-indicator"></span>
                  SYSTEM ONLINE
                </div>
              </div>

              <div class="floating-tag tag-python">PYTHON</div>
              <div class="floating-tag tag-api">REST API</div>
              <div class="floating-tag tag-django">DJANGO</div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <div class="hero-bottom-line"></div>
    </section>

    <!-- Featured projects -->
    <section class="projects-section" id="featured-projects">
      <v-container>
        <div class="section-heading">
          <div>
            <div class="section-eyebrow">
              <span class="heading-symbol">//</span>
              SELECTED WORKS
            </div>

            <h2 class="section-title">
              پروژه‌های <span class="neon-text">منتخب</span>
            </h2>

            <p class="section-description">
              نگاهی به بخشی از پروژه‌هایی که توسعه داده‌ام.
            </p>
          </div>

          <v-btn
            to="/projects"
            variant="text"
            class="view-all-btn"
            append-icon="mdi-arrow-top-left"
          >
            همه پروژه‌ها
          </v-btn>
        </div>

        <!-- Loading -->
        <v-row v-if="loading" class="project-grid">
          <v-col
            v-for="item in 3"
            :key="`skeleton-${item}`"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-skeleton-loader
              class="project-skeleton"
              type="image, article"
            />
          </v-col>
        </v-row>

        <!-- Error -->
        <v-alert
          v-else-if="error"
          type="error"
          variant="tonal"
          rounded="lg"
          class="project-alert"
        >
          <div class="alert-content">
            <span>دریافت پروژه‌ها با خطا مواجه شد.</span>

            <v-btn
              variant="text"
              color="error"
              @click="loadProjects"
            >
              تلاش مجدد
            </v-btn>
          </div>
        </v-alert>

        <!-- Projects -->
        <v-row
          v-else-if="featuredProjects.length"
          class="project-grid"
        >
          <v-col
            v-for="(project, index) in featuredProjects"
            :key="project.id ?? project.slug ?? index"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              class="project-card"
              :style="{ '--card-index': index }"
              :to="project.slug ? `/projects/${project.slug}` : '/projects'"
              rounded="lg"
              elevation="0"
            >
              <div class="project-image-wrapper">
                <v-img
                  :src="getProjectImage(project)"
                  :alt="project.title || 'تصویر پروژه'"
                  cover
                  aspect-ratio="16/10"
                  class="project-image"
                >
                  <template #placeholder>
                    <div class="image-placeholder">
                      <v-icon size="42">mdi-code-braces</v-icon>
                    </div>
                  </template>

                  <template #error>
                    <div class="image-placeholder">
                      <v-icon size="42">mdi-code-braces</v-icon>
                    </div>
                  </template>
                </v-img>

                <div class="image-overlay"></div>
                <div class="image-scanline"></div>

                <span class="project-index">
                  0{{ index + 1 }}
                </span>

                <span
                  v-if="project.category_name"
                  class="project-category"
                >
                  {{ project.category_name }}
                </span>

                <div class="project-open-icon">
                  <v-icon>mdi-arrow-top-left</v-icon>
                </div>
              </div>

              <v-card-text class="project-card-content">
                <div class="project-card-topline">
                  <span class="project-type">FEATURED PROJECT</span>
                  <span class="project-status">
                    <span></span>
                    PROJECT
                  </span>
                </div>

                <h3 class="project-title">
                  {{ project.title }}
                </h3>

                <p
                  v-if="project.short_description || project.description"
                  class="project-description"
                >
                  {{ project.short_description || project.description }}
                </p>

                <div
                  v-if="project.technologies?.length"
                  class="project-technologies"
                >
                  <span
                    v-for="technology in project.technologies.slice(0, 4)"
                    :key="technology.id ?? technology.name ?? technology"
                    class="project-tech"
                  >
                    {{ technology.name ?? technology }}
                  </span>
                </div>

                <div class="project-card-footer">
                  <span>مشاهده جزئیات</span>
                  <v-icon size="18">mdi-arrow-left</v-icon>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty state -->
        <div v-else class="empty-projects">
          <div class="empty-icon">
            <v-icon size="36">mdi-folder-outline</v-icon>
          </div>

          <h3>هنوز پروژه‌ای برای نمایش وجود ندارد.</h3>

          <p>
            پس از اضافه کردن پروژه‌های منتخب، آن‌ها در این بخش نمایش داده می‌شوند.
          </p>

          <v-btn
            to="/projects"
            variant="outlined"
            class="secondary-action"
            rounded="lg"
          >
            مشاهده صفحه پروژه‌ها
          </v-btn>
        </div>

        <div class="projects-bottom-note">
          <span></span>
          MORE PROJECTS. MORE POSSIBILITIES.
        </div>
      </v-container>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()

const { projects, loading, error } = storeToRefs(projectsStore)

const featuredProjects = computed(() => {
  if (!Array.isArray(projects.value)) {
    return []
  }

  return projects.value
    .filter((project) => project.is_featured)
    .slice(0, 3)
})

async function loadProjects() {
  try {
    await projectsStore.loadProjects()
  } catch (err) {
    // نمایش خطا بر اساس state خود store انجام می‌شود.
    // خطا را دوباره پرتاب نمی‌کنیم تا handler کلی لازم نباشد.
    console.error('Failed to load projects:', err)
  }
}

function getProjectImage(project) {
  const image =
    project.featured_image_url ||
    project.featured_image ||
    project.image

  if (!image || typeof image !== 'string') {
    return undefined
  }

  if (/^https?:\/\//i.test(image)) {
    return image
  }

  const apiBase = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000')
    .replace(/\/api\/?$/, '')
    .replace(/\/$/, '')

  return `${apiBase}/${image.replace(/^\/+/, '')}`
}

onMounted(() => {
  if (!Array.isArray(projects.value) || projects.value.length === 0) {
    loadProjects()
  }
})
</script>

<style scoped>
.home-page {
  --spider-red: #ff3158;
  --spider-blue: #3987ff;
  --spider-purple: #a78bfa;
  --surface: #0c0b12;
  --muted: #a7a3b5;

  overflow: hidden;
  background: #08080d;
  color: #f5f3ff;
}

/* =========================
   HERO
========================= */

.hero-section {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: 690px;
  padding: 90px 0 75px;
  background:
    radial-gradient(ellipse at 10% 20%, rgb(255 49 88 / 9%), transparent 40%),
    radial-gradient(ellipse at 90% 75%, rgb(57 135 255 / 10%), transparent 42%),
    linear-gradient(145deg, #0b0911 0%, #09090f 52%, #0c0a14 100%);
}

.hero-background {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.web-pattern {
  position: absolute;
  inset: -20%;
  opacity: 0.14;
  background-image:
    repeating-radial-gradient(
      circle at 15% 35%,
      transparent 0,
      transparent 48px,
      rgb(255 255 255 / 18%) 49px,
      transparent 50px,
      transparent 78px
    ),
    repeating-conic-gradient(
      from 0deg at 15% 35%,
      transparent 0deg 14deg,
      rgb(255 255 255 / 12%) 14.2deg 14.5deg,
      transparent 14.7deg 30deg
    );
  mask-image: linear-gradient(100deg, #000, transparent 75%);
  animation: web-drift 35s linear infinite;
}

.glow {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.18;
}

.glow-red {
  top: 10%;
  left: -180px;
  background: var(--spider-red);
}

.glow-blue {
  right: -180px;
  bottom: 5%;
  background: var(--spider-blue);
}

.scanlines {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgb(255 255 255 / 12%) 4px
  );
}

.hero-grid {
  position: absolute;
  inset: 0;
  opacity: 0.09;
  background-image:
    linear-gradient(rgb(255 255 255 / 10%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 10%) 1px, transparent 1px);
  background-size: 65px 65px;
  mask-image: linear-gradient(to bottom, transparent, #000 20%, #000 75%, transparent);
}

.hero-container {
  position: relative;
  z-index: 1;
}

.hero-row {
  row-gap: 45px;
}

.hero-content {
  max-width: 700px;
  animation: reveal-up 800ms both;
}

.hero-eyebrow,
.section-eyebrow {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #b9b2cb;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.status-dot,
.project-status > span,
.footer-indicator {
  position: relative;
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 50%;
  background: #58f5ac;
  box-shadow: 0 0 12px rgb(88 245 172 / 65%);
}

.status-dot::after {
  position: absolute;
  inset: -4px;
  border: 1px solid rgb(88 245 172 / 55%);
  border-radius: 50%;
  content: "";
  animation: pulse-ring 2s infinite;
}

.hero-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 12px;
  margin: 27px 0 20px;
  font-size: clamp(38px, 5.5vw, 68px);
  font-weight: 900;
  line-height: 1.45;
  letter-spacing: -1.8px;
}

.title-greeting {
  color: #f8f6ff;
}

.title-name {
  position: relative;
  color: #ff4168;
  text-shadow:
    3px 0 rgb(57 135 255 / 65%),
    -3px 0 rgb(255 49 88 / 45%),
    0 0 35px rgb(255 49 88 / 18%);
}

.glitch-text::before,
.glitch-text::after {
  position: absolute;
  inset: 0;
  overflow: hidden;
  content: attr(data-text);
  pointer-events: none;
}

.glitch-text::before {
  color: #3987ff;
  clip-path: inset(35% 0 55% 0);
  transform: translateX(2px);
  animation: glitch-blue 5s infinite steps(1);
}

.glitch-text::after {
  color: #ff3158;
  clip-path: inset(75% 0 8% 0);
  transform: translateX(-2px);
  animation: glitch-red 4s infinite steps(1);
}

.hero-subtitle {
  margin-bottom: 18px;
  color: #f2efff;
  font-size: clamp(22px, 3vw, 33px);
  font-weight: 800;
  line-height: 1.8;
}

.neon-text {
  color: #b9a0ff;
  text-shadow: 0 0 24px rgb(167 139 250 / 22%);
}

.hero-description {
  max-width: 590px;
  margin-bottom: 26px;
  color: #b4afc2;
  font-size: 16px;
  line-height: 2.15;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 32px;
}

.tech-chip {
  padding: 7px 12px;
  border: 1px solid rgb(167 139 250 / 24%);
  border-radius: 6px;
  background: rgb(167 139 250 / 5%);
  color: #d8ccff;
  font-family: monospace;
  font-size: 12px;
  transition:
    border-color 180ms ease,
    background 180ms ease,
    transform 180ms ease;
}

.tech-chip:hover {
  transform: translateY(-2px);
  border-color: rgb(167 139 250 / 65%);
  background: rgb(167 139 250 / 12%);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.primary-action {
  min-height: 48px !important;
  border: 1px solid rgb(255 255 255 / 12%);
  background: linear-gradient(115deg, #ff3158, #d51f69) !important;
  color: #fff !important;
  font-weight: 800;
  box-shadow: 0 8px 30px rgb(255 49 88 / 18%);
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;
}

.primary-action:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 38px rgb(255 49 88 / 32%);
}

.secondary-action {
  min-height: 48px !important;
  border-color: rgb(167 139 250 / 38%) !important;
  color: #e7dfff !important;
}

.secondary-action:hover {
  border-color: var(--spider-purple) !important;
  background: rgb(167 139 250 / 8%);
}

.hero-bottom-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 45px;
  color: #777187;
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 1.4px;
}

.label-line {
  width: 27px;
  height: 1px;
  background: var(--spider-red);
}

/* =========================
   HERO VISUAL
========================= */

.hero-visual-column {
  display: flex;
  justify-content: center;
}

.hero-visual {
  position: relative;
  display: grid;
  width: min(100%, 440px);
  min-height: 430px;
  place-items: center;
  animation: reveal-up 900ms 150ms both;
}

.visual-ring {
  position: absolute;
  aspect-ratio: 1;
  border: 1px solid rgb(167 139 250 / 22%);
  border-radius: 50%;
}

.ring-outer {
  width: 100%;
  border-style: dashed;
  animation: rotate-ring 50s linear infinite;
}

.ring-middle {
  width: 77%;
  border-color: rgb(57 135 255 / 28%);
  animation: rotate-ring 35s linear infinite reverse;
}

.ring-inner {
  width: 54%;
  border-color: rgb(255 49 88 / 35%);
  box-shadow:
    0 0 50px rgb(255 49 88 / 7%),
    inset 0 0 40px rgb(57 135 255 / 5%);
}

.visual-cross {
  position: absolute;
  width: 120%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(57 135 255 / 40%), transparent);
  transform: rotate(35deg);
}

.cross-two {
  background: linear-gradient(90deg, transparent, rgb(255 49 88 / 35%), transparent);
  transform: rotate(-35deg);
}

.code-window {
  position: relative;
  z-index: 2;
  width: min(100%, 345px);
  overflow: hidden;
  border: 1px solid rgb(167 139 250 / 30%);
  border-radius: 13px;
  background: rgb(12 11 20 / 93%);
  box-shadow:
    0 0 0 5px rgb(167 139 250 / 3%),
    0 25px 70px rgb(0 0 0 / 40%),
    -8px 0 45px rgb(255 49 88 / 8%),
    8px 0 45px rgb(57 135 255 / 8%);
  backdrop-filter: blur(15px);
  transform: rotate(-2deg);
  transition: transform 300ms ease;
}

.code-window:hover {
  transform: rotate(0deg) translateY(-4px);
}

.code-window-header,
.code-window-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  border-bottom: 1px solid rgb(255 255 255 / 7%);
  color: #858097;
  font-family: monospace;
  font-size: 11px;
}

.window-dots {
  display: flex;
  gap: 6px;
}

.window-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff5e72;
}

.window-dots span:nth-child(2) {
  background: #ffc857;
}

.window-dots span:nth-child(3) {
  background: #57e6a5;
}

.code-lines {
  padding: 24px 20px 30px;
  color: #e8e3f8;
  font-family: monospace;
  font-size: 12px;
  line-height: 2.5;
  white-space: nowrap;
}

.code-lines p {
  margin: 0;
}

.code-indent {
  padding-left: 20px;
}

.code-indent-two {
  padding-left: 40px;
}

.code-spacer {
  height: 13px;
}

.code-purple {
  color: #c5a0ff;
}

.code-blue {
  color: #79b8ff;
}

.code-yellow {
  color: #ffd580;
}

.code-green {
  color: #8be9b5;
}

.code-comment {
  color: #77738a;
}

.cursor-blink {
  color: var(--spider-red);
  animation: blink 1s steps(2, start) infinite;
}

.code-window-footer {
  justify-content: flex-start;
  gap: 9px;
  border-top: 1px solid rgb(255 255 255 / 7%);
  border-bottom: 0;
}

.floating-tag {
  position: absolute;
  z-index: 3;
  padding: 9px 13px;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 7px;
  background: #11101a;
  font-family: monospace;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 8px 25px rgb(0 0 0 / 25%);
  animation: float-tag 5s ease-in-out infinite;
}

.tag-python {
  top: 12%;
  right: 0;
  border-color: rgb(57 135 255 / 35%);
  color: #88baff;
}

.tag-api {
  bottom: 16%;
  left: 0;
  border-color: rgb(255 49 88 / 35%);
  color: #ff8da4;
  animation-delay: -1.5s;
}

.tag-django {
  right: 5%;
  bottom: 7%;
  border-color: rgb(88 245 172 / 25%);
  color: #8be9b5;
  animation-delay: -3s;
}

.hero-bottom-line {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 49 88 / 45%),
    rgb(167 139 250 / 35%),
    rgb(57 135 255 / 45%),
    transparent
  );
}

/* =========================
   PROJECTS
========================= */

.projects-section {
  position: relative;
  padding: 100px 0 55px;
  background:
    radial-gradient(ellipse at 100% 0%, rgb(57 135 255 / 5%), transparent 35%),
    #09090f;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 35px;
}

.section-eyebrow {
  margin-bottom: 13px;
  color: #9189a7;
}

.heading-symbol {
  color: var(--spider-red);
  font-size: 16px;
}

.section-title {
  margin-bottom: 8px;
  color: #f7f4ff;
  font-size: clamp(30px, 4vw, 42px);
  font-weight: 900;
  line-height: 1.5;
}

.section-description {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 2;
}

.view-all-btn {
  flex-shrink: 0;
  color: #d6c7ff !important;
}

.view-all-btn:hover {
  color: #fff !important;
}

.project-grid {
  row-gap: 22px;
}

.project-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid rgb(167 139 250 / 13%);
  background: linear-gradient(155deg, #11101a, #0d0c13) !important;
  color: #f5f3ff !important;
  transition:
    transform 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
  animation: reveal-up 600ms both;
  animation-delay: calc(var(--card-index, 0) * 100ms);
}

.project-card:hover {
  transform: translateY(-7px);
  border-color: rgb(167 139 250 / 42%);
  box-shadow:
    0 18px 45px rgb(0 0 0 / 25%),
    -3px 0 20px rgb(255 49 88 / 6%),
    3px 0 20px rgb(57 135 255 / 6%);
}

.project-image-wrapper {
  position: relative;
  overflow: hidden;
  background: #151321;
}

.project-image {
  transition: transform 450ms ease;
}

.project-card:hover .project-image {
  transform: scale(1.055);
}

.image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  min-height: 190px;
  place-items: center;
  background:
    radial-gradient(circle at 30% 30%, rgb(255 49 88 / 12%), transparent 40%),
    radial-gradient(circle at 70% 70%, rgb(57 135 255 / 12%), transparent 40%),
    #12101b;
  color: #9380c9;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgb(5 5 10 / 5%),
    transparent 35%,
    rgb(5 5 10 / 55%)
  );
  pointer-events: none;
}

.image-scanline {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 4px,
    rgb(255 255 255 / 12%) 5px
  );
  transition: opacity 200ms ease;
  pointer-events: none;
}

.project-card:hover .image-scanline {
  opacity: 0.6;
}

.project-index,
.project-category {
  position: absolute;
  top: 13px;
  padding: 5px 9px;
  border: 1px solid rgb(255 255 255 / 15%);
  border-radius: 5px;
  background: rgb(10 9 16 / 80%);
  color: #f3efff;
  font-family: monospace;
  font-size: 10px;
  backdrop-filter: blur(8px);
}

.project-index {
  left: 13px;
  color: #ff8da4;
}

.project-category {
  right: 13px;
  max-width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-open-icon {
  position: absolute;
  right: 13px;
  bottom: 13px;
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 50%;
  background: rgb(12 11 20 / 75%);
  color: #fff;
  opacity: 0;
  transform: translate(-5px, 5px);
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.project-card:hover .project-open-icon {
  opacity: 1;
  transform: translate(0, 0);
}

.project-card-content {
  padding: 21px !important;
}

.project-card-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 13px;
}

.project-type {
  color: #9c8cbf;
  font-family: monospace;
  font-size: 9px;
  letter-spacing: 1px;
}

.project-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #7f7a91;
  font-family: monospace;
  font-size: 9px;
}

.project-status > span {
  width: 6px;
  height: 6px;
  flex-basis: 6px;
}

.project-title {
  margin-bottom: 10px;
  color: #f7f4ff;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.7;
}

.project-description {
  display: -webkit-box;
  overflow: hidden;
  min-height: 54px;
  margin-bottom: 18px;
  color: #aaa5b9;
  font-size: 13px;
  line-height: 1.95;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 20px;
}

.project-tech {
  padding: 4px 8px;
  border: 1px solid rgb(167 139 250 / 16%);
  border-radius: 4px;
  color: #bdb0e8;
  font-family: monospace;
  font-size: 10px;
}

.project-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgb(255 255 255 / 7%);
  color: #c8b9ff;
  font-size: 12px;
  font-weight: 700;
  transition: color 180ms ease;
}

.project-card:hover .project-card-footer {
  color: #ff7993;
}

.project-skeleton {
  overflow: hidden;
  border: 1px solid rgb(167 139 250 / 12%);
  border-radius: 10px;
  background: #11101a !important;
}

.project-alert {
  margin: 30px 0;
  background: rgb(255 49 88 / 6%) !important;
}

.alert-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.empty-projects {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 65px 20px;
  border: 1px dashed rgb(167 139 250 / 25%);
  border-radius: 12px;
  text-align: center;
}

.empty-icon {
  display: grid;
  width: 70px;
  height: 70px;
  margin-bottom: 20px;
  place-items: center;
  border: 1px solid rgb(167 139 250 / 25%);
  border-radius: 18px;
  background: rgb(167 139 250 / 7%);
  color: #b9a0ff;
}

.empty-projects h3 {
  margin-bottom: 10px;
  color: #f5f3ff;
  font-size: 18px;
}

.empty-projects p {
  max-width: 480px;
  margin-bottom: 22px;
  color: #aaa5b9;
  font-size: 13px;
  line-height: 2;
}

.projects-bottom-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 60px;
  color: #716b82;
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 1.5px;
}

.projects-bottom-note > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--spider-blue);
  box-shadow: 0 0 12px rgb(57 135 255 / 70%);
}

/* =========================
   ANIMATIONS
========================= */

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotate-ring {
  to {
    transform: rotate(360deg);
  }
}

@keyframes float-tag {
  0%, 100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -9px;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

@keyframes web-drift {
  to {
    transform: rotate(360deg);
  }
}

@keyframes glitch-blue {
  0%, 93%, 100% {
    clip-path: inset(35% 0 55% 0);
    transform: translateX(2px);
  }

  94% {
    clip-path: inset(10% 0 75% 0);
    transform: translateX(-3px);
  }

  96% {
    clip-path: inset(65% 0 20% 0);
    transform: translateX(3px);
  }
}

@keyframes glitch-red {
  0%, 89%, 100% {
    clip-path: inset(75% 0 8% 0);
    transform: translateX(-2px);
  }

  90% {
    clip-path: inset(15% 0 65% 0);
    transform: translateX(3px);
  }

  93% {
    clip-path: inset(50% 0 30% 0);
    transform: translateX(-3px);
  }
}

/* =========================
   RESPONSIVE
========================= */

@media (min-width: 960px) {
  .hero-visual-column {
    padding-left: 20px;
  }
}

@media (max-width: 959px) {
  .hero-section {
    min-height: auto;
    padding: 75px 0 60px;
  }

  .hero-visual {
    width: min(100%, 390px);
    min-height: 370px;
  }

  .hero-title {
    font-size: clamp(38px, 7vw, 58px);
  }

  .projects-section {
    padding-top: 75px;
  }
}

@media (max-width: 599px) {
  .hero-section {
    padding: 65px 0 45px;
  }

  .hero-eyebrow,
  .section-eyebrow {
    font-size: 10px;
    letter-spacing: 1.4px;
  }

  .hero-title {
    gap: 0 8px;
    margin-top: 23px;
    font-size: clamp(35px, 9vw, 47px);
    letter-spacing: -1px;
  }

  .hero-subtitle {
    font-size: 23px;
    line-height: 1.9;
  }

  .hero-description {
    font-size: 14px;
    line-height: 2.1;
  }

  .tech-stack {
    gap: 7px;
  }

  .tech-chip {
    font-size: 10px;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero-actions .v-btn {
    min-width: 0;
    padding-inline: 10px;
    font-size: 12px;
  }

  .hero-bottom-label {
    margin-top: 30px;
    font-size: 8px;
    letter-spacing: 0.8px;
  }

  .hero-visual {
    min-height: 310px;
  }

  .code-window {
    width: min(100%, 315px);
  }

  .code-lines {
    padding: 18px 14px 22px;
    font-size: 10px;
  }

  .floating-tag {
    padding: 7px 9px;
    font-size: 9px;
  }

  .projects-section {
    padding: 60px 0 35px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
  }

  .section-title {
    font-size: 30px;
  }

  .section-description {
    font-size: 13px;
  }

  .project-card-content {
    padding: 18px !important;
  }

  .projects-bottom-note {
    margin-top: 40px;
    font-size: 8px;
    letter-spacing: 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-page *,
  .home-page *::before,
  .home-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
```
