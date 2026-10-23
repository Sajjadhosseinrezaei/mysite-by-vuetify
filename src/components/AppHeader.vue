```vue
<template>
  <div dir="rtl" class="spider-header-wrapper">
    <!-- هدر اصلی -->
    <v-app-bar
      position="fixed"
      color="surface"
      elevation="0"
      class="px-4 header-synced spider-header"
      theme="dark"
    >
      <!-- منوی موبایل -->
      <v-app-bar-nav-icon
        class="d-md-none spider-menu-button"
        @click.stop="drawer = !drawer"
        aria-label="باز کردن منو"
        aria-expanded="drawer"
      />

      <!-- لینک‌های دسکتاپ -->
      <v-toolbar-items class="d-none d-md-flex spider-nav align-center">
        <v-btn rounded="lg" variant="text" to="/">خانه</v-btn>
        <v-btn rounded="lg" variant="text" to="/about">درباره من</v-btn>
        <v-btn rounded="lg" variant="text" to="/projects">پروژه‌ها</v-btn>
        <v-btn rounded="lg" variant="text" to="/contact">تماس</v-btn>
      </v-toolbar-items>

      <v-spacer />

      <!-- لوگو -->
      <v-toolbar-title
        class="font-weight-bold text-end spider-logo"
        data-text="SHR"
      >
        SHR
      </v-toolbar-title>
    </v-app-bar>

    <!-- منوی موبایل -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      width="290"
      class="spider-drawer"
      theme="dark"
    >
      <div class="drawer-web-decoration" aria-hidden="true"></div>

      <div class="drawer-brand">
        <span class="drawer-brand-logo">SHR</span>
        <span class="drawer-brand-caption">BEYOND THE CODE</span>
        <span class="drawer-brand-description">
          Developer · Creator · Problem Solver
        </span>
      </div>

      <v-divider class="drawer-divider" />

      <v-list nav class="spider-drawer-list">
        <v-list-item
          to="/"
          prepend-icon="mdi-home-outline"
          title="خانه"
          rounded="lg"
          @click="drawer = false"
        />

        <v-list-item
          to="/projects"
          prepend-icon="mdi-briefcase-outline"
          title="پروژه‌ها"
          rounded="lg"
          @click="drawer = false"
        />

        <v-list-item
          to="/about"
          prepend-icon="mdi-account-outline"
          title="درباره من"
          rounded="lg"
          @click="drawer = false"
        />

        <v-list-item
          to="/contact"
          prepend-icon="mdi-email-outline"
          title="تماس"
          rounded="lg"
          @click="drawer = false"
        />
      </v-list>

      <div class="drawer-footer">
        <span class="footer-dot" aria-hidden="true"></span>
        <span>BEYOND THE CODE</span>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
/* =========================================
   1. هدر اصلی | Spider-Verse
========================================= */

.spider-header {
  position: relative;
  overflow: visible;
  color: #fff !important;
  background-color: rgba(13, 2, 5, 0.94) !important;
  background-image:
    radial-gradient(
      circle,
      rgba(255, 0, 60, 0.2) 1px,
      transparent 1.5px
    ),
    linear-gradient(
      115deg,
      rgba(0, 132, 255, 0.08),
      transparent 42%,
      rgba(255, 0, 60, 0.07)
    );

  background-size: 10px 10px, 100% 100%;
  border-bottom: 1px solid rgba(255, 0, 60, 0.35);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* تار عنکبوت گوشه هدر */
.spider-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 125px;
  height: 64px;
  pointer-events: none;
  opacity: 0.48;

  background-image:
    repeating-radial-gradient(
      circle at 0 0,
      transparent 0 10px,
      rgba(0, 132, 255, 0.5) 10.5px 11.2px,
      transparent 11.8px 18px
    ),
    repeating-conic-gradient(
      from 0deg at 0 0,
      transparent 0deg 14deg,
      rgba(255, 0, 60, 0.34) 14.5deg 15.2deg,
      transparent 15.8deg 30deg
    );

  mask-image: linear-gradient(
    135deg,
    #000 0%,
    rgba(0, 0, 0, 0.65) 42%,
    transparent 100%
  );
}

/* نوار نئونی زیر هدر */
.spider-header::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  pointer-events: none;

  background: linear-gradient(
    90deg,
    transparent,
    #0084ff 20%,
    #ff003c 52%,
    #0084ff 82%,
    transparent
  );

  box-shadow: 0 0 10px rgba(255, 0, 60, 0.4);
}

/* =========================================
   2. لوگوی SHR | Glow + Glitch
========================================= */

.spider-logo {
  position: relative;
  overflow: visible;
  color: #fff;
  letter-spacing: 3px;

  text-shadow:
    0 0 7px rgba(255, 0, 60, 0.75),
    0 0 18px rgba(255, 0, 60, 0.3);

  transition:
    color 0.2s ease,
    text-shadow 0.2s ease;
}

.spider-logo::before,
.spider-logo::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0;
}

.spider-logo::before {
  color: #ff003c;
  text-shadow: 2px 0 #0084ff;
  animation: spider-glitch-red 6s infinite;
}

.spider-logo::after {
  color: #0084ff;
  text-shadow: -2px 0 #ff003c;
  animation: spider-glitch-blue 6s infinite;
}

.spider-logo:hover {
  color: #ff003c;

  text-shadow:
    0 0 8px rgba(255, 0, 60, 0.9),
    0 0 20px rgba(255, 0, 60, 0.5);
}

@keyframes spider-glitch-red {
  0%, 88%, 91%, 94%, 100% {
    opacity: 0;
    transform: translateX(0);
    clip-path: inset(0 0 0 0);
  }

  89% {
    opacity: 0.8;
    transform: translateX(-2px);
    clip-path: inset(10% 0 65% 0);
  }

  90% {
    opacity: 0.7;
    transform: translateX(2px);
    clip-path: inset(55% 0 20% 0);
  }

  92% {
    opacity: 0.8;
    transform: translateX(-1px);
    clip-path: inset(35% 0 40% 0);
  }
}

@keyframes spider-glitch-blue {
  0%, 88%, 91%, 94%, 100% {
    opacity: 0;
    transform: translateX(0);
    clip-path: inset(0 0 0 0);
  }

  89% {
    opacity: 0.8;
    transform: translateX(2px);
    clip-path: inset(60% 0 15% 0);
  }

  90% {
    opacity: 0.7;
    transform: translateX(-2px);
    clip-path: inset(15% 0 60% 0);
  }

  93% {
    opacity: 0.8;
    transform: translateX(1px);
    clip-path: inset(40% 0 35% 0);
  }
}

/* =========================================
   3. لینک‌های دسکتاپ
========================================= */

.spider-nav {
  gap: 4px;
}

.spider-nav :deep(.v-btn) {
  position: relative;
  color: #e8e8ee;
  font-weight: 600;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.spider-nav :deep(.v-btn:hover) {
  color: #ff426b;
  background-color: rgba(255, 0, 60, 0.09);
  transform: translateY(-1px);
}

.spider-nav :deep(.v-btn--active) {
  color: #ff426b;
  background-color: rgba(255, 0, 60, 0.08);
}

.spider-nav :deep(.v-btn--active::after) {
  content: "";
  position: absolute;
  right: 25%;
  bottom: 3px;
  left: 25%;
  height: 2px;
  border-radius: 2px;
  background-color: #ff003c;
  box-shadow: 0 0 7px rgba(255, 0, 60, 0.5);
}

/* =========================================
   4. دکمه منوی موبایل
========================================= */

.spider-menu-button {
  color: #ff426b;
  border-radius: 12px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.spider-menu-button:hover {
  color: #fff;
  background-color: rgba(255, 0, 60, 0.14);
}

/* =========================================
   5. Drawer شیشه‌ای
========================================= */

.spider-drawer {
  color: #fff !important;
  background-color: #0d0205 !important;
  border-left: 1px solid rgba(255, 0, 60, 0.5) !important;

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.spider-drawer :deep(.v-navigation-drawer__content) {
  position: relative;
  overflow-x: hidden;

  background:
    radial-gradient(
      circle,
      rgba(0, 132, 255, 0.1) 1px,
      transparent 1.5px
    ),
    linear-gradient(
      150deg,
      rgba(255, 0, 60, 0.07),
      transparent 55%
    ),
    #0d0205;

  background-size: 10px 10px, 100% 100%, 100% 100%;
}

/* تار عنکبوت Drawer */
.drawer-web-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 155px;
  height: 145px;
  pointer-events: none;
  opacity: 0.42;

  background-image:
    repeating-radial-gradient(
      circle at 0 0,
      transparent 0 11px,
      rgba(0, 132, 255, 0.5) 11.5px 12.2px,
      transparent 12.8px 21px
    ),
    repeating-conic-gradient(
      from 0deg at 0 0,
      transparent 0deg 14deg,
      rgba(255, 0, 60, 0.32) 14.5deg 15deg,
      transparent 15.5deg 30deg
    );

  mask-image: linear-gradient(
    135deg,
    #000,
    transparent 90%
  );
}

/* =========================================
   6. برند Drawer
========================================= */

.drawer-brand {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 30px 22px 22px;
}

.drawer-brand-logo {
  color: #fff;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 5px;

  text-shadow:
    0 0 8px rgba(255, 0, 60, 0.75),
    0 0 20px rgba(255, 0, 60, 0.3);
}

.drawer-brand-caption {
  color: #0084ff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
}

.drawer-brand-description {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.52);
  font-size: 11px;
  letter-spacing: 0.2px;
}

.drawer-divider {
  margin: 0 18px;
  border-color: rgba(255, 0, 60, 0.32);
}

/* =========================================
   7. لینک‌های Drawer
========================================= */

.spider-drawer-list {
  position: relative;
  padding: 18px 12px;
}

.spider-drawer-list :deep(.v-list-item) {
  min-height: 50px;
  margin-bottom: 7px;
  color: #e8e8ee;
  border: 1px solid transparent;
  background-color: rgba(255, 255, 255, 0.015);

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.spider-drawer-list :deep(.v-list-item:hover) {
  color: #fff;
  background-color: rgba(255, 0, 60, 0.09);
  border-color: rgba(255, 0, 60, 0.3);
  transform: translateX(-2px);
}

.spider-drawer-list :deep(.v-list-item--active) {
  color: #ff426b;
  background-color: rgba(255, 0, 60, 0.1);
  border-color: rgba(255, 0, 60, 0.4);
}

.spider-drawer-list :deep(.v-list-item__prepend > .v-icon) {
  color: #0084ff;
  opacity: 1;
}

.spider-drawer-list
  :deep(.v-list-item--active .v-list-item__prepend > .v-icon) {
  color: #ff426b;
}

/* =========================================
   8. پایین Drawer
========================================= */

.drawer-footer {
  position: absolute;
  right: 20px;
  bottom: 20px;
  left: 20px;

  display: flex;
  align-items: center;
  gap: 9px;

  color: rgba(255, 255, 255, 0.48);
  font-size: 9px;
  letter-spacing: 1.5px;
  pointer-events: none;
}

.footer-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #0084ff;
  box-shadow: 0 0 8px rgba(0, 132, 255, 0.7);
  animation: pulse-dot 2.5s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 0.55;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* =========================================
   9. واکنش‌گرایی
========================================= */

@media (max-width: 600px) {
  .spider-header {
    padding-inline: 8px !important;
  }

  .spider-header::before {
    width: 85px;
    opacity: 0.35;
  }

  .spider-logo {
    font-size: 1.2rem;
  }
}

/* =========================================
   10. دسترس‌پذیری
========================================= */

@media (prefers-reduced-motion: reduce) {
  .spider-logo,
  .spider-logo::before,
  .spider-logo::after,
  .spider-nav :deep(.v-btn),
  .spider-menu-button,
  .spider-drawer-list :deep(.v-list-item),
  .footer-dot {
    animation: none !important;
    transition: none !important;
  }
}
</style>
```
