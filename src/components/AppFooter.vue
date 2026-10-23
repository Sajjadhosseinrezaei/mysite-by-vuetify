```vue
<template>
  <v-footer app class="spider-footer" theme="dark">
    <!-- Animated background -->
    <div class="footer-web" aria-hidden="true"></div>
    <div class="footer-scanline" aria-hidden="true"></div>
    <div class="footer-top-glow" aria-hidden="true"></div>

    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <span class="brand-logo" data-text="SHR">SHR</span>
        <span class="brand-separator"></span>
        <span class="brand-slogan">BEYOND THE CODE</span>
      </div>

      <!-- Social links -->
      <div class="footer-social">
        <a
          href="https://github.com/Sajjadhosseinrezaei"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="social-link github"
        >
          <v-icon size="19">mdi-github</v-icon>
          <span class="social-tooltip">GitHub</span>
        </a>

        <a
          href="https://www.linkedin.com/in/sajjadhossein-rezaei-b3a0a1320"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="social-link linkedin"
        >
          <v-icon size="19">mdi-linkedin</v-icon>
          <span class="social-tooltip">LinkedIn</span>
        </a>

        <a
          href="mailto:sajjadhosseinrezaei@yahoo.com"
          aria-label="Email"
          class="social-link email"
        >
          <v-icon size="19">mdi-email-outline</v-icon>
          <span class="social-tooltip">Email</span>
        </a>
      </div>

      <!-- Copyright -->
      <div class="footer-copy">
        <span class="copy-symbol">©</span>
        <span>{{ currentYear }}</span>
        <span class="copy-divider">/</span>
        <span class="copy-name">سجاد حسین</span>
      </div>
    </div>

    <!-- Animated neon line -->
    <div class="footer-energy-line" aria-hidden="true">
      <span></span>
    </div>
  </v-footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.spider-footer {
  position: relative;
  display: block;
  min-height: 62px;
  padding: 0 !important;
  overflow: hidden;
  isolation: isolate;
  color: #f5f5f7;
  background: #090307 !important;
  border-top: 1px solid rgba(255, 0, 60, 0.32);
  font-family: "Shabnam", sans-serif;
}

/* Spider-Verse web pattern */
.footer-web {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.23;
  background-image:
    radial-gradient(circle, rgba(255, 0, 60, 0.7) 0.7px, transparent 1px),
    repeating-radial-gradient(
      ellipse at 100% 0%,
      transparent 0,
      transparent 24px,
      rgba(0, 132, 255, 0.2) 25px,
      transparent 26px,
      transparent 42px
    ),
    linear-gradient(
      110deg,
      transparent 20%,
      rgba(255, 0, 60, 0.08) 50%,
      transparent 80%
    );
  background-size: 9px 9px, 180px 100px, 100% 100%;
  animation: web-shift 18s linear infinite;
}

/* Moving scanline */
.footer-scanline {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgba(255, 255, 255, 0.045) 4px
  );
}

/* Red and blue ambient light */
.footer-top-glow {
  position: absolute;
  top: -20px;
  left: 50%;
  width: 45%;
  height: 35px;
  transform: translateX(-50%);
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 132, 255, 0.12),
    rgba(255, 0, 60, 0.16),
    transparent
  );
  filter: blur(12px);
}

.footer-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  min-height: 62px;
  padding: 9px 24px;
}

/* Brand identity */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.brand-logo {
  position: relative;
  color: #ff174d;
  font-family: monospace;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 1px;
  text-shadow:
    1px 0 #0084ff,
    -1px 0 rgba(255, 0, 60, 0.5),
    0 0 12px rgba(255, 0, 60, 0.45);
  animation: logo-flicker 5s infinite;
}

.brand-logo::after {
  position: absolute;
  inset: 0;
  content: attr(data-text);
  color: #0084ff;
  opacity: 0;
  clip-path: inset(45% 0 40% 0);
  animation: logo-glitch 4s infinite;
}

.brand-separator {
  width: 1px;
  height: 17px;
  background: linear-gradient(
    to bottom,
    transparent,
    #ff003c,
    #0084ff,
    transparent
  );
}

.brand-slogan {
  color: rgba(255, 255, 255, 0.62);
  font-family: monospace;
  font-size: 9px;
  letter-spacing: 1.4px;
  white-space: nowrap;
}

/* Social icons */
.footer-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.social-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  color: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  text-decoration: none;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.social-link:hover {
  transform: translateY(-3px);
}

.github:hover {
  color: #fff;
  border-color: #ff003c;
  background: rgba(255, 0, 60, 0.1);
  box-shadow:
    0 0 9px rgba(255, 0, 60, 0.28),
    inset 0 0 8px rgba(255, 0, 60, 0.08);
}

.linkedin:hover {
  color: #45a5ff;
  border-color: #0084ff;
  background: rgba(0, 132, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 132, 255, 0.28);
}

.email:hover {
  color: #ff6688;
  border-color: #ff174d;
  background: rgba(255, 0, 60, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 60, 0.24);
}

/* Tooltip */
.social-tooltip {
  position: absolute;
  right: 50%;
  bottom: calc(100% + 9px);
  z-index: 2;
  padding: 4px 8px;
  transform: translateX(50%) translateY(4px);
  color: #fff;
  background: #160810;
  border: 1px solid rgba(255, 0, 60, 0.35);
  border-radius: 4px;
  font-family: monospace;
  font-size: 10px;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.social-link:hover .social-tooltip,
.social-link:focus-visible .social-tooltip {
  opacity: 1;
  transform: translateX(50%) translateY(0);
}

/* Copyright */
.footer-copy {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  white-space: nowrap;
}

.copy-symbol {
  color: #ff174d;
}

.copy-divider {
  color: #0084ff;
  padding: 0 2px;
}

.copy-name {
  color: rgba(255, 255, 255, 0.75);
}

/* Bottom animated energy beam */
.footer-energy-line {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  overflow: hidden;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.04);
}

.footer-energy-line span {
  position: absolute;
  top: 0;
  left: -35%;
  width: 35%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    #0084ff 35%,
    #fff 50%,
    #ff003c 75%,
    transparent
  );
  box-shadow:
    0 0 7px rgba(255, 0, 60, 0.8),
    0 0 12px rgba(0, 132, 255, 0.5);
  animation: energy-flow 5s ease-in-out infinite;
}

/* Animations */
@keyframes energy-flow {
  0% {
    left: -35%;
  }
  100% {
    left: 100%;
  }
}

@keyframes web-shift {
  from {
    background-position: 0 0, 0 0, 0 0;
  }
  to {
    background-position: 36px 18px, 40px 20px, 0 0;
  }
}

@keyframes logo-flicker {
  0%, 94%, 100% {
    opacity: 1;
  }
  95% {
    opacity: 0.75;
  }
  96% {
    opacity: 1;
  }
  97% {
    opacity: 0.85;
  }
}

@keyframes logo-glitch {
  0%, 91%, 95%, 100% {
    opacity: 0;
    transform: translate(0);
  }
  92% {
    opacity: 0.7;
    transform: translate(2px, -1px);
  }
  93% {
    opacity: 0.4;
    transform: translate(-2px, 1px);
  }
  94% {
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 600px) {
  .footer-inner {
    min-height: 58px;
    gap: 8px;
    padding: 8px 12px;
  }

  .brand-logo {
    font-size: 15px;
  }

  .brand-slogan {
    font-size: 8px;
    letter-spacing: 0.6px;
  }

  .footer-brand {
    gap: 6px;
  }

  .footer-social {
    gap: 5px;
  }

  .social-link {
    width: 30px;
    height: 30px;
  }

  .footer-copy {
    display: none;
  }
}

@media (max-width: 360px) {
  .brand-slogan {
    display: none;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .footer-web,
  .brand-logo,
  .brand-logo::after,
  .footer-energy-line span {
    animation: none;
  }

  .social-link,
  .social-tooltip {
    transition: none;
  }

  .social-link:hover {
    transform: none;
  }
}
</style>
```
