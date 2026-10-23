<template>
  <v-container fluid class="project-detail-page pa-0 overflow-hidden">
    <!-- Hero -->
    <section v-if="project" class="hero-section position-relative">
      <div class="hero-bg" aria-hidden="true">
        <div class="hero-web hero-web--one"></div>
        <div class="hero-web hero-web--two"></div>
        <div class="hero-halftone"></div>
      </div>

      <v-container class="hero-content h-100">
        <v-row align="center" justify="center" class="h-100">
          <v-col cols="12" class="text-center">
            <v-fade-transition appear>
              <div>
                <div class="hero-kicker">
                  <span class="kicker-line"></span>
                  <span>PROJECT FILE</span>
                  <span class="kicker-line"></span>
                </div>

                <h1 class="hero-title">{{ project.title }}</h1>

                <p class="hero-subtitle">
                  {{ project.short_description || truncate(project.description, 120) }}
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

    <!-- Loading -->
    <div v-if="loading" class="state-container" role="status" aria-live="polite">
      <v-progress-circular indeterminate size="52" width="4" color="primary" />
      <p class="state-text">در حال بارگذاری اطلاعات پروژه...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-container">
      <div class="state-icon state-icon--error">
        <v-icon size="32">mdi-alert-circle-outline</v-icon>
      </div>
      <h3 class="state-title">بارگذاری پروژه ناموفق بود</h3>
      <p class="state-text">{{ errorMessage }}</p>
      <v-btn color="primary" rounded="lg" class="mt-4" @click="loadProject">
        <v-icon start>mdi-refresh</v-icon>
        تلاش مجدد
      </v-btn>
    </div>

    <!-- Content -->
    <v-container v-else-if="project" class="content-section">
      <!-- Breadcrumb / back link -->
      <div class="top-navigation">
        <v-btn
          to="/projects"
          variant="text"
          color="primary"
          prepend-icon="mdi-arrow-right"
          class="back-btn"
        >
          بازگشت به پروژه‌ها
        </v-btn>
      </div>

      <!-- Gallery -->
      <section v-if="slides.length" class="gallery-section">
        <div class="section-heading">
          <div>
            <p class="section-eyebrow">VISUAL ARCHIVE</p>
            <h2 class="section-title">گالری پروژه</h2>
          </div>
          <span class="gallery-counter">
            {{ slides.length }} تصویر
          </span>
        </div>

        <v-carousel
          v-model="carouselIndex"
          hide-delimiters
          height="clamp(240px, 48vw, 470px)"
          show-arrows="hover"
          class="project-carousel"
        >
          <v-carousel-item
            v-for="(src, idx) in slides"
            :key="`${src.url}-${idx}`"
          >
            <button
              type="button"
              class="gallery-image-button"
              :aria-label="`نمایش بزرگ تصویر ${idx + 1}`"
              @click="openLightbox(idx)"
            >
              <v-img
                :src="src.url"
                :alt="`تصویر ${idx + 1} از پروژه ${project.title}`"
                height="100%"
                cover
                class="gallery-image"
              >
                <template #placeholder>
                  <div class="image-placeholder">
                    <v-progress-circular indeterminate color="primary" />
                  </div>
                </template>
                <template #error>
                  <div class="image-placeholder">
                    <v-icon size="42">mdi-image-off-outline</v-icon>
                    <span>تصویر بارگذاری نشد</span>
                  </div>
                </template>
              </v-img>
              <span class="gallery-zoom">
                <v-icon>mdi-magnify-plus-outline</v-icon>
                نمایش بزرگ
              </span>
            </button>
          </v-carousel-item>
        </v-carousel>
      </section>

      <!-- Project information -->
      <v-row class="details-layout" align="start">
        <v-col cols="12" md="8">
          <section class="description-panel">
            <div class="section-heading">
              <div>
                <p class="section-eyebrow">ABOUT THIS PROJECT</p>
                <h2 class="section-title">توضیحات پروژه</h2>
              </div>
            </div>

            <!-- v-html requires sanitized HTML from a trusted source -->
            <div
              ref="descriptionElement"
              :class="['project-description', { expanded: showMore }]"
              v-html="safeDescription"
            ></div>

            <div v-if="isClamped" class="readmore-container">
              <v-btn
                variant="text"
                color="primary"
                @click="showMore = !showMore"
                class="readmore-btn"
              >
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
                <v-icon end>
                  {{ showMore ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </v-btn>
            </div>
          </section>
        </v-col>

        <v-col cols="12" md="4">
          <aside class="sidebar-card">
            <div class="sidebar-heading">
              <span class="sidebar-heading-icon">
                <v-icon>mdi-file-document-outline</v-icon>
              </span>
              <div>
                <p class="section-eyebrow">PROJECT DETAILS</p>
                <h2 class="sidebar-title">اطلاعات پروژه</h2>
              </div>
            </div>

            <div class="meta-list">
              <div class="meta-item">
                <span class="meta-icon">
                  <v-icon>mdi-folder-outline</v-icon>
                </span>
                <div class="meta-content">
                  <span class="meta-label">دسته‌بندی</span>
                  <span class="meta-value">
                    {{ project.category?.name || "نامشخص" }}
                  </span>
                </div>
              </div>

              <div class="meta-item">
                <span class="meta-icon">
                  <v-icon>mdi-check-circle-outline</v-icon>
                </span>
                <div class="meta-content">
                  <span class="meta-label">وضعیت</span>
                  <v-chip
                    size="small"
                    :color="statusColor(project.status)"
                    variant="tonal"
                    class="status-chip"
                  >
                    {{ statusLabel(project.status) }}
                  </v-chip>
                </div>
              </div>

              <div class="meta-item">
                <span class="meta-icon">
                  <v-icon>mdi-calendar-month-outline</v-icon>
                </span>
                <div class="meta-content">
                  <span class="meta-label">تاریخ ثبت</span>
                  <span class="meta-value">{{ formatDate(project.created_at) }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="project.demo_url || project.github_url"
              class="project-actions"
            >
              <v-btn
                v-if="project.demo_url"
                :href="project.demo_url"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="flat"
                block
                size="large"
                prepend-icon="mdi-open-in-new"
                class="action-btn"
              >
                مشاهده دمو
              </v-btn>

              <v-btn
                v-if="project.github_url"
                :href="project.github_url"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="white"
                block
                size="large"
                prepend-icon="mdi-github"
                class="action-btn github-btn"
              >
                مشاهده کد در گیت‌هاب
              </v-btn>
            </div>

            <div v-if="project.technologies?.length" class="technologies-section">
              <p class="section-eyebrow">BUILT WITH</p>
              <h3 class="technologies-title">تکنولوژی‌ها</h3>

              <div class="tech-chips">
                <v-chip
                  v-for="tech in project.technologies"
                  :key="tech.id ?? tech.name"
                  size="small"
                  variant="outlined"
                  class="tech-chip"
                  :style="{
                    '--tech-color': tech.color || '#36a9ff'
                  }"
                >
                  <span class="tech-dot"></span>
                  {{ tech.name }}
                </v-chip>
              </div>
            </div>
          </aside>
        </v-col>
      </v-row>
    </v-container>

    <!-- Lightbox -->
    <v-dialog
      v-model="lightbox"
      max-width="1200"
      width="95vw"
      content-class="project-lightbox-dialog"
    >
      <v-card class="lightbox-card">
        <div class="lightbox-toolbar">
          <span class="lightbox-count">
            {{ currentImg + 1 }} / {{ slides.length }}
          </span>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            aria-label="بستن نمایش تصویر"
            @click="lightbox = false"
          />
        </div>

        <div class="lightbox-img-container">
          <v-btn
            icon="mdi-chevron-right"
            variant="tonal"
            class="lightbox-nav lightbox-nav--right"
            aria-label="تصویر قبلی"
            :disabled="slides.length <= 1"
            @click="prevImage"
          />

          <v-img
            v-if="slides[currentImg]?.url"
            :src="slides[currentImg].url"
            :alt="`تصویر ${currentImg + 1} از پروژه ${project?.title || ''}`"
            max-height="78vh"
            width="100%"
            contain
            class="lightbox-image"
          />

          <v-btn
            icon="mdi-chevron-left"
            variant="tonal"
            class="lightbox-nav lightbox-nav--left"
            aria-label="تصویر بعدی"
            :disabled="slides.length <= 1"
            @click="nextImage"
          />
        </div>

        <div v-if="currentCaption" class="lightbox-caption">
          {{ currentCaption }}
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useProjectsStore } from "@/stores/projects";
import DOMPurify from "dompurify";

const store = useProjectsStore();
const route = useRoute();

const id = computed(() => route.params.id);
const project = computed(() => store.currentProject);

const loading = ref(false);
const error = ref(false);
const errorMessage = ref("");

const lightbox = ref(false);
const currentImg = ref(0);
const carouselIndex = ref(0);

const showMore = ref(false);
const isClamped = ref(false);
const descriptionElement = ref(null);

let requestNumber = 0;
let resizeObserver;

const safeDescription = computed(() => {
  const description = project.value?.description;
  if (typeof description !== "string") return "";
  return DOMPurify.sanitize(description);
});

/*
 * Featured image is first. Gallery images follow it.
 * URLs are normalized before being passed to v-img.
 */
const slides = computed(() => {
  if (!project.value) return [];

  const images = [];
  const featured = project.value.featured_image_url;

  if (featured) {
    images.push({
      url: resolveImageUrl(featured),
      caption: project.value.title || "",
    });
  }

  if (Array.isArray(project.value.images)) {
    for (const image of project.value.images) {
      const imagePath = image?.image || image?.image_url;
      if (!imagePath) continue;

      const url = resolveImageUrl(imagePath);
      if (!url) continue;

      // Avoid repeating the featured image when the API includes it in the gallery.
      if (images.some((item) => item.url === url)) continue;

      images.push({
        url,
        caption: image.caption || "",
      });
    }
  }

  return images;
});

const currentCaption = computed(() => {
  return slides.value[currentImg.value]?.caption || "";
});

/*
 * Sanitizing HTML before v-html is important if descriptions can be edited
 * through an admin panel or supplied by users.
 */
async function checkClamp() {
  await nextTick();

  const el = descriptionElement.value;
  if (!el) {
    isClamped.value = false;
    return;
  }

  const style = window.getComputedStyle(el);
  const lineHeight = Number.parseFloat(style.lineHeight);
  const maxHeight = Number.isFinite(lineHeight) ? lineHeight * 6 : 180;

  isClamped.value = el.scrollHeight > maxHeight + 4;

  if (!isClamped.value) {
    showMore.value = false;
  }
}

async function loadProject() {
  const currentRequest = ++requestNumber;

  loading.value = true;
  error.value = false;
  errorMessage.value = "";
  lightbox.value = false;
  showMore.value = false;
  currentImg.value = 0;
  carouselIndex.value = 0;

  try {
    await store.loadProject(id.value);

    // Ignore results from an older route request.
    if (currentRequest !== requestNumber) return;

    if (!store.currentProject) {
      throw new Error("پروژه‌ای با این شناسه پیدا نشد.");
    }

    await checkClamp();
  } catch (err) {
    if (currentRequest !== requestNumber) return;

    error.value = true;
    errorMessage.value =
      err?.response?.data?.detail ||
      err?.message ||
      "خطا در بارگذاری پروژه. لطفاً دوباره تلاش کنید.";
  } finally {
    if (currentRequest === requestNumber) {
      loading.value = false;
    }
  }
}

function openLightbox(index = 0) {
  if (!slides.value.length) return;
  currentImg.value = Math.min(Math.max(index, 0), slides.value.length - 1);
  lightbox.value = true;
}

function prevImage() {
  if (slides.value.length <= 1) return;
  currentImg.value =
    (currentImg.value - 1 + slides.value.length) % slides.value.length;
}

function nextImage() {
  if (slides.value.length <= 1) return;
  currentImg.value = (currentImg.value + 1) % slides.value.length;
}

function handleKeydown(event) {
  if (!lightbox.value) return;

  if (event.key === "Escape") {
    lightbox.value = false;
  } else if (event.key === "ArrowLeft") {
    nextImage();
  } else if (event.key === "ArrowRight") {
    prevImage();
  }
}

function truncate(text, length) {
  if (typeof text !== "string" || !text) return "";
  const plainText = text.replace(/<[^>]*>/g, "");
  return plainText.length > length
    ? `${plainText.slice(0, length).trimEnd()}…`
    : plainText;
}

function formatDate(date) {
  if (!date) return "نامشخص";

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "نامشخص";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

function statusLabel(status) {
  const labels = {
    completed: "تکمیل‌شده",
    "in_progress": "در حال توسعه",
    paused: "متوقف‌شده",
    "کامل شده": "تکمیل‌شده",
    "در حال توسعه": "در حال توسعه",
    "متوقف شده": "متوقف‌شده",
  };

  return labels[status] || status || "نامشخص";
}

function statusColor(status) {
  const colors = {
    completed: "success",
    "in_progress": "warning",
    paused: "error",
    "کامل شده": "success",
    "در حال توسعه": "warning",
    "متوقف شده": "error",
  };

  return colors[status] || "grey";
}

function resolveImageUrl(pathOrUrl) {
  if (typeof pathOrUrl !== "string" || !pathOrUrl.trim()) return null;

  const path = pathOrUrl.trim();

  if (/^https?:\/\//i.test(path)) return path;

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");

  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

watch(id, () => {
  loadProject();
});

watch(
  () => project.value?.description,
  () => {
    checkClamp();
  }
);

watch(lightbox, (isOpen) => {
  if (isOpen) {
    window.addEventListener("keydown", handleKeydown);
  } else {
    window.removeEventListener("keydown", handleKeydown);
  }
});

onMounted(() => {
  loadProject();

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => {
      checkClamp();
    });

    if (descriptionElement.value) {
      resizeObserver.observe(descriptionElement.value);
    }
  }
});

onBeforeUnmount(() => {
  requestNumber++;
  window.removeEventListener("keydown", handleKeydown);
  resizeObserver?.disconnect();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap");

.project-detail-page {
  min-height: 100vh;
  color: #f7f7fb;
  background:
    radial-gradient(ellipse at 7% 25%, rgba(227, 34, 70, 0.07), transparent 32%),
    radial-gradient(ellipse at 92% 58%, rgba(35, 142, 255, 0.07), transparent 30%),
    #090a10;
  font-family: "Vazirmatn", sans-serif;
}

/* Hero */
.hero-section {
  min-height: 360px;
  height: min(52vh, 480px);
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
    linear-gradient(118deg, rgba(8, 9, 16, 0.98) 5%, rgba(17, 12, 25, 0.92) 52%, rgba(8, 14, 27, 0.97) 100%);
}

.hero-bg::before {
  content: "";
  opacity: 0.42;
  background-image: radial-gradient(rgba(255, 255, 255, 0.23) 0.8px, transparent 0.8px);
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
}

.hero-web::before,
.hero-web::after {
  position: absolute;
  inset: 14%;
  content: "";
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
  top: 18%;
  right: 8%;
  width: 220px;
  height: 220px;
  opacity: 0.2;
  background-image: radial-gradient(#ef3156 1.2px, transparent 1.2px);
  background-size: 9px 9px;
  mask-image: radial-gradient(circle, #000 0, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 1;
  height: 100%;
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
  letter-spacing: 0.22em;
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
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.4;
  font-weight: 900;
  overflow-wrap: anywhere;
  text-shadow: 4px 4px 0 rgba(229, 35, 75, 0.72), -3px -2px 0 rgba(32, 142, 255, 0.65);
}

.hero-subtitle {
  max-width: 760px;
  margin: 16px auto 0;
  color: #c5cad5;
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  line-height: 2;
}

.hero-accent {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 26px;
}

.hero-accent span {
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
  max-width: 1320px;
  margin: 0 auto;
  padding: 36px 26px 88px !important;
}

.top-navigation {
  margin-bottom: 28px;
}

.back-btn {
  font-weight: 700;
}

.gallery-section {
  margin-bottom: 56px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.section-eyebrow {
  margin: 0 0 7px;
  color: #ed4565;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.section-title {
  margin: 0;
  color: #f8f8fc;
  font-size: clamp(1.35rem, 3vw, 1.8rem);
  font-weight: 800;
  line-height: 1.6;
}

.gallery-counter {
  padding: 7px 12px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 9px;
  color: #aeb4c1;
  background: rgba(255, 255, 255, 0.035);
  white-space: nowrap;
  font-size: 0.8rem;
}

.project-carousel {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 18px;
  background: #12141d;
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
}

.gallery-image-button {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: #12141d;
  cursor: zoom-in;
  text-align: inherit;
}

.gallery-image {
  height: 100%;
}

.gallery-image-button::after {
  position: absolute;
  inset: 45% 0 0;
  content: "";
  pointer-events: none;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.32));
}

.gallery-zoom {
  position: absolute;
  z-index: 2;
  right: 18px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  color: #fff;
  background: rgba(7, 8, 13, 0.72);
  font-size: 0.8rem;
  backdrop-filter: blur(8px);
}

.image-placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #9ca5b6;
  background:
    radial-gradient(circle at 20% 25%, rgba(237, 49, 86, 0.12), transparent 35%),
    radial-gradient(circle at 80% 70%, rgba(38, 143, 255, 0.13), transparent 36%),
    #141620;
}

/* Description */
.details-layout {
  row-gap: 28px;
}

.description-panel {
  min-width: 0;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(23, 25, 35, 0.94), rgba(15, 16, 24, 0.96));
}

.project-description {
  max-height: 10.8em;
  overflow: hidden;
  color: rgba(245, 246, 250, 0.86);
  font-size: 1rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
  transition: max-height 250ms ease;
}

.project-description.expanded {
  max-height: none;
}

/* Rich text from the project description */
.project-description :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.project-description :deep(pre),
.project-description :deep(code) {
  max-width: 100%;
  overflow-x: auto;
  direction: ltr;
  text-align: left;
}

.project-description :deep(a) {
  color: #65baff;
  text-decoration: underline;
}

.project-description :deep(h1),
.project-description :deep(h2),
.project-description :deep(h3),
.project-description :deep(h4) {
  margin: 1.2em 0 0.5em;
  color: #fff;
}

.readmore-container {
  margin-top: 16px;
  text-align: center;
}

.readmore-btn {
  font-weight: 700;
}

/* Sidebar */
.sidebar-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  background: linear-gradient(145deg, #171923 0%, #101119 100%);
}

.sidebar-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  content: "";
  background: linear-gradient(90deg, #268fff, #ed3156);
}

.sidebar-heading {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 24px;
}

.sidebar-heading-icon {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  flex: 0 0 44px;
  border: 1px solid rgba(38, 143, 255, 0.3);
  border-radius: 12px;
  color: #55b4ff;
  background: rgba(38, 143, 255, 0.08);
}

.sidebar-heading .section-eyebrow {
  margin-bottom: 3px;
}

.sidebar-title {
  margin: 0;
  color: #f8f8fc;
  font-size: 1.15rem;
  font-weight: 800;
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.meta-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.meta-icon {
  display: flex;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #65baff;
  background: rgba(38, 143, 255, 0.08);
}

.meta-content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.meta-label {
  color: #8992a5;
  font-size: 0.78rem;
}

.meta-value {
  color: #f0f1f5;
  font-size: 0.9rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.status-chip {
  font-weight: 700;
}

.project-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 25px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}

.action-btn {
  min-height: 46px;
  font-weight: 700;
  letter-spacing: 0;
}

.github-btn {
  border-color: rgba(255, 255, 255, 0.25);
}

.technologies-section {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}

.technologies-title {
  margin: 0 0 15px;
  color: #f8f8fc;
  font-size: 1rem;
  font-weight: 800;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tech-chip {
  margin: 0;
  border-color: var(--tech-color) !important;
  color: var(--tech-color) !important;
  font-weight: 600;
}

.tech-dot {
  width: 6px;
  height: 6px;
  margin-inline-end: 7px;
  border-radius: 50%;
  background: currentColor;
}

/* Loading and error */
.state-container {
  display: flex;
  min-height: 340px;
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
  border: 1px solid rgba(237, 49, 86, 0.35);
  border-radius: 18px;
  color: #ff6079;
  background: rgba(237, 49, 86, 0.08);
}

.state-title {
  margin: 0 0 8px;
  color: #f8f8fc;
  font-size: 1.15rem;
  font-weight: 800;
}

.state-text {
  margin: 14px 0 0;
  color: #aeb4c1;
  line-height: 1.9;
}

/* Lightbox */
.lightbox-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px !important;
  color: #fff;
  background: #08090e !important;
}

.lightbox-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.lightbox-count {
  color: #b9c0cf;
  font-size: 0.82rem;
  direction: ltr;
}

.lightbox-img-container {
  position: relative;
  display: flex;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  padding: 20px 64px;
}

.lightbox-image {
  max-width: 100%;
}

.lightbox-nav {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.lightbox-nav--left {
  left: 12px;
}

.lightbox-nav--right {
  right: 12px;
}

.lightbox-caption {
  padding: 12px 18px 18px;
  color: #c6ccda;
  text-align: center;
  font-size: 0.88rem;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-section {
    min-height: 340px;
    height: 400px;
  }

  .content-section {
    padding: 28px 20px 64px !important;
  }

  .description-panel {
    padding: 23px;
  }
}

@media (max-width: 600px) {
  .hero-section {
    min-height: 330px;
    height: auto;
    padding: 64px 0;
  }

  .hero-kicker {
    font-size: 0.62rem;
    letter-spacing: 0.15em;
  }

  .hero-subtitle {
    font-size: 0.94rem;
  }

  .hero-web--one {
    left: -270px;
  }

  .hero-web--two {
    right: -330px;
  }

  .content-section {
    padding: 24px 14px 48px !important;
  }

  .top-navigation {
    margin-bottom: 20px;
  }

  .gallery-section {
    margin-bottom: 36px;
  }

  .section-heading {
    align-items: flex-start;
  }

  .description-panel {
    padding: 19px;
  }

  .sidebar-card {
    padding: 20px;
  }

  .lightbox-img-container {
    min-height: 240px;
    padding: 16px 48px;
  }

  .lightbox-nav--left {
    left: 4px;
  }

  .lightbox-nav--right {
    right: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
