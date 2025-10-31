<template>
  <v-container fluid class="project-detail-page pa-0 overflow-hidden">
    <!-- Hero Section -->
    <section v-if="project" class="hero-section position-relative">
      <div class="hero-bg"></div>

      <v-container class="h-100 position-relative z-10">
        <v-row align="center" class="h-100">
          <v-col cols="12" class="text-center">
            <v-fade-transition appear>
              <div>
                <h1 class="hero-title text-shadow">{{ project.title }}</h1>
                <p class="hero-subtitle text-shadow-sm">
                  {{ project.short_description || truncate(project.description, 120) }}
                </p>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-16">
      <v-progress-circular indeterminate size="64" color="primary" />
    </div>

    <!-- Error -->
    <div v-if="error" class="text-center py-16">
      <v-alert type="error" variant="tonal" class="mx-auto" max-width="600">
        {{ errorMessage }}
      </v-alert>
      <v-btn color="primary" @click="loadProject" class="mt-4">تلاش مجدد</v-btn>
    </div>

    <!-- Content -->
    <v-container v-if="project" class="content-section py-16">
      <!-- Images Carousel -->
      <v-carousel
        v-if="slides.length"
        hide-delimiters
        height="420"
        show-arrows-on-hover
        class="mb-12 rounded-xl elevation-8"
      >
        <v-carousel-item v-for="(src, idx) in slides" :key="idx">
          <v-img
            :src="src"
            height="420"
            cover
            class="cursor-pointer"
            @click="openLightbox(idx)"
          >
            <template #placeholder>
              <v-skeleton-loader type="image" class="h-100" />
            </template>
          </v-img>
        </v-carousel-item>
      </v-carousel>

      <!-- Main Content -->
      <v-row justify="center">
        <!-- Description -->
        <v-col cols="12" md="8">
          <h3 class="section-title mb-4">توضیحات کامل</h3>

          <div
            :class="['project-description', { 'expanded': showMore }]"
            v-html="project.description"
          />

          <div v-if="isClamped" class="text-center mt-4">
            <v-btn
              variant="text"
              color="primary"
              @click="showMore = !showMore"
              class="readmore-btn"
            >
              {{ showMore ? "بستن" : "نمایش بیشتر" }}
              <v-icon small class="ms-1">
                {{ showMore ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Sidebar -->
        <v-col cols="12" md="4">
          <v-card class="sidebar-card elevation-6 pa-5" color="#1a1a1a">
            <h3 class="section-title mb-4">اطلاعات پروژه</h3>

            <div class="meta-item mb-3">
              <v-icon small class="me-2" color="primary">mdi-folder</v-icon>
              <strong>دسته‌بندی:</strong> {{ project.category?.name || "نامشخص" }}
            </div>

            <div class="meta-item mb-3">
              <v-icon small class="me-2" color="primary">mdi-check-circle</v-icon>
              <strong>وضعیت:</strong>
              <v-chip
                :color="statusColor(project.status)"
                small
                class="ms-2"
                text-color="white"
              >
                {{ project.status || "نامشخص" }}
              </v-chip>
            </div>

            <div class="meta-item mb-4">
              <v-icon small class="me-2" color="primary">mdi-calendar</v-icon>
              <strong>تاریخ:</strong> {{ formatDate(project.created_at) }}
            </div>

            <!-- Action Buttons -->
            <div class="d-flex flex-column gap-2">
              <v-btn
                v-if="project.demo_url"
                :href="project.demo_url"
                target="_blank"
                color="primary"
                size="large"
                prepend-icon="mdi-open-in-new"
                class="mb-2"
              >
                مشاهده دمو
              </v-btn>
              <v-btn
                v-if="project.github_url"
                :href="project.github_url"
                target="_blank"
                variant="outlined"
                size="large"
                prepend-icon="mdi-github"
              >
                گیت‌هاب
              </v-btn>
            </div>

            <!-- Technologies -->
            <div class="mt-6">
              <h4 class="text-subtitle-1 font-weight-bold mb-3">تکنولوژی‌ها</h4>
              <div class="tech-chips">
                <v-chip
                  v-for="t in project.technologies"
                  :key="t.id"
                  small
                  outlined
                  class="ma-1 tech-chip"
                  :style="{ borderColor: t.color || '#00bcd4', color: t.color || '#00bcd4' }"
                >
                  {{ t.name }}
                </v-chip>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Lightbox -->
    <v-dialog v-model="lightbox" max-width="95vw" @click:outside="lightbox = false">
      <v-card class="bg-black pa-0 overflow-hidden" flat>
        <v-btn
          icon
          class="close-btn"
          @click="lightbox = false"
          size="small"
        >
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>

        <v-btn
          icon
          class="lightbox-nav left"
          @click="prevImage"
          :disabled="slides.length <= 1"
        >
          <v-icon color="white" size="large">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          class="lightbox-nav right"
          @click="nextImage"
          :disabled="slides.length <= 1"
        >
          <v-icon color="white" size="large">mdi-chevron-right</v-icon>
        </v-btn>

        <div class="lightbox-img-container">
          <v-img
            :src="slides[currentImg]"
            max-height="85vh"
            contain
            class="mx-auto"
          />
        </div>

        <div v-if="currentCaption" class="lightbox-caption pa-3 text-center">
          {{ currentCaption }}
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useProjectsStore } from "@/stores/projects";

const store = useProjectsStore();
const route = useRoute();
const id = computed(() => route.params.id);

const loading = ref(false);
const error = ref(false);
const errorMessage = ref("");

const project = computed(() => store.currentProject);
const lightbox = ref(false);
const currentImg = ref(0);
const showMore = ref(false);
const isClamped = ref(false);

/* ------------------------------------------------------------------ */
/*  Slides (featured + gallery)                                       */
/* ------------------------------------------------------------------ */
const slides = computed(() => {
  if (!project.value) return [];
  const arr = [];
  if (project.value.featured_image_url) arr.push(project.value.featured_image_url);
  if (Array.isArray(project.value.images)) {
    project.value.images.forEach(img => img.image && arr.push(img.image));
  }
  return arr.map(url => resolveImageUrl(url));
});

const currentCaption = computed(() => {
  if (!project.value || slides.value.length === 0) return "";
  const idx = currentImg.value;
  if (idx === 0 && project.value.featured_image_url) return project.value.title;
  const galleryIdx = idx - (project.value.featured_image_url ? 1 : 0);
  return project.value.images?.[galleryIdx]?.caption || "";
});

/* ------------------------------------------------------------------ */
/*  Lightbox Controls                                                 */
/* ------------------------------------------------------------------ */
function openLightbox(i = 0) {
  currentImg.value = i;
  lightbox.value = true;
}
function prevImage() {
  if (slides.value.length <= 1) return;
  currentImg.value = (currentImg.value - 1 + slides.value.length) % slides.value.length;
}
function nextImage() {
  if (slides.value.length <= 1) return;
  currentImg.value = (currentImg.value + 1) % slides.value.length;
}

/* ------------------------------------------------------------------ */
/*  Description Clamp (Read More)                                     */
/* ------------------------------------------------------------------ */
async function checkClamp() {
  await nextTick();
  const el = document.querySelector(".project-description");
  if (!el) {
    isClamped.value = false;
    return;
  }
  const lineHeight = 28; // ~1.7em
  const maxHeight = lineHeight * 6;
  isClamped.value = el.scrollHeight > maxHeight + 5;
  if (!isClamped.value) showMore.value = false;
}

/* ------------------------------------------------------------------ */
/*  Load Project                                                      */
/* ------------------------------------------------------------------ */
async function loadProject() {
  loading.value = true;
  error.value = false;
  try {
    await store.loadProject(id.value);
    showMore.value = false;
    await checkClamp();
  } catch (err) {
    error.value = true;
    errorMessage.value = err.message || "خطا در بارگذاری پروژه";
  } finally {
    loading.value = false;
  }
}

/* ------------------------------------------------------------------ */
/*  Lifecycle & Watch                                                 */
/* ------------------------------------------------------------------ */
onMounted(loadProject);

watch(id, () => {
  loadProject();
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
function truncate(text, len) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len) + "…" : text;
}

function formatDate(date) {
  if (!date) return "نامشخص";
  return new Date(date).toLocaleDateString("fa-IR");
}

function statusColor(status) {
  const map = {
    "کامل شده": "success",
    "در حال توسعه": "warning",
    "متوقف شده": "error",
  };
  return map[status] || "grey";
}

function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl) return "https://via.placeholder.com/800x450/1a1a1a/ffffff?text=No+Image";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const api = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const base = api.replace(/\/api\/?$/, "");
  return `${base}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
</script>

<style scoped>
/* فونت فارسی */
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
.project-detail-page { font-family: 'Vazirmatn', sans-serif; }

/* Hero */
.hero-section {
  min-height: 55vh;
  max-height: 500px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
  filter: blur(1px);
  z-index: 1;
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%);
}
.z-10 { z-index: 10; }

.hero-title {
  font-size: 3.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00bcd4, #2196f3);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
.hero-subtitle {
  font-size: 1.3rem;
  color: #ccc;
  max-width: 700px;
  margin: 12px auto 0;
  line-height: 1.7;
}
.text-shadow { text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
.text-shadow-sm { text-shadow: 0 1px iquer 5px rgba(0,0,0,0.3); }

/* Content */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 60px !important;
}
.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #00bcd4;
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #00bcd4, transparent);
  border-radius: 2px;
}

/* Description */
.project-description {
  color: rgba(255,255,255,0.88);
  line-height: 1.7;
  font-size: 1.05rem;
  overflow: hidden;
  transition: max-height 0.3s ease;
  max-height: 10.2em; /* 6 lines */
}
.project-description.expanded {
  max-height: none;
}
.readmore-btn {
  text-transform: none;
  font-weight: 500;
}

/* Sidebar */
.sidebar-card {
  border-radius: 16px !important;
}
.meta-item {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.9);
  font-size: 0.95rem;
}
.tech-chip {
  font-size: 0.8rem;
}

/* Lightbox */
.bg-black { background: #000 !important; }
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 50;
  background: rgba(0,0,0,0.5);
}
.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  background: rgba(0,0,0,0.5);
}
.lightbox-nav.left { left: 16px; }
.lightbox-nav.right { right: 16px; }
.lightbox-img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px;
}
.lightbox-caption {
  color: #ddd;
  font-size: 0.9rem;
  font-style: italic;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-title { font-size: 2.6rem; }
  .hero-subtitle { font-size: 1.2rem; }
}
@media (max-width: 600px) {
  .hero-title { font-size: 2.2rem; }
  .content-section { padding-top: 40px !important; }
  .sidebar-card { margin-top: 32px; }
}
</style>
