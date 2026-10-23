```vue
<template>
  <v-container fluid class="about-page pa-0">
    <!-- پس‌زمینه و افکت‌های Spider-Verse -->
    <div class="universe-background" aria-hidden="true">
      <div class="universe-grid"></div>
      <div class="glow glow-red"></div>
      <div class="glow glow-blue"></div>
      <div class="web-pattern"></div>
    </div>

    <!-- Hero -->
    <section class="hero-section">
      <v-container class="hero-container">
        <v-row align="center" justify="center">
          <v-col cols="12" md="7" class="hero-copy">
            <div class="eyebrow">
              <span class="status-dot"></span>
              <span>ABOUT ME / BACKEND DEVELOPER</span>
            </div>

            <div v-if="profileStore.loading && !profileStore.profile" class="hero-loading">
              <v-progress-circular indeterminate color="red-accent-2" />
              <span>در حال دریافت اطلاعات...</span>
            </div>

            <template v-else-if="profileStore.profile">
              <h1 class="hero-name">
                <span class="name-prefix">من</span>
                {{ profileStore.profile.name }}
              </h1>

              <h2 class="hero-title">
                {{ profileStore.profile.title || "توسعه‌دهنده بک‌اند Python و Django" }}
              </h2>

              <p class="hero-description">
                طراحی و توسعه‌ی APIهای کاربردی، ساختارهای قابل نگهداری
                و راهکارهای بک‌اند با تمرکز بر کیفیت، امنیت و عملکرد.
              </p>

              <div class="hero-actions">
                <v-btn
                  to="/projects"
                  class="spider-btn spider-btn-primary"
                  append-icon="mdi-arrow-left"
                  size="large"
                  rounded="lg"
                >
                  مشاهده پروژه‌ها
                </v-btn>

                <v-btn
                  to="/contact"
                  class="spider-btn spider-btn-outline"
                  prepend-icon="mdi-email-outline"
                  size="large"
                  rounded="lg"
                  variant="outlined"
                >
                  ارتباط با من
                </v-btn>
              </div>
            </template>

            <div v-else class="hero-fallback">
              <h1 class="hero-name">درباره من</h1>
              <p>توسعه‌دهنده بک‌اند Python و Django</p>
              <v-btn
                color="red-accent-2"
                variant="outlined"
                class="mt-4"
                @click="reloadAll"
              >
                تلاش مجدد
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" md="5" class="hero-visual">
            <div class="portrait-frame">
              <div class="portrait-ring portrait-ring-red"></div>
              <div class="portrait-ring portrait-ring-blue"></div>

              <div class="portrait-card">
                <v-img
                  v-if="profileStore.profile?.profile_image"
                  :src="resolveImageUrl(profileStore.profile.profile_image)"
                  :alt="`تصویر ${profileStore.profile.name}`"
                  cover
                  class="portrait-image"
                />

                <div v-else class="portrait-placeholder">
                  <v-icon icon="mdi-account-code" size="100" />
                </div>

                <div class="portrait-overlay"></div>

                <div class="portrait-label">
                  <span class="portrait-label-dot"></span>
                  <span>BUILDING THE BACKEND</span>
                </div>
              </div>

              <div class="floating-code code-top">
                <span class="code-symbol">{"{"}</span>
                <span>Python</span>
              </div>

              <div class="floating-code code-bottom">
                <span class="code-symbol">&lt;/&gt;</span>
                <span>Django REST</span>
              </div>

              <div class="visual-cross cross-one">+</div>
              <div class="visual-cross cross-two">+</div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <div class="hero-bottom-line"></div>
    </section>

    <!-- خطای دریافت پروفایل -->
    <v-container
      v-if="profileStore.error && !profileStore.profile"
      class="content-container pt-6"
    >
      <v-alert
        type="error"
        variant="tonal"
        class="error-panel"
        rounded="lg"
      >
        {{ profileStore.errorMessage || "دریافت اطلاعات پروفایل ناموفق بود." }}

        <template #append>
          <v-btn
            variant="text"
            color="red-accent-2"
            @click="reloadAll"
          >
            تلاش مجدد
          </v-btn>
        </template>
      </v-alert>
    </v-container>

    <!-- محتوای اصلی -->
    <v-container
      v-if="profileStore.profile"
      class="content-container"
    >
      <!-- معرفی -->
      <section class="content-section">
        <div class="section-heading">
          <div class="section-index">01 / INTRODUCTION</div>
          <h2 class="section-title">
            درباره <span>من</span>
          </h2>
          <p class="section-subtitle">
            مسیر من در دنیای توسعه نرم‌افزار
          </p>
        </div>

        <v-row align="stretch" class="intro-row">
          <v-col cols="12" md="7">
            <div class="glass-card intro-card">
              <div class="card-corner"></div>

              <div class="card-label">
                <v-icon icon="mdi-code-braces" />
                <span>WHO I AM</span>
              </div>

              <h3 class="intro-title">
                ساختن راهکارهای واقعی، نه فقط نوشتن کد
              </h3>

              <p class="about-text">
                {{ profileStore.profile.bio || "توسعه‌دهنده بک‌اند با تمرکز بر Python، Django و طراحی API." }}
              </p>

              <div class="focus-list">
                <div class="focus-item">
                  <v-icon icon="mdi-api" color="red-accent-2" />
                  <span>طراحی و توسعه API</span>
                </div>

                <div class="focus-item">
                  <v-icon icon="mdi-database-outline" color="blue-lighten-2" />
                  <span>مدل‌سازی داده و پایگاه داده</span>
                </div>

                <div class="focus-item">
                  <v-icon icon="mdi-shield-check-outline" color="red-accent-2" />
                  <span>امنیت، تست و نگهداری کد</span>
                </div>

                <div class="focus-item">
                  <v-icon icon="mdi-server-network" color="blue-lighten-2" />
                  <span>استقرار و زیرساخت پروژه</span>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5">
            <div class="glass-card contact-card">
              <div class="card-label">
                <v-icon icon="mdi-card-account-details-outline" />
                <span>CONTACT INFORMATION</span>
              </div>

              <div
                v-if="profileStore.profile.email"
                class="info-item"
              >
                <div class="info-icon info-icon-red">
                  <v-icon icon="mdi-email-outline" />
                </div>
                <div class="info-content">
                  <span class="info-label">ایمیل</span>
                  <a
                    class="info-value"
                    :href="`mailto:${profileStore.profile.email}`"
                  >
                    {{ profileStore.profile.email }}
                  </a>
                </div>
              </div>

              <div
                v-if="profileStore.profile.phone"
                class="info-item"
              >
                <div class="info-icon info-icon-blue">
                  <v-icon icon="mdi-phone-outline" />
                </div>
                <div class="info-content">
                  <span class="info-label">تلفن</span>
                  <a
                    class="info-value"
                    :href="`tel:${profileStore.profile.phone}`"
                    dir="ltr"
                  >
                    {{ profileStore.profile.phone }}
                  </a>
                </div>
              </div>

              <div
                v-if="profileStore.profile.location"
                class="info-item"
              >
                <div class="info-icon info-icon-red">
                  <v-icon icon="mdi-map-marker-outline" />
                </div>
                <div class="info-content">
                  <span class="info-label">موقعیت</span>
                  <span class="info-value">
                    {{ profileStore.profile.location }}
                  </span>
                </div>
              </div>

              <div
                v-if="!hasContactInfo"
                class="empty-info"
              >
                اطلاعات تماس در حال حاضر ثبت نشده است.
              </div>

              <v-btn
                v-if="profileStore.profile.resume"
                :href="resolveImageUrl(profileStore.profile.resume)"
                target="_blank"
                rel="noopener noreferrer"
                block
                class="resume-btn mt-6"
                prepend-icon="mdi-file-download-outline"
                append-icon="mdi-open-in-new"
                rounded="lg"
                size="large"
              >
                مشاهده رزومه
              </v-btn>

              <div
                v-if="socialLinks.length"
                class="social-section"
              >
                <div class="social-divider"></div>
                <span class="social-heading">من را در فضای آنلاین پیدا کن</span>

                <div class="social-links">
                  <v-btn
                    v-for="item in socialLinks"
                    :key="item.key"
                    :href="item.url"
                    :aria-label="item.key"
                    :title="item.key"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon
                    variant="tonal"
                    class="social-btn"
                    size="large"
                  >
                    <v-icon :icon="socialIcon(item.key)" />
                  </v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- مهارت‌ها -->
      <section class="content-section">
        <div class="section-heading">
          <div class="section-index">02 / SKILLS</div>
          <h2 class="section-title">
            مهارت‌های <span>من</span>
          </h2>
          <p class="section-subtitle">
            ابزارهایی که برای حل مسئله از آن‌ها استفاده می‌کنم
          </p>
        </div>

        <div v-if="skillsStore.loading" class="state-panel">
          <v-progress-circular
            indeterminate
            color="red-accent-2"
            size="44"
          />
          <span>در حال بارگذاری مهارت‌ها...</span>
        </div>

        <div v-else-if="skillsStore.error" class="state-panel">
          <v-icon icon="mdi-alert-circle-outline" size="42" color="red-accent-2" />
          <p>دریافت مهارت‌ها با مشکل مواجه شد.</p>
          <v-btn
            variant="outlined"
            color="red-accent-2"
            @click="skillsStore.loadFeatured(true)"
          >
            تلاش مجدد
          </v-btn>
        </div>

        <div
          v-else-if="skillsStore.featured.length"
          class="skills-grid"
        >
          <article
            v-for="(skill, index) in skillsStore.featured"
            :key="skill.id"
            class="glass-card skill-card"
            :style="{ '--skill-index': index }"
          >
            <div class="skill-card-top">
              <div class="skill-icon">
                <v-icon
                  v-if="skill.icon_class && isValidIcon(skill.icon_class)"
                  :icon="skill.icon_class"
                  size="25"
                />
                <v-icon v-else icon="mdi-code-tags" size="25" />
              </div>

              <span class="skill-level">
                {{ Number(skill.level) || 0 }}%
              </span>
            </div>

            <h3 class="skill-name">{{ skill.name }}</h3>

            <div class="skill-track">
              <div
                class="skill-fill"
                :class="skillColorClass(skill.level)"
                :style="{ width: `${animatedLevels[skill.id] || 0}%` }"
              ></div>
            </div>

            <p v-if="skill.description" class="skill-description">
              {{ skill.description }}
            </p>
          </article>
        </div>

        <div v-else class="state-panel">
          <v-icon icon="mdi-code-tags" size="42" />
          <p>هنوز مهارتی برای نمایش ثبت نشده است.</p>
        </div>
      </section>

      <!-- تکنولوژی‌ها -->
      <section class="content-section technologies-section">
        <div class="section-heading">
          <div class="section-index">03 / TECHNOLOGIES</div>
          <h2 class="section-title">
            جعبه‌ابزار <span>من</span>
          </h2>
          <p class="section-subtitle">
            تکنولوژی‌هایی که در مسیر توسعه از آن‌ها استفاده می‌کنم
          </p>
        </div>

        <div v-if="techStore.loading" class="state-panel">
          <v-progress-circular
            indeterminate
            color="blue-lighten-2"
            size="44"
          />
          <span>در حال بارگذاری تکنولوژی‌ها...</span>
        </div>

        <div v-else-if="techStore.error" class="state-panel">
          <v-icon icon="mdi-alert-circle-outline" size="42" color="red-accent-2" />
          <p>دریافت تکنولوژی‌ها با مشکل مواجه شد.</p>
          <v-btn
            variant="outlined"
            color="red-accent-2"
            @click="techStore.loadTechnologies(true)"
          >
            تلاش مجدد
          </v-btn>
        </div>

        <div
          v-else-if="techStore.technologies.length"
          class="technologies-grid"
        >
          <div
            v-for="tech in techStore.technologies"
            :key="tech.id"
            class="technology-card"
            :style="{ '--tech-color': safeTechColor(tech.color) }"
          >
            <div class="technology-icon">
              <v-icon
                v-if="tech.icon"
                :icon="tech.icon"
                size="30"
              />

              <v-img
                v-else-if="tech.icon_image"
                :src="resolveImageUrl(tech.icon_image)"
                :alt="tech.name"
                width="30"
                height="30"
                contain
              />

              <v-icon v-else icon="mdi-puzzle-outline" size="30" />
            </div>

            <span>{{ tech.name }}</span>
            <div class="technology-accent"></div>
          </div>
        </div>

        <div v-else class="state-panel">
          <v-icon icon="mdi-puzzle-outline" size="42" />
          <p>هنوز تکنولوژی‌ای برای نمایش ثبت نشده است.</p>
        </div>
      </section>

      <!-- CTA پایانی -->
      <section class="final-cta">
        <div class="cta-web" aria-hidden="true"></div>

        <div class="cta-content">
          <span class="section-index">04 / NEXT STEP</span>
          <h2>یک ایده در ذهن داری؟</h2>
          <p>
            اگر برای توسعه یک API یا پیاده‌سازی یک پروژه بک‌اند به دنبال
            همکاری هستی، خوشحال می‌شوم درباره‌اش صحبت کنیم.
          </p>

          <v-btn
            to="/contact"
            class="spider-btn spider-btn-primary"
            append-icon="mdi-arrow-left"
            size="large"
            rounded="lg"
          >
            شروع گفتگو
          </v-btn>
        </div>
      </section>
    </v-container>

    <footer class="about-footer">
      <span>DESIGNED IN THE MULTIVERSE</span>
      <span class="footer-dot"></span>
      <span>POWERED BY PYTHON & DJANGO</span>
    </footer>
  </v-container>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch, nextTick } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useSkillsStore } from "@/stores/skills";
import { useTechnologiesStore } from "@/stores/technologies";

const profileStore = useProfileStore();
const skillsStore = useSkillsStore();
const techStore = useTechnologiesStore();

const animatedLevels = ref({});
const animationTimers = [];

const hasContactInfo = computed(() => {
  const profile = profileStore.profile;

  return Boolean(
    profile?.email ||
    profile?.phone ||
    profile?.location
  );
});

const socialLinks = computed(() => {
  const links = profileStore.profile?.social_links;

  if (!links || typeof links !== "object" || Array.isArray(links)) {
    return [];
  }

  return Object.entries(links)
    .filter(([, url]) => typeof url === "string" && url.trim())
    .map(([key, url]) => ({
      key,
      url: url.trim(),
    }));
});

watch(
  () => skillsStore.featured,
  async (newSkills) => {
    animationTimers.forEach((timer) => clearTimeout(timer));
    animationTimers.length = 0;

    animatedLevels.value = {};

    if (!Array.isArray(newSkills) || !newSkills.length) {
      return;
    }

    await nextTick();

    newSkills.forEach((skill, index) => {
      const level = Math.min(100, Math.max(0, Number(skill.level) || 0));

      const timer = setTimeout(() => {
        animatedLevels.value[skill.id] = level;
      }, index * 120);

      animationTimers.push(timer);
    });
  },
  { immediate: true }
);

onMounted(() => {
  loadInitialData();
});

onBeforeUnmount(() => {
  animationTimers.forEach((timer) => clearTimeout(timer));
});

async function loadInitialData() {
  await Promise.allSettled([
    profileStore.loadProfile(),
    skillsStore.loadFeatured(),
    techStore.loadTechnologies(),
  ]);
}

async function reloadAll() {
  await Promise.allSettled([
    profileStore.loadProfile(true),
    skillsStore.loadFeatured(true),
    techStore.loadTechnologies(true),
  ]);
}

function socialIcon(key) {
  const icons = {
    github: "mdi-github",
    linkedin: "mdi-linkedin",
    twitter: "mdi-twitter",
    x: "mdi-twitter",
    instagram: "mdi-instagram",
    youtube: "mdi-youtube",
    facebook: "mdi-facebook",
    telegram: "mdi-telegram",
    gitlab: "mdi-gitlab",
    website: "mdi-web",
    portfolio: "mdi-web",
  };

  return icons[String(key).toLowerCase()] || "mdi-link-variant";
}

function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") {
    return "";
  }

  if (/^(https?:)?\/\//i.test(pathOrUrl) || pathOrUrl.startsWith("data:")) {
    return pathOrUrl;
  }

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const baseUrl = apiUrl.replace(/\/api\/?$/i, "").replace(/\/+$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${baseUrl}${path}`;
}

