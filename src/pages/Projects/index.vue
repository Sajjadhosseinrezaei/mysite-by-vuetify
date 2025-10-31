<template>
  <v-container fluid class="projects-page pa-0 overflow-hidden">
    <!-- Hero Section -->
    <section class="hero-section position-relative">
      <div class="hero-bg"></div>

      <v-container class="h-100 position-relative z-10">
        <v-row align="center" class="h-100">
          <v-col cols="12" class="text-center">
            <v-fade-transition appear>
              <div>
                <h1 class="hero-title text-shadow">پروژه‌ها</h1>
                <p class="hero-subtitle text-shadow-sm">
                  مجموعه‌ای از سیستم‌های واقعی که با پایتون، جنگو و فناوری‌های مدرن ساخته‌ام
                </p>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Projects Grid -->
    <v-container class="content-section py-16">
      <v-fade-transition>
        <div>
          <!-- Loading -->
          <div v-if="loading" class="text-center py-12">
            <v-progress-circular indeterminate size="56" color="primary" />
          </div>

          <!-- Error -->
          <div v-if="error" class="text-center py-12">
            <v-alert type="error" variant="outlined" class="mx-auto" max-width="500">
              {{ error }}
            </v-alert>
            <v-btn size="large" @click="loadProjects(page)" class="mt-4">تلاش مجدد</v-btn>
          </div>

          <!-- Projects -->
          <v-row dense v-else>
            <v-col
              v-for="proj in projects"
              :key="proj.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="mb-6"
            >
              <router-link :to="`/projects/${proj.id}`" class="project-link">
                <v-card
                  class="project-card h-100 d-flex flex-column elevation-8"
                  hover
                >
                  <!-- Image -->
                  <v-img
                    :src="resolveImageUrl(proj.featured_image_url)"
                    height="180"
                    cover
                    class="rounded-top"
                  >
                    <template #placeholder>
                      <v-skeleton-loader type="image" class="h-100" />
                    </template>
                  </v-img>

                  <!-- Body -->
                  <v-card-title class="text-h6 font-weight-bold pt-4">
                    {{ proj.title }}
                  </v-card-title>

                  <v-card-text class="flex-grow-1 text-body-2 pb-2">
                    {{ proj.short_description || truncate(proj.description, 100) }}
                  </v-card-text>

                  <!-- Footer -->
                  <v-card-actions class="mt-auto pb-4 px-4">
                    <v-chip
                      v-if="proj.category"
                      size="small"
                      color="primary"
                      variant="outlined"
                      class="me-2"
                    >
                      {{ proj.category.name }}
                    </v-chip>
                    <v-spacer />
                    <v-icon size="20" color="primary">mdi-arrow-right</v-icon>
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-col>
          </v-row>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="d-flex justify-center mt-12">
            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="7"
              color="primary"
              rounded
              @update:model-value="onPageChange"
            />
          </div>
        </div>
      </v-fade-transition>
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

const totalPages = computed(() => {
  return Math.ceil(totalCount.value / pageSize);
});

const onPageChange = (newPage) => {
  page.value = newPage;
  loadProjects(newPage);
};

const loadProjects = async (p = 1) => {
  await store.loadProjects(p);
};

onMounted(() => {
  loadProjects(page.value);
});

/* ------------------------------------------------------------------ */
/*  Helper: Truncate text                                              */
/* ------------------------------------------------------------------ */
function truncate(text, length) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "…" : text;
}

/* ------------------------------------------------------------------ */
/*  Resolve media URLs                                                */
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
.projects-page { font-family: 'Vazirmatn', sans-serif; }

/* Hero */
.hero-section {
  min-height: 50vh;
  max-height: 400px;
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
  font-size: 3.5rem;
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
.text-shadow-sm { text-shadow: 0 1px 5px rgba(0,0,0,0.3); }

/* Content */
.content-section {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 60px !important;
}

/* Project Card */
.project-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
.project-card {
  background: #1a1a1a;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
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
  padding: 0 16px 12px;
  line-height: 1.6;
}
.project-card .v-card-actions {
  padding: 0 16px 16px;
}

/* Pagination */
.v-pagination {
  --v-pagination-item-height: 40px;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-title { font-size: 3rem; }
}
@media (max-width: 960px) {
  .hero-title { font-size: 2.8rem; }
  .hero-subtitle { font-size: 1.2rem; }
}
@media (max-width: 600px) {
  .hero-title { font-size: 2.4rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .content-section { padding-top: 40px !important; }
}
</style>
