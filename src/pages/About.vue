<template>
  <v-container fluid class="about-page pa-0">
    <!-- Hero Section -->
    <v-container
      class="hero-section d-flex flex-column justify-center align-center text-center"
      fluid
    >
      <h1 class="hero-name">سجاد حسین</h1>
      <p class="hero-title">توسعه‌دهنده فرانت‌اند و طراح وب</p>
      <!-- Profile Image overlapping hero -->
      <v-avatar size="160" class="profile-avatar">
        <img src="https://via.placeholder.com/160" alt="Sajjad Hossein" />
      </v-avatar>
    </v-container>

    <!-- Bio & Skills Section -->
    <v-container class="bio-section mt-20">
      <v-row dense align="center" justify="center">
        <!-- Bio -->
        <v-col cols="12" md="6">
          <h2 class="section-title mb-4">درباره من</h2>
          <p class="about-text">
            من سجاد هستم، توسعه‌دهنده وب با علاقه به طراحی رابط کاربری تمیز و مینیمال.
            تجربهٔ کار با Vue.js، Vuetify و Django REST Framework را دارم و همیشه دنبال یادگیری
            تکنولوژی‌های جدید و بهبود مهارت‌هایم هستم.
          </p>

          <!-- Skills -->
          <h3 class="skills-title mt-6 mb-3">مهارت‌ها</h3>
          <v-row dense>
            <v-col cols="12" v-for="skill in skills" :key="skill.name" class="mb-4">
              <div class="skill-name">{{ skill.name }}</div>
              <v-progress-linear
                :value="skill.level"
                height="14"
                rounded
                color="primary"
                striped
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-col>

        <!-- Empty space for layout on desktop -->
        <v-col cols="12" md="6"></v-col>
      </v-row>
    </v-container>

    <!-- Technologies Section -->
    <v-container class="mt-16 text-center">
      <h2 class="section-title mb-6">تکنولوژی‌ها</h2>
      <v-row dense justify="center" align="center">
        <v-col cols="auto" v-for="tech in technologies" :key="tech.name" class="mb-4">
          <v-chip outlined color="primary" class="tech-chip hover-scale">
            <v-icon left>{{ tech.icon }}</v-icon>
            {{ tech.name }}
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const skills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'Vuetify', level: 85 },
  { name: 'Django REST Framework', level: 80 },
  { name: 'JavaScript', level: 95 },
  { name: 'HTML & CSS', level: 95 },
  { name: 'Responsive Design', level: 90 },
])

const technologies = ref([
  { name: 'Vue.js', icon: 'mdi-vuejs' },
  { name: 'Vuetify', icon: 'mdi-vuetify' },
  { name: 'Django', icon: 'mdi-language-python' },
  { name: 'JavaScript', icon: 'mdi-language-javascript' },
  { name: 'HTML5', icon: 'mdi-language-html5' },
  { name: 'CSS3', icon: 'mdi-language-css3' },
  { name: 'Git', icon: 'mdi-git' },
])
</script>

<style scoped>
.about-page {
  font-family: "Shabnam", sans-serif;
  color: white;
}

/* Hero Section */
.hero-section {
  min-height: 40vh;
  background: linear-gradient(180deg, #1a1a1a, #111111);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 60px 20px;
}

.hero-name {
  font-size: 3rem;
  font-weight: 700;
}

.hero-title {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
}

/* Profile Avatar overlapping hero */
.profile-avatar {
  position: absolute;
  bottom: -80px;
  border: 4px solid #00bcd4;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

/* Bio Section */
.bio-section {
  margin-top: 100px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
}

.about-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.skills-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.skill-name {
  font-weight: 600;
  margin-bottom: 4px;
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
