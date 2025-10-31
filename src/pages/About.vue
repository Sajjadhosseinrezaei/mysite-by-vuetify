<template>
  <v-container fluid class="about-page pa-0 overflow-hidden">
    <!-- Hero Section -->
    <section class="hero-section position-relative overflow-hidden">
      <div class="hero-bg"></div>

      <v-container class="h-100 position-relative z-10">
        <v-row align="center" class="h-100">
          <v-col cols="12" class="text-center">
            <v-fade-transition appear>
              <div v-if="profileStore.profile">
                <h1 class="hero-name text-shadow">{{ profileStore.profile.name }}</h1>
                <p class="hero-title text-shadow-sm">{{ profileStore.profile.title }}</p>

                <v-avatar size="160" class="profile-avatar elevation-12 mt-6 animate-float">
                  <v-img
                    :src="profileStore.profile.profile_image"
                    alt="Profile"
                    cover
                    class="border-4 border-white"
                  />
                </v-avatar>
              </div>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Loading & Error (Profile) -->
    <v-container v-if="profileStore.loading && !profileStore.profile" class="text-center py-16">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-container>

    <v-container v-if="profileStore.error" class="text-center py-16">
      <v-alert type="error" variant="tonal" class="mx-auto" max-width="500">
        {{ profileStore.errorMessage }}
      </v-alert>
      <v-btn color="primary" class="mt-4" @click="reloadAll">تلاش مجدد</v-btn>
    </v-container>

    <!-- Main Content -->
    <v-container v-if="profileStore.profile" class="content-section py-16">
      <v-row justify="center">
        <!-- Bio -->
        <v-col cols="12" md="6">
          <v-fade-transition>
            <div>
              <h2 class="section-title mb-5">درباره من</h2>
              <p class="about-text">{{ profileStore.profile.bio }}</p>

              <div class="contact-info mt-6">
                <div v-if="profileStore.profile.email" class="contact-item">
                  <v-icon>mdi-email</v-icon>
                  <span>{{ profileStore.profile.email }}</span>
                </div>
                <div v-if="profileStore.profile.phone" class="contact-item">
                  <v-icon>mdi-phone</v-icon>
                  <span>{{ profileStore.profile.phone }}</span>
                </div>
                <div v-if="profileStore.profile.location" class="contact-item">
                  <v-icon>mdi-map-marker</v-icon>
                  <span>{{ profileStore.profile.location }}</span>
                </div>
              </div>

              <v-btn
                v-if="profileStore.profile.resume"
                :href="resolveImageUrl(profileStore.profile.resume)"
                target="_blank"
                color="primary"
                size="large"
                class="mt-6 resume-btn"
                prepend-icon="mdi-file-pdf-box"
              >
                دانلود رزومه
              </v-btn>

              <div v-if="hasSocialLinks" class="social-links mt-8">
                <v-btn
                  v-for="(url, key) in profileStore.profile.social_links"
                  :key="key"
                  v-if="url"
                  :href="url"
                  target="_blank"
                  icon
                  size="large"
                  class="social-btn mx-1"
                  :aria-label="key"
                >
                  <v-icon>{{ socialIcon(key) }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-fade-transition>
        </v-col>

        <!-- Skills -->
        <v-col cols="12" md="6">
          <v-fade-transition>
            <div>
              <h3 class="skills-title mb-5">مهارت‌های اصلی</h3>

              <!-- Loading -->
              <div v-if="skillsStore.loading" class="text-center my-6">
                <v-progress-circular indeterminate size="40" />
              </div>

              <!-- Error -->
              <div v-if="skillsStore.error" class="text-center my-6">
                <v-alert type="error" variant="outlined" class="mx-auto" max-width="400">
                  {{ skillsStore.error }}
                </v-alert>
                <v-btn size="small" @click="skillsStore.loadFeatured(true)">تلاش مجدد</v-btn>
              </div>

              <!-- Skills List -->
              <div v-else>
                <v-row dense>
                  <v-col
                    v-for="skill in skillsStore.featured"
                    :key="skill.id"
                    cols="12"
                    class="mb-4"
                  >
                    <v-card
                      class="skill-card pa-4 elevation-3"
                      :color="getSkillColor(skill.level)"
                      variant="tonal"
                    >
                      <div class="d-flex align-center justify-space-between mb-2">
                        <div class="d-flex align-center">
                          <v-icon
                            v-if="skill.icon_class && isValidIcon(skill.icon_class)"
                            :icon="skill.icon_class"
                            size="22"
                            class="me-3"
                          />
                          <span class="skill-name font-weight-bold">{{ skill.name }}</span>
                        </div>
                        <v-chip size="small" color="white" text-color="black">
                          {{ skill.level }}%
                        </v-chip>
                      </div>

                      <v-progress-linear
                        :model-value="animatedLevels[skill.id] || 0"
                        height="8"
                        rounded
                        color="white"
                        bg-color="rgba(255,255,255,0.2)"
                        class="skill-progress"
                      />
                      <small class="text-caption mt-1 d-block text-white-opacity">
                        {{ skill.description || "مهارت حرفه‌ای" }}
                      </small>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-fade-transition>
        </v-col>
      </v-row>

      <!-- Technologies from Server -->
      <div class="mt-16 text-center">
        <h2 class="section-title mb-8">تکنولوژی‌های مسلط</h2>

        <!-- Loading -->
        <div v-if="techStore.loading" class="text-center py-6">
          <v-progress-circular indeterminate size="48" color="primary" />
        </div>

        <!-- Error -->
        <div v-if="techStore.error" class="text-center py-6">
          <v-alert type="error" variant="outlined" class="mx-auto" max-width="500">
            {{ techStore.error }}
          </v-alert>
          <v-btn size="small" @click="techStore.loadTechnologies(true)">تلاش مجدد</v-btn>
        </div>

        <!-- Technologies -->
        <v-slide-x-transition group v-else>
          <v-chip
            v-for="tech in techStore.technologies"
            :key="tech.id"
            outlined
            :color="tech.color"
            class="tech-chip ma-2 pa-4"
            size="large"
            :style="{ borderColor: tech.color }"
          >
            <!-- آیکون Font Awesome یا MDI -->
            <v-icon v-if="tech.icon" left :style="{ color: tech.color }">
              {{ tech.icon }}
            </v-icon>
            <!-- تصویر آیکون (در صورت وجود) -->
            <v-avatar v-else-if="tech.icon_image" size="24" class="me-2">
              <v-img :src="resolveImageUrl(tech.icon_image)" />
            </v-avatar>
            {{ tech.name }}
          </v-chip>
        </v-slide-x-transition>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useSkillsStore } from "@/stores/skills";