function isValidIcon(iconClass) {
  if (typeof iconClass !== "string") {
    return false;
  }

  return /^(mdi-[\w-]+|fa[bsrl]?\s+fa-[\w-]+)$/.test(iconClass.trim());
}

function skillColorClass(level) {
  const value = Number(level) || 0;

  if (value >= 90) return "skill-fill-red";
  if (value >= 75) return "skill-fill-blue";
  if (value >= 60) return "skill-fill-purple";

  return "skill-fill-muted";
}

function safeTechColor(color) {
  // از وارد شدن مقدارهای خالی به متغیر رنگ جلوگیری می‌کند.
  return typeof color === "string" && color.trim()
    ? color.trim()
    : "#e63946";
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap");

.about-page {
  --spider-red: #ff3158;
  --spider-blue: #35b8ff;
  --spider-purple: #a855f7;
  --spider-bg: #080910;
  --spider-card: rgba(17, 19, 31, 0.82);
  --spider-border: rgba(255, 255, 255, 0.09);

  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: hidden;
  background: var(--spider-bg);
  color: #f4f4f8;
  font-family: "Vazirmatn", sans-serif;
  direction: rtl;
}

.about-page :deep(.v-btn) {
  font-family: inherit;
  letter-spacing: 0;
}

.about-page :deep(.v-alert),
.about-page :deep(.v-card),
.about-page :deep(.v-chip) {
  font-family: inherit;
}

.universe-background {
  position: absolute;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.universe-grid {
  position: absolute;
  inset: 0;
  opacity: 0.17;
  background-image:
    linear-gradient(rgba(90, 100, 160, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(90, 100, 160, 0.12) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.glow {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.15;
}

.glow-red {
  top: 5%;
  right: -230px;
  background: var(--spider-red);
}

.glow-blue {
  top: 32%;
  left: -250px;
  background: var(--spider-blue);
}

.web-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 650px;
  opacity: 0.12;
  background-image:
    repeating-conic-gradient(
      from 0deg at 100% 0%,
      transparent 0deg 9deg,
      rgba(120, 150, 255, 0.55) 9.2deg 9.45deg,
      transparent 9.7deg 18deg
    );
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

/* Hero */

.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 570px;
  padding: 76px 0 105px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.hero-container,
.content-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
}

.hero-copy {
  position: relative;
  z-index: 2;
}

.eyebrow,
.section-index,
.card-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a6a8ba;
  font-family: monospace;
  font-size: 0.76rem;
  letter-spacing: 1.5px;
}

.status-dot,
.portrait-label-dot,
.footer-dot {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--spider-red);
  box-shadow: 0 0 12px rgba(255, 49, 88, 0.85);
}

.hero-name {
  margin: 25px 0 12px;
  font-size: clamp(2.3rem, 5vw, 4.4rem);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -1.5px;
  overflow-wrap: anywhere;
  text-shadow: 3px 0 rgba(255, 49, 88, 0.28), -3px 0 rgba(53, 184, 255, 0.25);
}

.name-prefix {
  color: #aeb1c2;
  font-size: 0.65em;
  font-weight: 400;
}

.hero-title {
  margin: 0;
  color: #e9eaf4;
  font-size: clamp(1.1rem, 2.4vw, 1.6rem);
  font-weight: 600;
  line-height: 1.9;
}

.hero-description {
  max-width: 590px;
  margin-top: 20px;
  color: #a8aabd;
  font-size: 1rem;
  line-height: 2.2;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.spider-btn {
  min-height: 48px;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.spider-btn:hover {
  transform: translateY(-3px);
}

.spider-btn-primary {
  color: #fff !important;
  background: linear-gradient(110deg, #d91e47, #ff3158) !important;
  box-shadow: 0 8px 28px rgba(255, 49, 88, 0.18);
}

.spider-btn-primary:hover {
  box-shadow: 0 10px 32px rgba(255, 49, 88, 0.32);
}

.spider-btn-outline {
  color: var(--spider-blue) !important;
  border-color: rgba(53, 184, 255, 0.5) !important;
}

.hero-loading,
.hero-fallback {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-top: 28px;
  color: #b6b8c9;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 370px;
}

.portrait-frame {
  position: relative;
  width: min(100%, 330px);
  aspect-ratio: 0.82;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-card {
  position: relative;
  z-index: 2;
  width: 78%;
  height: 82%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 46% 46% 22px 22px;
  background: linear-gradient(145deg, #171b2b, #0b0d15);
  box-shadow:
    12px 12px 0 rgba(255, 49, 88, 0.12),
    -12px -12px 0 rgba(53, 184, 255, 0.1),
    0 30px 80px rgba(0, 0, 0, 0.4);
  transform: rotate(-2deg);
}

.portrait-image {
  width: 100%;
  height: 100%;
  filter: saturate(0.85) contrast(1.05);
}

.portrait-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--spider-blue);
  background:
    radial-gradient(circle at 50% 35%, rgba(53, 184, 255, 0.18), transparent 50%),
    linear-gradient(145deg, #171b2b, #0b0d15);
}

.portrait-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 45%,
    rgba(6, 7, 13, 0.8) 100%
  );
}

.portrait-label {
  position: absolute;
  right: 0;
  bottom: 18px;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-family: monospace;
  font-size: 0.66rem;
  letter-spacing: 1px;
}

.portrait-label-dot {
  width: 6px;
  height: 6px;
  background: var(--spider-blue);
  box-shadow: 0 0 10px var(--spider-blue);
}

.portrait-ring {
  position: absolute;
  width: 95%;
  height: 95%;
  border: 1px solid;
  border-radius: 50%;
  transform: rotate(-20deg);
}

.portrait-ring-red {
  border-color: rgba(255, 49, 88, 0.35);
  transform: rotate(28deg) scaleX(0.72);
}

.portrait-ring-blue {
  border-color: rgba(53, 184, 255, 0.3);
  transform: rotate(-35deg) scaleX(0.78);
}

.floating-code {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(13, 15, 25, 0.88);
  color: #e3e5f2;
  font-family: monospace;
  font-size: 0.76rem;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
}

.code-top {
  top: 18%;
  right: -2%;
  animation: float-code 5s ease-in-out infinite;
}

.code-bottom {
  bottom: 13%;
  left: -2%;
  animation: float-code 6s ease-in-out infinite reverse;
}

.code-symbol {
  color: var(--spider-blue);
  font-weight: 800;
}

.code-bottom .code-symbol {
  color: var(--spider-red);
}

.visual-cross {
  position: absolute;
  color: var(--spider-blue);
  font-size: 1.7rem;
  opacity: 0.8;
}

.cross-one {
  top: 9%;
  left: 12%;
}

.cross-two {
  right: 8%;
  bottom: 9%;
  color: var(--spider-red);
}

.hero-bottom-line {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--spider-blue),
    var(--spider-red),
    transparent
  );
  opacity: 0.65;
}

/* بخش‌های محتوا */

.content-container {
  padding-top: 25px;
  padding-bottom: 45px;
}

.content-section {
  margin-top: 76px;
}

.section-heading {
  margin-bottom: 30px;
}

.section-index {
  margin-bottom: 10px;
  color: var(--spider-blue);
  font-size: 0.7rem;
}

.section-title {
  margin: 0;
  color: #f5f5fa;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.6;
}

.section-title span {
  color: var(--spider-red);
  text-shadow: 2px 0 rgba(255, 49, 88, 0.2);
}

.section-subtitle {
  margin-top: 7px;
  color: #9295aa;
  font-size: 0.95rem;
  line-height: 1.9;
}

.glass-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--spider-border);
  border-radius: 18px;
  background: var(--spider-card);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.14);
  backdrop-filter: blur(14px);
}

