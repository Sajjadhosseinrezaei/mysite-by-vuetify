<template>
  <v-container fluid class="home-page pa-0 overflow-hidden">
    <!-- Hero Section - بدون دکمه -->
    <section class="hero-section position-relative">
      <div class="hero-bg"></div>

      <v-container class="h-100 position-relative z-10">
        <v-row align="center" class="h-100">
          <v-col cols="12" class="text-center">
            <v-fade-transition appear>
              <div>
                <h1 class="hero-title text-shadow">سلام! من سجاد حسین هستم</h1>
                <p class="hero-subtitle text-shadow-sm">
                  توسعه‌دهنده بک‌اند پایتون و جنگو<br>
                  <span class="highlight">سیستم‌های مقیاس‌پذیر</span> و <span class="highlight">امن</span>
                </p>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Featured Projects -->
    <v-container class="content-section py-16">
      <v-fade-transition>
        <div>
          <h2 class="section-title mb-8 text-center">برخی پروژه‌های برجسته</h2>

          <!-- Loading -->
          <div v-if="loading" class="text-center py-8">
            <v-progress-circular indeterminate size="48" color="primary" />
          </div>

          <!-- Error -->
          <div v-if="error" class="text-center py-8">
            <v-alert type="error" variant="outlined" class="mx-auto" max-width="500">
              {{ error }}
            </v-alert>
            <v-btn size="small" @click="projectsStore.loadProjects(true)">تلاش مجدد</v-btn>
          </div>

          <!-- Projects Grid -->
          <v-row dense justify="center" v-else>
            <v-col
              v-for="project in featuredProjects"
              :key="project.id"
              cols="12"
              sm="6"
              md="4"
              class="mb-6"
            >
              <!-- کارت قابل کلیک → به جزئیات -->
              <router-link :to="`/projects/${project.id}`" class="project-link">
                <v-card
                  class="project-card elevation-6 h-100 d-flex flex-column"
                  hover
                >
                  <!-- تصویر -->
                  <v-img
                    :src="resolveImageUrl(project.featured_image_url)"
                    height="200"
                    cover
                    class="rounded-top"
                  >
                    <template #placeholder>
                      <v-skeleton-loader type="image" class="h-100" />
                    </template>
                  </v-img>

                  <!-- عنوان -->
                  <v-card-title class="text-h6 font-weight-bold pt-4 px-4">
                    {{ project.title }}
                  </v-card-title>

                  <!-- توضیحات کوتاه -->
                  <v-card-text class="flex-grow-1 text-body-2 px-4 pb-2">
                    {{ project.short_description || "بدون توضیح کوتاه" }}
                  </v-card-text>

                  <!-- دکمه جزئیات -->
                  <v-card-actions class="mt-auto pb-4 px-4">
                    <v-chip size="small" color="primary" variant="outlined">
                      جزئیات
                    </v-chip>
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
          </v-row>

          <!-- دکمه مشاهده همه -->
          <div class="text-center mt-10">
            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              href="/projects"
              class="px-8"
            >
              مشاهده همه پروژه‌ها
            </v-btn>
          </div>
        </div>
      </v-fade-transition>
    </v-container>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();
const { projects, loading, error } = storeToRefs(projectsStore);

/* ------------------------------------------------------------------ */
/*  فقط پروژه‌های ویژه (is_featured) و تا 3 تا                     */
/* ------------------------------------------------------------------ */
const featuredProjects = computed(() => {
  return projects.value
    .filter(p => p.is_featured)
    .slice(0, 3);
});

onMounted(async () => {
  await projectsStore.loadProjects();
});

/* ------------------------------------------------------------------ */
/*  Resolve media URLs (برای عکس‌های نسبی)                          */
/* ------------------------------------------------------------------ */
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
.home-page { font-family: 'Vazirmatn', sans-serif; }

/* Hero */
.hero-section {
  min-height: 70vh;
  max-height: 600px;
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
  font-size: 3.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00bcd4, #2196f3);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
.hero-subtitle {
  font-size: 1.4rem;
  color: #ccc;
  max-width: 700px;
  margin: 16px auto 0;
  line-height: 1.7;
}
.highlight { color: #00bcd4; font-weight: 500; }
.text-shadow { text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
.text-shadow-sm { text-shadow: 0 1px 5px rgba(0,0,0,0.3); }

/* محتوا */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 60px !important;
}
.section-title {
  font-size: 2.6rem;
  font-weight: 600;
  color: #00bcd4;
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 70px;
  height: 4px;
  background: linear-gradient(90deg, #00bcd4, transparent);
  border-radius: 2px;
}

/* لینک پروژه */
.project-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

/* کارت پروژه */
.project-card {
  background: #1a1a1a;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  cursor: pointer;
}
.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
}
.project-card .v-img {
  transition: transform 0.3s ease;
}
.project-card:hover .v-img {
  transform: scale(1.05);
}
.project-card .v-card-title {
  color: white;
  padding: 16px 16px 8px;
}
.project-card .v-card-text {
  color: rgba(255, 255, 255, 0.75);
  padding: 0 16px 16px;
  line-height: 1.6;
}
.project-card .v-card-actions {
  padding: 0 16px 16px;
}

/* دکمه‌ها */
.v-btn {
  border-radius: 50px;
  text-transform: none;
  font-weight: 500;
}

/* ریسپانسیو */
@media (max-width: 960px) {
  .hero-title { font-size: 3rem; }
  .hero-subtitle { font-size: 1.2rem; }
}
@media (max-width: 600px) {
  .hero-title { font-size: 2.5rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .section-title { font-size: 2rem; }
  .content-section { padding-top: 40px !important; }
}
</style>
