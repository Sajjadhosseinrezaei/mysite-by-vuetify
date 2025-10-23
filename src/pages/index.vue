<template>
  <v-container fluid class="home-page pa-0">
    <!-- Hero Section -->
    <v-container
      class="hero-section d-flex flex-column justify-center align-center text-center"
      fluid
    >
      <h1 class="hero-title">سلام! من سجاد حسین هستم</h1>
      <p class="hero-subtitle mb-4">
        توسعه‌دهنده بک‌اند با پایتون و فریم‌ورک جنگو، علاقه‌مند به ساخت
        سیستم‌های مقیاس‌پذیر و ساختارمند
      </p>
      <v-btn
        color="primary"
        variant="elevated"
        class="hero-btn"
        href="/projects"
      >
        مشاهده پروژه‌ها
      </v-btn>
    </v-container>

    <!-- Featured Projects -->
    <v-container id="projects" class="mt-12">
      <h2 class="section-title mb-6 text-center">برخی پروژه‌ها</h2>

      <v-row dense justify="center">
        <v-col
          v-for="project in featuredProjects"
          :key="project.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="project-card hover-scale">
            <v-img
              :src="project.image"
              height="180"
              class="rounded-top"
            ></v-img>
            <v-card-title>{{ project.title }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
            <v-card-actions>
              <v-btn variant="text" :href="project.link" target="_blank">
                جزئیات
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- See All Projects -->
      <div class="text-center mt-8">
        <v-btn color="secondary" variant="outlined" href="/projects">
          مشاهده همه پروژه‌ها
        </v-btn>
      </div>
    </v-container>

    <!-- About Section -->
    <v-container id="about" class="mt-12 text-center">
      <h2 class="section-title mb-4">درباره من</h2>
      <p class="section-text">
        من سجاد هستم، توسعه‌دهنده بک‌اند با پایتون و فریم‌ورک جنگو. تمرکز من روی
        طراحی و پیاده‌سازی APIهای تمیز، امن و مقیاس‌پذیر است. تجربه کار با
        Django REST Framework، Docker و Nginx دارم و همیشه به دنبال یادگیری
        ابزارها و فناوری‌های جدید برای بهینه‌تر کردن پروژه‌ها هستم.
      </p>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
</script>

<style scoped>
.home-page {
  font-family: "Shabnam", sans-serif;
  color: white;
}

.hero-section {
  min-height: 60vh;
  background: linear-gradient(180deg, #1a1a1a, #111111);
  padding: 80px 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

.hero-btn {
  margin-top: 24px;
  font-weight: 700;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
}

.section-text {
  color: rgba(255, 255, 255, 0.7);
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
}

.project-card {
  background-color: #222;
  color: white;
  transition: transform 0.2s;
}

.project-card.hover-scale:hover {
  transform: translateY(-4px);
}

.project-card .v-card-title {
  font-weight: 600;
}

.project-card .v-card-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