.intro-card,
.contact-card {
  height: 100%;
  padding: 27px;
}

.card-corner {
  position: absolute;
  top: 0;
  left: 0;
  width: 55px;
  height: 55px;
  border-top: 2px solid var(--spider-red);
  border-left: 2px solid var(--spider-red);
  border-radius: 17px 0 0 0;
  opacity: 0.65;
}

.card-label {
  gap: 9px;
  color: var(--spider-blue);
  font-size: 0.68rem;
}

.card-label :deep(.v-icon) {
  font-size: 1.15rem;
}

.intro-title {
  margin-top: 24px;
  color: #f3f3fa;
  font-size: 1.28rem;
  font-weight: 700;
  line-height: 1.9;
}

.about-text {
  margin-top: 13px;
  color: #b5b7c8;
  font-size: 0.98rem;
  line-height: 2.25;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.focus-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 10px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.focus-item {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #c8cada;
  font-size: 0.82rem;
  line-height: 1.8;
}

.focus-item :deep(.v-icon) {
  flex: 0 0 auto;
}

.contact-card {
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: 24px;
  min-width: 0;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 43px;
  width: 43px;
  height: 43px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
}

.info-icon-red {
  color: var(--spider-red);
}

.info-icon-blue {
  color: var(--spider-blue);
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.info-label {
  color: #81859c;
  font-size: 0.75rem;
}

.info-value {
  color: #e4e5ef;
  font-size: 0.88rem;
  overflow-wrap: anywhere;
  text-decoration: none;
  transition: color 0.2s ease;
}

a.info-value:hover {
  color: var(--spider-blue);
}

.empty-info {
  margin-top: 22px;
  color: #9093a7;
  font-size: 0.88rem;
  line-height: 1.9;
}

.resume-btn {
  color: #fff !important;
  background: linear-gradient(110deg, #20283a, #30213b) !important;
  border: 1px solid rgba(53, 184, 255, 0.3);
  font-weight: 600;
}

.resume-btn:hover {
  border-color: var(--spider-blue);
}

.social-section {
  margin-top: 23px;
}

.social-divider {
  height: 1px;
  margin-bottom: 17px;
  background: rgba(255, 255, 255, 0.08);
}

.social-heading {
  color: #989bb0;
  font-size: 0.78rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 13px;
}

.social-btn {
  color: #dfe2f0 !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.social-btn:hover {
  color: #fff !important;
  background: rgba(255, 49, 88, 0.2);
  border-color: rgba(255, 49, 88, 0.4);
  transform: translateY(-3px);
}

/* وضعیت‌ها */

.state-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 170px;
  padding: 28px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  color: #a9acc0;
  text-align: center;
}

.state-panel p {
  margin: 0;
  line-height: 1.9;
}

.error-panel {
  border: 1px solid rgba(255, 49, 88, 0.25);
}

/* مهارت‌ها */

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 17px;
}

.skill-card {
  padding: 22px;
  animation: card-enter 0.5s both;
  animation-delay: calc(var(--skill-index, 0) * 60ms);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: rgba(53, 184, 255, 0.3);
}

.skill-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(53, 184, 255, 0.2);
  border-radius: 13px;
  background: rgba(53, 184, 255, 0.07);
  color: var(--spider-blue);
}

