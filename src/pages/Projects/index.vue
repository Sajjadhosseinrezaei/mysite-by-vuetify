<template>
  <v-container fluid class="projects-page pa-0 overflow-hidden">
    <!-- Spider-Verse Hero -->
    <section class="hero-section position-relative">
      <div class="hero-bg" aria-hidden="true">
        <div class="hero-web hero-web--one"></div>
        <div class="hero-web hero-web--two"></div>
        <div class="hero-halftone"></div>
      </div>

      <v-container class="hero-content h-100 position-relative">
        <v-row align="center" justify="center" class="h-100">
          <v-col cols="12" class="text-center">
            <v-fade-transition appear>
              <div>
                <div class="hero-kicker">
                  <span class="kicker-line"></span>
                  <span>MY MULTIVERSE</span>
                  <span class="kicker-line"></span>
                </div>
                <h1 class="hero-title">پروژه‌ها<span class="title-period">.</span></h1>
                <p class="hero-subtitle">
                  مجموعه‌ای از سیستم‌های واقعی که با پایتون، جنگو و فناوری‌های مدرن ساخته‌ام
                </p>
                <div class="hero-accent" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Projects -->
    <v-container class="content-section py-12">
      <div class="section-heading">
        <div>
          <p class="section-eyebrow">EXPLORE THE WORK</p>
          <h2 class="section-title">دنیای ساخته‌شده‌ی من</h2>
        </div>
        <div v-if="totalCount > 0" class="project-count">
          <span class="count-number">{{ totalCount }}</span>
          <span class="count-label">پروژه</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="state-container" role="status" aria-live="polite">
        <v-progress-circular indeterminate size="52" width="4" color="primary" />
        <p class="state-text">در حال بارگذاری پروژه‌ها...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="state-container">
        <div class="state-icon state-icon--error">
          <v-icon size="32">mdi-alert-circle-outline</v-icon>
        </div>
        <h3 class="state-title">بارگذاری ناموفق بود</h3>
        <p class="state-text">{{ error }}</p>
        <v-btn
          color="primary"
          variant="flat"
          rounded="lg"
          class="retry-btn mt-3"
          @click="loadProjects(page)"
        >
          <v-icon start>mdi-refresh</v-icon>
          تلاش مجدد
        </v-btn>
      </div>

      <!-- Empty state -->
      <div v-else-if="projects.length === 0" class="state-container">
        <div class="state-icon">
          <v-icon size="32">mdi-folder-open-outline</v-icon>
        </div>
        <h3 class="state-title">هنوز پروژه‌ای نمایش داده نمی‌شود</h3>
        <p class="state-text">بعداً دوباره سر بزن؛ ممکن است پروژه‌های تازه‌ای اضافه شوند.</p>
      </div>

      <!-- Project cards -->
      <v-row v-else class="projects-grid" align="stretch">
        <v-col
          v-for="(proj, index) in projects"
          :key="proj.id"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="project-column"
        >
          <router-link :to="`/projects/${proj.id}`" class="project-link">
            <v-card class="project-card h-100 d-flex flex-column" elevation="0">
              <div class="card-art">
                <v-img
                  v-if="resolveImageUrl(proj.featured_image_url)"
                  :src="resolveImageUrl(proj.featured_image_url)"
                  :alt="`تصویر پروژه ${proj.title}`"
                  height="220"
                  cover
                  class="project-image"
                >
                  <template #placeholder>
                    <div class="image-placeholder">
                      <v-progress-circular indeterminate color="primary" size="30" />
                    </div>
                  </template>
                  <template #error>
                    <div class="image-placeholder">
                      <v-icon size="46">mdi-image-off-outline</v-icon>
                      <span>تصویر موجود نیست</span>
                    </div>
                  </template>
                </v-img>
                <div v-else class="image-placeholder image-placeholder--empty">
                  <v-icon size="46">mdi-code-braces</v-icon>
                  <span>PROJECT FILE {{ String(index + 1).padStart(2, "0") }}</span>
                </div>

                <div class="art-overlay" aria-hidden="true"></div>
                <span class="project-index">{{ String(index + 1).padStart(2, "0") }}</span>
                <v-chip
                  v-if="proj.category"
                  size="small"
                  class="category-chip"
                  color="primary"
                  variant="flat"
                >
                  {{ proj.category.name }}
                </v-chip>
              </div>

              <v-card-text class="card-body d-flex flex-column flex-grow-1">
                <h3 class="project-title">{{ proj.title }}</h3>
                <p class="project-description">
                  {{ proj.short_description || truncate(proj.description, 120) }}
                </p>
                <div class="card-footer mt-auto">
                  <span class="details-label">مشاهده جزئیات</span>
                  <span class="arrow-circle" aria-hidden="true">
                    <v-icon size="19">mdi-arrow-top-left</v-icon>
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>

      <!-- Pagination -->
      <div v-if="!loading && !error && totalPages > 1" class="pagination-wrap">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="5"
          color="primary"
          rounded="lg"
          :disabled="loading"
          @update:model-value="onPageChange"
        />
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const store = useProjectsStore();
const { projects, loading, error, totalCount } = storeToRefs(store);

