<template>
  <v-container fluid class="project-detail-page pa-0">
    <!-- Hero / Project Title -->
    <v-container class="project-hero d-flex flex-column justify-center align-center text-center" fluid>
      <h1 class="project-title">{{ project.title }}</h1>
      <p class="project-subtitle">{{ project.shortDescription }}</p>
    </v-container>

    <!-- Project Image Carousel -->
    <v-container class="mt-10 text-center">
      <v-carousel hide-delimiters height="400">
        <v-carousel-item
          v-for="(img, index) in project.images"
          :key="index"
        >
          <v-img
            :src="img"
            height="400"
            class="cursor-pointer"
            @click="openLightbox(index)"
          ></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <!-- Lightbox Dialog -->
    <v-dialog v-model="lightbox" max-width="90vw" persistent>
      <v-card class="bg-transparent elevation-0">
        <!-- Close Button -->
        <v-btn icon class="close-btn" @click="lightbox = false">
          <v-icon color="white" size="32">mdi-close</v-icon>
        </v-btn>

        <!-- Full Image -->
        <v-img :src="project.images[currentImage]" max-height="90vh" contain></v-img>
      </v-card>
    </v-dialog>

    <!-- Project Description -->
    <v-container class="mt-10 max-width-800 mx-auto">
      <h2 class="section-title">توضیحات پروژه</h2>
      <p class="project-description">{{ project.description }}</p>
    </v-container>

    <!-- Technologies Used -->
    <v-container class="mt-8 text-center">
      <h2 class="section-title mb-4">تکنولوژی‌ها</h2>
      <v-row dense justify="center" align="center">
        <v-col cols="auto" v-for="tech in project.technologies" :key="tech.name" class="mb-4">
          <v-chip outlined color="primary" class="tech-chip hover-scale">
            <v-icon left>{{ tech.icon }}</v-icon>
            {{ tech.name }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>

    <!-- Links -->
    <v-container class="mt-8 text-center">
      <v-btn variant="contained" color="primary" :href="project.link" target="_blank" class="mx-2">
        مشاهده پروژه آنلاین
      </v-btn>
      <v-btn variant="outlined" color="primary" :href="project.github" target="_blank" class="mx-2">
        گیت‌هاب
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = Number(route.params.id)

// Example projects array with multiple images
const allProjects = [
  {
    id: 1,
    title: 'وبسایت نمونه اول',
    shortDescription: 'نمونه پروژه اول',
    description: 'این پروژه نمونه مهارت‌ها و طراحی من را نشان می‌دهد. توضیحات کامل درباره ویژگی‌ها و تکنولوژی‌های استفاده شده.',
    images: [
      'https://unsplash.it/800/400?image=1011',
      'https://unsplash.it/800/400?image=1012',
      'https://unsplash.it/800/400?image=1013',
    ],
    technologies: [
      { name: 'Vue.js', icon: 'mdi-vuejs' },
      { name: 'Vuetify', icon: 'mdi-vuetify' },
      { name: 'JavaScript', icon: 'mdi-language-javascript' },
    ],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'وبسایت نمونه دوم',
    shortDescription: 'نمونه پروژه دوم',
    description: 'توضیح کامل درباره پروژه دوم و ویژگی‌های آن.',
    images: [
      'https://unsplash.it/800/400?image=1025',
      'https://unsplash.it/800/400?image=1026',
    ],
    technologies: [
      { name: 'Vue.js', icon: 'mdi-vuejs' },
      { name: 'Django', icon: 'mdi-language-python' },
      { name: 'HTML5', icon: 'mdi-language-html5' },
    ],
    link: '#',
    github: '#',
  },
]

// Find project by id
const project = ref(allProjects.find(p => p.id === projectId) || allProjects[0])

// Lightbox logic
const lightbox = ref(false)
const currentImage = ref(0)

function openLightbox(index) {
  currentImage.value = index
  lightbox.value = true
}
</script>

<style scoped>
.project-detail-page {
  font-family: "Shabnam", sans-serif;
  color: white;
}

/* Hero Section */
.project-hero {
  min-height: 25vh;
  background: linear-gradient(180deg, #1a1a1a, #111111);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.project-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
}

.cursor-pointer {
  cursor: pointer;
}

/* Lightbox close button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: rgba(0,0,0,0.4);
}

/* Section Titles */
.section-title {
  font-size: 2rem;
  font-weight: 700;
}

.project-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

/* Technologies */
.tech-chip {
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  transition: transform 0.3s;
}

.tech-chip.hover-scale:hover {
  transform: scale(1.1);
}
</style>