.skill-level {
  color: #c9cbda;
  font-family: monospace;
  font-size: 0.88rem;
}

.skill-name {
  margin-top: 17px;
  color: #f0f0f7;
  font-size: 1rem;
  font-weight: 700;
}

.skill-track {
  height: 7px;
  margin-top: 15px;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
}

.skill-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 1s cubic-bezier(0.2, 0.7, 0.3, 1);
}

.skill-fill-red {
  background: linear-gradient(90deg, #c51e48, #ff4569);
  box-shadow: 0 0 12px rgba(255, 49, 88, 0.25);
}

.skill-fill-blue {
  background: linear-gradient(90deg, #1687d2, #49c6ff);
  box-shadow: 0 0 12px rgba(53, 184, 255, 0.2);
}

.skill-fill-purple {
  background: linear-gradient(90deg, #7532c5, #bd76ff);
}

.skill-fill-muted {
  background: linear-gradient(90deg, #616a84, #9ca5bc);
}

.skill-description {
  margin-top: 12px;
  color: #9195aa;
  font-size: 0.82rem;
  line-height: 1.9;
}

/* تکنولوژی‌ها */

.technologies-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.technology-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
  min-height: 85px;
  padding: 17px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  background: rgba(18, 20, 32, 0.75);
  color: #dfe1ee;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.technology-card:hover {
  transform: translateY(-4px);
  border-color: var(--tech-color);
  background: rgba(30, 33, 49, 0.9);
}

.technology-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--tech-color) 12%, transparent);
  color: var(--tech-color);
}