const page = ref(1);
const pageSize = 9;

const totalPages = computed(() => Math.ceil(Number(totalCount.value || 0) / pageSize));

const onPageChange = (newPage) => {
  if (newPage === page.value && !loading.value) {
    loadProjects(newPage);
    return;
  }
  page.value = newPage;
  loadProjects(newPage);
};

const loadProjects = async (requestedPage = 1) => {
  try {
    await store.loadProjects(requestedPage);
  } catch (err) {
    // The store should expose its request error through `error`.
    // Keep this guard so a rejected action does not create an unhandled promise.
    console.error("Failed to load projects:", err);
  }
};

onMounted(() => {
  loadProjects(page.value);
});

function truncate(text, length) {
  if (typeof text !== "string" || !text) return "";
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

function resolveImageUrl(pathOrUrl) {
  if (typeof pathOrUrl !== "string" || !pathOrUrl.trim()) return null;

  const path = pathOrUrl.trim();
  if (/^https?:\/\//i.test(path)) return path;

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap");

.projects-page {
  min-height: 100vh;
  color: #f7f7fb;
  background:
    radial-gradient(ellipse at 8% 24%, rgba(227, 34, 70, 0.08), transparent 32%),
    radial-gradient(ellipse at 92% 58%, rgba(35, 142, 255, 0.08), transparent 30%),
    #090a10;
  font-family: "Vazirmatn", sans-serif;
}

/* Hero */
.hero-section {
  min-height: 390px;
  height: min(54vh, 500px);
  overflow: hidden;
  isolation: isolate;
  background: #090a10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.hero-bg,
.hero-bg::before,
.hero-bg::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-bg {
  z-index: -1;
  overflow: hidden;
  background:
    linear-gradient(118deg, rgba(8, 9, 16, 0.98) 5%, rgba(17, 12, 25, 0.92) 52%, rgba(8, 14, 27, 0.97) 100%),
    #0b0c13;
}

.hero-bg::before {
  content: "";
  opacity: 0.45;
  background-image: radial-gradient(rgba(255, 255, 255, 0.24) 0.8px, transparent 0.8px);
  background-size: 7px 7px;
  mask-image: linear-gradient(90deg, #000, transparent 52%, #000);
}

.hero-bg::after {
  content: "";
  background:
    linear-gradient(115deg, transparent 0 42%, rgba(225, 28, 67, 0.13) 42.2% 42.8%, transparent 43%),
    linear-gradient(115deg, transparent 0 57%, rgba(29, 143, 255, 0.16) 57.2% 58%, transparent 58.2%);
}

.hero-web {
  position: absolute;
  width: 460px;
  height: 460px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  opacity: 0.7;
}

.hero-web::before,
.hero-web::after {
  content: "";
  position: absolute;
  inset: 14%;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 50%;
}

.hero-web::after {
  inset: 29%;
}

.hero-web--one {
  top: -285px;
  left: -100px;
  box-shadow: 0 0 0 28px rgba(226, 29, 67, 0.035), 0 0 0 60px rgba(226, 29, 67, 0.025);
}

.hero-web--two {
  right: -170px;
  bottom: -330px;
  border-color: rgba(36, 145, 255, 0.18);
  box-shadow: 0 0 0 35px rgba(36, 145, 255, 0.035), 0 0 0 72px rgba(36, 145, 255, 0.025);
}

.hero-halftone {
  position: absolute;
  width: 220px;
  height: 220px;
  right: 8%;
  top: 18%;
  opacity: 0.2;
  background-image: radial-gradient(#ef3156 1.2px, transparent 1.2px);
  background-size: 9px 9px;
  mask-image: radial-gradient(circle, #000 0, transparent 70%);
}

.hero-content {
  z-index: 1;
}

.hero-kicker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
  color: #aeb8ca;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.24em;
}

.kicker-line {
  width: 34px;
  height: 2px;
  background: #ed3156;
  transform: skewX(-25deg);
}

.hero-title {
  margin: 0;
  color: #fff;
  font-size: clamp(2.8rem, 6vw, 5.1rem);
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-shadow: 4px 4px 0 rgba(229, 35, 75, 0.75), -3px -2px 0 rgba(32, 142, 255, 0.7);
}

.title-period {
  color: #ed3156;
  text-shadow: 3px 3px 0 rgba(32, 142, 255, 0.8);
}

.hero-subtitle {
  max-width: 720px;
  margin: 22px auto 0;
  color: #c5cad5;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 2;
}

.hero-accent {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 28px;
}

.hero-accent span {
  display: block;
  width: 24px;
  height: 4px;
  background: #ed3156;
  transform: skewX(-25deg);
}

.hero-accent span:nth-child(2) {
  width: 42px;
  background: #268fff;
}

.hero-accent span:nth-child(3) {
  background: #f5f5f7;
}

/* Main content */
.content-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 58px 28px 88px !important;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.section-eyebrow {
  margin: 0 0 8px;
  color: #ed4565;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.section-title {
  margin: 0;
  color: #f8f8fc;
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 800;
}

.project-count {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 13px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.035);
}

.count-number {
  color: #54b4ff;
  font-size: 1.2rem;
  font-weight: 900;
}

.count-label {
  color: #aeb4c1;
  font-size: 0.8rem;
}

.projects-grid {
  margin: 0 -12px;
}

.project-column {
  padding: 12px;
}

.project-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
  outline: none;
}

.project-card {
  position: relative;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px !important;
  background: linear-gradient(145deg, #171923 0%, #101119 100%);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.project-card::before {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 72px;
  height: 3px;
  content: "";
  background: #ed3156;
  transition: width 220ms ease;
}

.project-column:nth-child(even) .project-card::before {
  background: #268fff;
}

.project-link:hover .project-card,
.project-link:focus-visible .project-card {
  transform: translateY(-7px);
  border-color: rgba(76, 167, 255, 0.5);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.38), 5px 0 0 rgba(237, 49, 86, 0.12);
}

.project-link:hover .project-card::before,
.project-link:focus-visible .project-card::before {
  width: 100%;
}

.card-art {
  position: relative;
  overflow: hidden;
  background: #171923;
}

.project-image {
  transition: transform 400ms ease, filter 400ms ease;
}

.project-link:hover .project-image,
.project-link:focus-visible .project-image {
  transform: scale(1.045);
  filter: saturate(1.12);
}

.art-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(5, 6, 10, 0.05) 30%, rgba(5, 6, 10, 0.72) 100%);
}

.image-placeholder {
  display: flex;
  height: 220px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #8992a5;
  background:
    radial-gradient(circle at 20% 25%, rgba(237, 49, 86, 0.15), transparent 35%),
    radial-gradient(circle at 80% 70%, rgba(38, 143, 255, 0.16), transparent 36%),
    #141620;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.image-placeholder--empty {
  height: 220px;
  background-image:
    radial-gradient(rgba(255, 255, 255, 0.11) 0.8px, transparent 0.8px),
    linear-gradient(135deg, #171923, #101119);
  background-size: 8px 8px, auto;
}

.project-index {
  position: absolute;
  z-index: 1;
  top: 14px;
  left: 14px;
  padding: 5px 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  color: #fff;
  background: rgba(8, 9, 15, 0.7);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  backdrop-filter: blur(8px);
}

.category-chip {
  position: absolute;
  z-index: 1;
  right: 14px;
  bottom: 13px;
  max-width: calc(100% - 28px);
  color: #fff !important;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
}

.card-body {
  min-height: 210px;
  padding: 20px !important;
}

.project-title {
  margin: 0 0 11px;
  color: #f8f8fc;
  font-size: 1.12rem;
  font-weight: 800;
  line-height: 1.65;
  overflow-wrap: anywhere;
}

.project-description {
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 22px;
  color: #aeb4c1;
  font-size: 0.9rem;
  line-height: 1.9;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}

.details-label {
  color: #d7dbe4;
  font-size: 0.82rem;
  font-weight: 700;
  transition: color 180ms ease;
}

.arrow-circle {
  display: inline-flex;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(38, 143, 255, 0.45);
  border-radius: 50%;
  color: #69bdff;
  background: rgba(38, 143, 255, 0.08);
  transition: color 180ms ease, background 180ms ease, transform 180ms ease;
}

.project-link:hover .details-label,
.project-link:focus-visible .details-label {
  color: #fff;
}

.project-link:hover .arrow-circle,
.project-link:focus-visible .arrow-circle {
  color: #fff;
  background: #ed3156;
  border-color: #ed3156;
  transform: translate(-2px, -2px);
}

/* Loading, error and empty states */
.state-container {
  display: flex;
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 20px;
  text-align: center;
}

.state-icon {
  display: flex;
  width: 66px;
  height: 66px;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  border: 1px solid rgba(38, 143, 255, 0.3);
  border-radius: 18px;
  color: #55b4ff;
  background: rgba(38, 143, 255, 0.08);
}

.state-icon--error {
  color: #ff6079;
  border-color: rgba(237, 49, 86, 0.35);
  background: rgba(237, 49, 86, 0.08);
}

.state-title {
  margin: 0 0 8px;
  color: #f8f8fc;
  font-size: 1.1rem;
  font-weight: 800;
}

.state-text {
  margin: 0;
  color: #aeb4c1;
  line-height: 1.9;
}

.retry-btn {
  color: #fff !important;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 42px;
}

.pagination-wrap :deep(.v-pagination__item--is-active .v-btn) {
  color: #fff;
  background: #ed3156;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-section {
    min-height: 350px;
    height: 420px;
  }

  .content-section {
    padding: 46px 20px 70px !important;
  }

  .project-column {
    padding: 10px;
  }
}

@media (max-width: 600px) {
  .hero-section {
    min-height: 330px;
    height: auto;
    padding: 68px 0;
  }

  .hero-kicker {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
  }

  .hero-subtitle {
    max-width: 390px;
    margin-top: 16px;
    font-size: 0.95rem;
    line-height: 1.9;
  }

  .hero-web--one {
    left: -270px;
  }

  .hero-web--two {
    right: -330px;
  }

  .content-section {
    padding: 36px 16px 56px !important;
  }

  .section-heading {
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 1.35rem;
  }

  .project-count {
    gap: 5px;
    padding: 6px 9px;
  }

  .projects-grid {
    margin: 0 -7px;
  }

  .project-column {
    padding: 8px 7px;
  }

  .card-body {
    min-height: 190px;
    padding: 17px !important;
  }

  .project-title {
    font-size: 1.02rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
