<template>
  <v-container fluid class="about-page pa-0">
    <!-- Hero Section -->
    <v-container
      v-if="profileStore.profile"
      class="hero-section d-flex flex-column justify-center align-center text-center"
      fluid
    >
      <h1 class="hero-name">{{ profileStore.profile.name }}</h1>
      <p class="hero-title">{{ profileStore.profile.title }}</p>

      <!-- Profile Image overlapping hero -->
      <v-avatar size="180" class="mx-auto elevation-3 profile-avatar">
        <v-img
          :src="profileStore.profile.profile_image"
          alt="Profile picture"
          cover
          class="profile-image"
        />
      </v-avatar>
    </v-container>

    <!-- Loading -->
    <v-container
      v-if="profileStore.loading && !profileStore.profile"
      class="text-center my-10"
    >
      <v-progress-circular indeterminate color="primary" size="40" />
    </v-container>

    <!-- Error -->
    <v-container v-if="profileStore.error" class="text-center my-10">
      <v-alert type="error" variant="tonal">{{
        profileStore.errorMessage
      }}</v-alert>
      <div class="mt-3">
        <v-btn color="primary" @click="reloadAll">تلاش مجدد</v-btn>
      </div>
    </v-container>

    <!-- Bio & Skills Section -->
    <v-container v-if="profileStore.profile" class="bio-section mt-20">
      <v-row dense align="center" justify="center">
        <!-- Bio -->
        <v-col cols="12" md="6">
          <h2 class="section-title mb-4">درباره من</h2>
          <p class="about-text">{{ profileStore.profile.bio }}</p>

          <!-- Contact Info -->
          <div class="contact-info mt-5">
            <p v-if="profileStore.profile.email">
              <v-icon size="18">mdi-email</v-icon>
              {{ profileStore.profile.email }}
            </p>
            <p v-if="profileStore.profile.phone">
              <v-icon size="18">mdi-phone</v-icon>
              {{ profileStore.profile.phone }}
            </p>
            <p v-if="profileStore.profile.location">
              <v-icon size="18">mdi-map-marker</v-icon>
              {{ profileStore.profile.location }}
            </p>
          </div>

          <v-btn
            v-if="profileStore.profile.resume"
            :href="resolveImageUrl(profileStore.profile.resume)"
            target="_blank"
            color="primary"
            class="mt-4"
            prepend-icon="mdi-file-pdf-box"
          >
            دانلود رزومه
          </v-btn>

          <!-- Social Links -->
          <div v-if="hasSocialLinks" class="social-links mt-6">
            <v-btn
              v-for="(url, key) in profileStore.profile.social_links"
              :key="key"
              v-if="url"
              :href="url"
              target="_blank"
              icon
              class="mx-1 social-btn"
              :aria-label="key"
            >
              <v-icon>{{ socialIcon(key) }}</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Skills -->
        <!-- Skills -->
        <v-col cols="12" md="6">
          <h3 class="skills-title mt-6 mb-3">مهارت‌ها</h3>

          <div v-if="skillsStore.loading" class="text-center my-4">
            <v-progress-circular indeterminate size="28" />
          </div>

          <div v-if="skillsStore.error" class="text-center my-4">
            <v-alert type="error" variant="outlined">{{
              skillsStore.errorMessage
            }}</v-alert>
          </div>

          <v-row dense v-else>
            <v-col
              cols="12"
              v-for="skill in displaySkills"
              :key="skill.id"
              class="mb-4"
            >
              <v-tooltip location="top" transition="fade-transition">
                <template #activator="{ props }">
                  <div v-bind="props" class="skill-item">
                    <div class="skill-row">
                      <div class="skill-name">{{ skill.name }}</div>
                      <div class="skill-level">{{ skill.level }}%</div>
                    </div>
                    <v-progress-linear
                      :value="skill.level"
                      height="12"
                      rounded
                      color="primary"
                      striped
                    />
                  </div>
                </template>
                <span v-if="skill.description">{{ skill.description }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Technologies Section -->
    <v-container v-if="profileStore.profile" class="mt-16 text-center">
      <h2 class="section-title mb-6">تکنولوژی‌ها</h2>
      <v-row dense justify="center" align="center">
        <v-col
          cols="auto"
          v-for="tech in resolvedTechnologies"
          :key="tech.name"
          class="mb-4"
        >
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
/**
 * About.vue — connected to Pinia:
 *  - profileStore: from src/stores/profile.js (must exist)
 *  - skillsStore: from src/stores/skills.js (must exist; implementation I provided earlier)
 *
 * Utilities:
 *  - resolveImageUrl: converts relative media paths to absolute using VITE_API_URL fallback
 */

import { computed, onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useSkillsStore } from "@/stores/skills";

const profileStore = useProfileStore();
const skillsStore = useSkillsStore();

// load both profile and featured skills on mount
onMounted(async () => {
  // don't await them serially — run in parallel for speed
  profileStore.loadProfile().catch(() => {});
  skillsStore.loadFeatured().catch(() => {});
});

// show social buttons only if any link exists
const hasSocialLinks = computed(() => {
  return (
    profileStore.profile &&
    profileStore.profile.social_links &&
    Object.values(profileStore.profile.social_links).some(Boolean)
  );
});

// display skills: prefer featured -> profile.skills -> skillsStore.skills -> fallback local list
const localSkills = [
  { id: "s-local-vue", name: "Vue.js", level: 90, description: "" },
  { id: "s-local-vuetify", name: "Vuetify", level: 85, description: "" },
  {
    id: "s-local-drf",
    name: "Django REST Framework",
    level: 80,
    description: "",
  },
  { id: "s-local-js", name: "JavaScript", level: 95, description: "" },
  { id: "s-local-html", name: "HTML & CSS", level: 95, description: "" },
  {
    id: "s-local-responsive",
    name: "Responsive Design",
    level: 90,
    description: "",
  },
];

const displaySkills = computed(() => {
  // 1. if skillsStore.featured available -> show that
  if (skillsStore.featured && skillsStore.featured.length)
    return skillsStore.featured;
  // 2. if profile has skills array -> use that
  if (
    profileStore.profile &&
    Array.isArray(profileStore.profile.skills) &&
    profileStore.profile.skills.length
  )
    return profileStore.profile.skills;
  // 3. if skillsStore.skills has items -> use first N
  if (skillsStore.skills && skillsStore.skills.length)
    return skillsStore.skills.slice(0, 6);
  // 4. fallback
  return localSkills;
});

// technologies: prefer profile.technologies else local
const localTechnologies = [
  { name: "Vue.js", icon: "mdi-vuejs" },
  { name: "Vuetify", icon: "mdi-vuetify" },
  { name: "Django", icon: "mdi-language-python" },
  { name: "JavaScript", icon: "mdi-language-javascript" },
  { name: "HTML5", icon: "mdi-language-html5" },
  { name: "CSS3", icon: "mdi-language-css3" },
  { name: "Git", icon: "mdi-git" },
];
const resolvedTechnologies = computed(() => {
  if (
    profileStore.profile &&
    Array.isArray(profileStore.profile.technologies) &&
    profileStore.profile.technologies.length
  )
    return profileStore.profile.technologies;
  return localTechnologies;
});

// social icon mapper
function socialIcon(key) {
  const map = {
    facebook: "mdi-facebook",
    twitter: "mdi-twitter",
    instagram: "mdi-instagram",
    linkedin: "mdi-linkedin",
    github: "mdi-github",
    youtube: "mdi-youtube",
  };
  return map[key] || "mdi-web";
}

// reload both stores
function reloadAll() {
  profileStore.loadProfile(true).catch(() => {});
  skillsStore.loadFeatured(true).catch(() => {});
}

/* Helper: resolve relative media URL to absolute using VITE_API_URL
   If the backend already returns absolute URLs (http(s)://...) this returns them unchanged.
*/
function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const api = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const base = api.replace(/\/api\/?$/, "");
  return `${base}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
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
  margin-top: 32px;
  border-radius: 50%;
  overflow: hidden;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 👈 باعث میشه عکس کامل دیده بشه */
  object-position: center;
}
/* Bio Section */
.bio-section {
  margin-top: 100px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
}

.about-text {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}

/* skills */
.skills-title {
  font-size: 1.5rem;
  font-weight: 600;
}
.skill-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.skill-name {
  font-weight: 600;
}
.skill-level {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Contact & Social */
.contact-info p {
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.social-btn {
  color: white;
  transition: transform 0.18s;
}
.social-btn:hover {
  transform: scale(1.08);
  color: #00bcd4;
}

/* Technologies */
.tech-chip {
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  transition: transform 0.16s;
}

.tech-chip.hover-scale:hover {
  transform: scale(1.04);
}

/* responsive tweaks */
@media (max-width: 900px) {
  .profile-avatar {
    bottom: -70px;
    width: 140px;
    height: 140px;
  }
  .hero-name {
    font-size: 2rem;
  }
  .bio-section {
    margin-top: 80px;
  }
}
.skill-item {
  cursor: default;
  transition: transform 0.2s ease;
}
.skill-item:hover {
  transform: scale(1.02);
}

.v-tooltip span {
  white-space: normal !important;
  line-height: 1.5;
  font-size: 0.9rem;
  max-width: 260px;
}
</style>