import { useTechnologiesStore } from "@/stores/technologies";
import { storeToRefs } from "pinia";

const profileStore = useProfileStore();
const skillsStore = useSkillsStore();
const techStore = useTechnologiesStore();

const animatedLevels = ref({});

/* ------------------------------------------------------------------ */
/*  انیمیشن سطوح مهارت‌ها                                           */
/* ------------------------------------------------------------------ */
watch(
  () => skillsStore.featured,
  (newSkills) => {
    animatedLevels.value = {};
    nextTick(() => {
      newSkills.forEach((skill, index) => {
        setTimeout(() => {
          animatedLevels.value[skill.id] = skill.level;
        }, index * 150);
      });
    });
  },
  { immediate: true }
);

/* ------------------------------------------------------------------ */
/*  بارگذاری اولیه                                                   */
/* ------------------------------------------------------------------ */
onMounted(async () => {
  await Promise.all([
    profileStore.loadProfile().catch(() => {}),
    skillsStore.loadFeatured().catch(() => {}),
    techStore.loadTechnologies().catch(() => {}),
  ]);
});

/* ------------------------------------------------------------------ */
/*  computed ها                                                       */
/* ------------------------------------------------------------------ */
const hasSocialLinks = computed(() => {
  return profileStore.profile?.social_links && Object.values(profileStore.profile.social_links).some(Boolean);
});

/* ------------------------------------------------------------------ */
/*  توابع کمکی                                                       */
/* ------------------------------------------------------------------ */
function socialIcon(key) {
  const map = {
    github: "mdi-github",
    linkedin: "mdi-linkedin",
    twitter: "mdi-twitter",
    instagram: "mdi-instagram",
    youtube: "mdi-youtube",
    facebook: "mdi-facebook",
  };
  return map[key] || "mdi-web";
}

function reloadAll() {
  profileStore.loadProfile(true);
  skillsStore.loadFeatured(true);
  techStore.loadTechnologies(true);
}

function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const api = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const base = api.replace(/\/api\/?$/, "");
  return `${base}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function isValidIcon(iconClass) {
  return /^fa[bsrl]? fa-/.test(iconClass) || /^mdi-/.test(iconClass);
}

function getSkillColor(level) {
  if (level >= 90) return "success";
  if (level >= 75) return "info";
  if (level >= 60) return "warning";
  return "error";
}
</script>

<style scoped>
/* فونت فارسی */
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
.about-page { font-family: 'Vazirmatn', sans-serif; }

/* Hero */
.hero-section {
  min-height: 65vh;
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

.hero-name {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #00bcd4, #2196f3);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
.hero-title {
  font-size: 1.4rem;
  color: #ccc;
  font-weight: 300;
  margin-top: 8px;
}
.text-shadow { text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
.text-shadow-sm { text-shadow: 0 1px 5px rgba(0,0,0,0.3); }

.profile-avatar {
  margin-top: 2rem;
  border: 5px solid rgba(255,255,255,0.25) !important;
  animation: float 5s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* محتوا با overlap */
.content-section {
  margin-top: -80px;
  position: relative;
  z-index: 20;
  background: #0a0a0a;
  border-radius: 24px 24px 0 0;
  padding-top: 100px !important;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* عنوان بخش‌ها */
.section-title {
  font-size: 2.5rem;
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
.about-text {
  font-size: 1.1rem;
  line-height: 2;
  color: #ddd;
}

/* اطلاعات تماس */
.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: #aaa;
  font-size: 1rem;
}
.contact-item v-icon { color: #00bcd4; }

/* مهارت‌ها */
.skill-card {
  border-radius: 16px !important;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}
.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
}
.skill-name { color: white; font-size: 1.1rem; }
.skill-progress { border-radius: 4px; }
.text-white-opacity { color: rgba(255,255,255,0.7); }

/* دکمه‌های اجتماعی */
.social-btn {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}
.social-btn:hover {
  background: #00bcd4;
  transform: translateY(-3px) scale(1.1);
}

/* تکنولوژی‌ها */
.tech-chip {
  font-weight: 500;
  border-radius: 50px !important;
  transition: all 0.3s ease;
  border-width: 2px !important;
}
.tech-chip:hover {
  background: rgba(0,188,212,0.1);
  transform: scale(1.05);
}

/* دکمه رزومه */
.resume-btn {
  border-radius: 50px;
  text-transform: none;
  font-weight: 500;
  padding: 0 24px !important;
}

/* ریسپانسیو */
@media (max-width: 960px) {
  .hero-name { font-size: 3rem; }
  .hero-title { font-size: 1.3rem; }
  .profile-avatar { size: 140px; }
}
@media (max-width: 600px) {
  .hero-name { font-size: 2.5rem; }
  .section-title { font-size: 2rem; }
  .content-section { margin-top: -60px; padding-top: 80px !important; }
}
</style>
