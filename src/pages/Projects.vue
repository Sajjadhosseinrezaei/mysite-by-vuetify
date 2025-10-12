<template>
  <v-container fluid class="projects-page pa-0">
    <!-- Hero Section -->
    <v-container class="projects-hero d-flex flex-column justify-center align-center text-center" fluid>
      <h1 class="hero-title">پروژه‌ها</h1>
      <p class="hero-subtitle mt-2">
        مجموعه‌ای از پروژه‌هایی که من طراحی و پیاده‌سازی کرده‌ام
      </p>
    </v-container>

    <!-- Projects Grid -->
    <v-container class="mt-12">
      <v-row dense justify="center">
        <v-col
          v-for="project in paginatedProjects"
          :key="project.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="project-card hover-scale">
            <v-img :src="project.image" height="180" class="rounded-top"></v-img>
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
            <v-card-actions>
              <v-btn variant="text" :href="project.link" target="_blank">
                مشاهده پروژه
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Pagination -->
<v-row justify="center" class="mt-8" v-if="totalPages > 1">
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    color="primary"
    prev-icon="mdi-chevron-right"
    next-icon="mdi-chevron-left"
    circle
    total-visible="5"
  ></v-pagination>
</v-row>

    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Example projects array (replace with your real projects)
const projects = ref([
  { id: 1, title: 'پروژه ۱', description: 'توضیح پروژه ۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 2, title: 'پروژه ۲', description: 'توضیح پروژه ۲', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 3, title: 'پروژه ۳', description: 'توضیح پروژه ۳', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 4, title: 'پروژه ۴', description: 'توضیح پروژه ۴', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 5, title: 'پروژه ۵', description: 'توضیح پروژه ۵', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 6, title: 'پروژه ۶', description: 'توضیح پروژه ۶', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 7, title: 'پروژه ۷', description: 'توضیح پروژه ۷', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 8, title: 'پروژه ۸', description: 'توضیح پروژه ۸', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 9, title: 'پروژه ۹', description: 'توضیح پروژه ۹', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 10, title: 'پروژه ۱۰', description: 'توضیح پروژه ۱۰', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 11, title: 'پروژه ۱۱', description: 'توضیح پروژه ۱۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 12, title: 'پروژه ۱۲', description: 'توضیح پروژه ۱۲', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 1, title: 'پروژه ۱', description: 'توضیح پروژه ۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 2, title: 'پروژه ۲', description: 'توضیح پروژه ۲', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 3, title: 'پروژه ۳', description: 'توضیح پروژه ۳', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 4, title: 'پروژه ۴', description: 'توضیح پروژه ۴', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 5, title: 'پروژه ۵', description: 'توضیح پروژه ۵', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 6, title: 'پروژه ۶', description: 'توضیح پروژه ۶', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 7, title: 'پروژه ۷', description: 'توضیح پروژه ۷', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 8, title: 'پروژه ۸', description: 'توضیح پروژه ۸', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 9, title: 'پروژه ۹', description: 'توضیح پروژه ۹', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 10, title: 'پروژه ۱۰', description: 'توضیح پروژه ۱۰', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 11, title: 'پروژه ۱۱', description: 'توضیح پروژه ۱۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 12, title: 'پروژه ۱۲', description: 'توضیح پروژه ۱۲', image: 'https://via.placeholder.com/400x180', link: '#' },
    { id: 6, title: 'پروژه ۶', description: 'توضیح پروژه ۶', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 7, title: 'پروژه ۷', description: 'توضیح پروژه ۷', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 8, title: 'پروژه ۸', description: 'توضیح پروژه ۸', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 9, title: 'پروژه ۹', description: 'توضیح پروژه ۹', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 10, title: 'پروژه ۱۰', description: 'توضیح پروژه ۱۰', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 11, title: 'پروژه ۱۱', description: 'توضیح پروژه ۱۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 12, title: 'پروژه ۱۲', description: 'توضیح پروژه ۱۲', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 1, title: 'پروژه ۱', description: 'توضیح پروژه ۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 2, title: 'پروژه ۲', description: 'توضیح پروژه ۲', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 3, title: 'پروژه ۳', description: 'توضیح پروژه ۳', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 4, title: 'پروژه ۴', description: 'توضیح پروژه ۴', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 5, title: 'پروژه ۵', description: 'توضیح پروژه ۵', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 6, title: 'پروژه ۶', description: 'توضیح پروژه ۶', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 7, title: 'پروژه ۷', description: 'توضیح پروژه ۷', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 8, title: 'پروژه ۸', description: 'توضیح پروژه ۸', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 9, title: 'پروژه ۹', description: 'توضیح پروژه ۹', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 10, title: 'پروژه ۱۰', description: 'توضیح پروژه ۱۰', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 11, title: 'پروژه ۱۱', description: 'توضیح پروژه ۱۱', image: 'https://via.placeholder.com/400x180', link: '#' },
  { id: 12, title: 'پروژه ۱۲', description: 'توضیح پروژه ۱۲', image: 'https://via.placeholder.com/400x180', link: '#' },
])

const currentPage = ref(1)
const projectsPerPage = 9

const totalPages = computed(() => Math.ceil(projects.value.length / projectsPerPage))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage
  return projects.value.slice(start, start + projectsPerPage)
})
</script>

<style scoped>
.projects-page {
  font-family: "Shabnam", sans-serif;
  color: white;
}

.projects-hero {
  min-height: 25vh;
  background: linear-gradient(180deg, #1a1a1a, #111111);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.project-card {
  background-color: #222;
  color: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.project-card .v-card-title {
  font-weight: 600;
}

.project-card .v-card-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
