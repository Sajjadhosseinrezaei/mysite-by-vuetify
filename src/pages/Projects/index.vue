<template>
  <v-container fluid class="projects-page pa-0">
    <!-- Hero -->
    <v-container class="projects-hero d-flex flex-column justify-center align-center text-center" fluid>
      <h1 class="hero-title">پروژه‌ها</h1>
      <p class="hero-subtitle mt-2">مجموعه‌ای از پروژه‌هایی که من طراحی و پیاده‌سازی کرده‌ام</p>
    </v-container>

    <v-container class="mt-10">
      <!-- Loading / Error could be added here if needed -->

      <!-- Grid -->
      <div class="projects-grid">
        <article
          v-for="proj in store.projects"
          :key="proj.id"
          class="project-card"
        >
          <router-link :to="`/projects/${proj.id}`" class="card-link">
            <div class="card-media">
              <img :src="proj.featured_image_url || placeholder" alt="" />
            </div>

            <div class="card-body">
              <h3 class="card-title">{{ proj.title }}</h3>
              <p class="card-desc">{{ proj.short_description || proj.description }}</p>
            </div>

            <div class="card-footer">
              <span class="chip-category" v-if="proj.category">{{ proj.category.name }}</span>
              <v-btn small variant="text" color="primary">مشاهده</v-btn>
            </div>
          </router-link>
        </article>
      </div>

      <!-- Pagination -->
      <div class="pagination-row" v-if="store.totalCount > 9">
        <v-pagination
          v-model="page"
          :length="Math.ceil(store.totalCount / 9)"
          color="primary"
          total-visible="5"
          @update:model-value="onPageChange"
        />
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const page = ref(1)
const placeholder = 'https://via.placeholder.com/800x450?text=No+Image'

const onPageChange = (newPage) => {
  page.value = newPage
  store.loadProjects(newPage)
}

onMounted(() => {
  store.loadProjects(page.value)
})
</script>

<style scoped>
/* font: make sure Shabnam is loaded globally (see note) */
.projects-page { font-family: "Shabnam", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #fff; }

/* Hero */
.projects-hero {
  min-height: 22vh;
  background: linear-gradient(180deg, #0f1720, #0b0f14);
  padding: 36px 20px;
}
.hero-title { font-size: 2.2rem; font-weight: 700; margin: 0; }
.hero-subtitle { color: rgba(255,255,255,0.72); margin-top: 8px; }

/* Grid: responsive, equal-height cards */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  align-items: stretch; /* cards stretch to equal height */
}

/* Card */
.project-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform .22s ease, box-shadow .22s ease;
  box-shadow: 0 6px 18px rgba(2,6,23,0.6);
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 40px rgba(2,6,23,0.7);
}

/* Make the entire card clickable via link */
.card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

/* media */
.card-media {
  width: 100%;
  height: 160px;
  background: #111;
}
.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* body */
.card-body {
  padding: 12px 14px;
  flex: 1 1 auto; /* allow description to grow */
}
.card-title {
  margin: 0 0 8px 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}
.card-desc {
  margin: 0;
  color: rgba(255,255,255,0.72);
  font-size: 0.95rem;
  line-height: 1.45;
  max-height: 3.6em; /* clamp to ~2 lines visually */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* footer: bottom aligned */
.card-footer {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 10px 12px;
  border-top: 1px solid rgba(255,255,255,0.03);
}
.chip-category {
  background: rgba(255,255,255,0.03);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.9);
}

/* pagination */
.pagination-row {
  margin-top: 28px;
  display:flex;
  justify-content:center;
}

/* responsive tweaks */
@media (max-width: 900px) {
  .card-media { height: 140px; }
}
@media (max-width: 520px) {
  .card-media { height: 120px; }
  .projects-grid { gap: 12px; }
}
</style>