.technology-icon :deep(.v-img) {
  flex: 0 0 auto;
}

.technology-card > span {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 0.9rem;
  font-weight: 600;
}

.technology-accent {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--tech-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.25s ease;
}

.technology-card:hover .technology-accent {
  transform: scaleX(1);
}

/* دعوت پایانی */

.final-cta {
  position: relative;
  margin-top: 90px;
  padding: 55px 25px;
  overflow: hidden;
  border: 1px solid rgba(255, 49, 88, 0.2);
  border-radius: 22px;
  background:
    radial-gradient(ellipse at 100% 0%, rgba(255, 49, 88, 0.1), transparent 50%),
    radial-gradient(ellipse at 0% 100%, rgba(53, 184, 255, 0.1), transparent 50%),
    rgba(15, 16, 27, 0.9);
}

.cta-web {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;
  background: repeating-conic-gradient(
    from 0deg at 100% 0%,
    transparent 0deg 12deg,
    rgba(150, 160, 220, 0.4) 12.2deg 12.5deg,
    transparent 12.7deg 24deg
  );
  mask-image: linear-gradient(135deg, black, transparent 75%);
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 0 auto;
  text-align: center;
}

.cta-content .section-index {
  justify-content: center;
}

.cta-content h2 {
  margin-top: 12px;
  color: #f5f5fa;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  font-weight: 800;
}

.cta-content p {
  margin: 15px 0 25px;
  color: #a9acc0;
  line-height: 2.2;
}

/* Footer */

.about-footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: #777b91;
  font-family: monospace;
  font-size: 0.65rem;
  letter-spacing: 1px;
  text-align: center;
}

.footer-dot {
  width: 5px;
  height: 5px;
  background: var(--spider-blue);
  box-shadow: 0 0 8px var(--spider-blue);
}

/* انیمیشن‌ها */

@keyframes float-code {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* واکنش‌گرایی */

@media (max-width: 960px) {
  .hero-section {
    padding: 60px 0 85px;
  }

  .hero-visual {
    min-height: 330px;
    margin-top: 20px;
  }

  .portrait-frame {
    max-width: 285px;
  }

  .technologies-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .content-section {
    margin-top: 60px;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding: 45px 0 65px;
  }

  .hero-name {
    margin-top: 20px;
    font-size: clamp(2rem, 9vw, 2.7rem);
  }

  .hero-title {
    font-size: 1.1rem;
  }

  .hero-description {
    font-size: 0.9rem;
    line-height: 2.1;
  }

  .hero-actions {
    align-items: stretch;
  }

  .hero-actions .spider-btn {
    flex: 1 1 100%;
  }

  .hero-visual {
    min-height: 310px;
    margin-top: 10px;
  }

  .portrait-frame {
    max-width: 255px;
  }

  .floating-code {
    padding: 8px 10px;
    font-size: 0.67rem;
  }

  .code-top {
    right: -1%;
  }

  .code-bottom {
    left: -1%;
  }

  .content-container {
    padding-right: 18px;
    padding-left: 18px;
  }

  .content-section {
    margin-top: 48px;
  }

  .section-title {
    font-size: 1.9rem;
  }

  .section-subtitle {
    font-size: 0.85rem;
  }

  .intro-card,
  .contact-card {
    padding: 21px;
  }

  .focus-list {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .technologies-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .technology-card {
    gap: 9px;
    padding: 12px;
  }

  .technology-icon {
    flex-basis: 35px;
    width: 35px;
    height: 35px;
  }

  .technology-card > span {
    font-size: 0.8rem;
  }

  .final-cta {
    margin-top: 60px;
    padding: 38px 20px;
  }

  .about-footer {
    font-size: 0.57rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page *,
  .about-page *::before,
  .about-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
```
