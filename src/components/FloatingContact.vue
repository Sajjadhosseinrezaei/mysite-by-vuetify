
<template>
  <div
    class="floating-contact"
    aria-label="راه‌های ارتباطی"
    :style="{
      '--footer-visible-height': `${footerVisibleHeight}px`,
    }"
  >
    <!-- WhatsApp -->
    <a
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="float-btn whatsapp"
      :aria-label="`پیام در واتساپ به ${phone}`"
    >
      <span class="btn-glow" aria-hidden="true"></span>

      <v-icon class="whatsapp-icon" size="25">
        mdi-whatsapp
      </v-icon>

      <span class="label">واتساپ</span>
      <span class="btn-arrow" aria-hidden="true">↗</span>
    </a>

    <!-- Telegram -->
    <a
      :href="telegramLink"
      target="_blank"
      rel="noopener noreferrer"
      class="float-btn telegram"
      :aria-label="`پیام در تلگرام به ${telegramUser}`"
    >
      <span class="btn-glow" aria-hidden="true"></span>

      <v-icon class="telegram-icon" size="27">
        mdi-send
      </v-icon>

      <span class="label">تلگرام</span>
      <span class="btn-arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue'

// اطلاعات تماس
const phone = '+989039103542'
const telegramUser = 'sajjadhossein'

// لینک واتساپ
const whatsappLink = computed(() => {
  const message = encodeURIComponent(
    'سلام، در مورد پروژه‌هایت پیام می‌فرستم.'
  )

  // wa.me شماره را بدون + و فاصله می‌پذیرد.
  const normalizedPhone = phone.replace(/\D/g, '')

  return `https://wa.me/${normalizedPhone}?text=${message}`
})

// لینک تلگرام
const telegramLink = computed(() => {
  const username = telegramUser.trim().replace(/^@/, '')

  if (/^https?:\/\//i.test(username)) {
    return username
  }

  return `https://t.me/${username}`
})

// مدیریت موقعیت دکمه‌ها نسبت به فوتر
const footerVisibleHeight = ref(0)

let footerElement = null
let footerObserver = null
let resizeObserver = null
let animationFrameId = null

function updateFooterPosition() {
  if (!footerElement) {
    footerVisibleHeight.value = 0
    return
  }

  const rect = footerElement.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // مقدار بخش قابل‌مشاهده فوتر در پایین صفحه
  const visibleHeight = Math.max(
    0,
    Math.min(viewportHeight, viewportHeight - rect.top)
  )

  footerVisibleHeight.value = visibleHeight
}

function scheduleFooterPositionUpdate() {
  if (animationFrameId !== null) {
    return
  }

  animationFrameId = window.requestAnimationFrame(() => {
    animationFrameId = null
    updateFooterPosition()
  })
}

onMounted(() => {
  // فوتر باید تگ <footer> داشته باشد.
  footerElement = document.querySelector('footer')

  if (!footerElement) {
    console.warn(
      'FloatingContact: تگ <footer> در صفحه پیدا نشد.'
    )
    return
  }

  footerObserver = new IntersectionObserver(
    scheduleFooterPositionUpdate,
    {
      threshold: Array.from(
        { length: 11 },
        (_, index) => index / 10
      ),
    }
  )

  footerObserver.observe(footerElement)

  // تغییر ارتفاع فوتر
  resizeObserver = new ResizeObserver(
    scheduleFooterPositionUpdate
  )
  resizeObserver.observe(footerElement)

  // تغییر موقعیت هنگام اسکرول و تغییر اندازه صفحه
  window.addEventListener(
    'scroll',
    scheduleFooterPositionUpdate,
    { passive: true }
  )

  window.addEventListener(
    'resize',
    scheduleFooterPositionUpdate
  )

  updateFooterPosition()
})

onBeforeUnmount(() => {
  footerObserver?.disconnect()
  resizeObserver?.disconnect()

  window.removeEventListener(
    'scroll',
    scheduleFooterPositionUpdate
  )

  window.removeEventListener(
    'resize',
    scheduleFooterPositionUpdate
  )

  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.floating-contact {
  --normal-bottom: 24px;

  position: fixed;
  bottom: calc(
    var(--normal-bottom) + var(--footer-visible-height, 0px)
  );
  left: 20px;
  z-index: 1400;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  direction: ltr;
  font-family: "Shabnam", sans-serif;

  transition: bottom 0.12s ease-out;
}

/* ساختار اصلی دکمه‌ها */
.float-btn {
  position: relative;
  isolation: isolate;
  overflow: hidden;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  min-height: 46px;
  padding: 0 15px;

  color: #fff;
  text-decoration: none;
  white-space: nowrap;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;

  background: #101014;
  box-shadow:
    0 5px 18px rgba(0, 0, 0, 0.35),
    inset 0 0 12px rgba(255, 255, 255, 0.025);

  transform: translateZ(0);

  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

/* حاشیه نئونی */
.float-btn::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -2;
  border-radius: inherit;

  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 235deg,
    var(--contact-color) 285deg,
    #fff 305deg,
    var(--contact-color) 325deg,
    transparent 360deg
  );

  opacity: 0;
  transition: opacity 0.25s ease;
}

/* لایه داخلی */
.float-btn::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  border-radius: 12px;
  background: #101014;
}

/* نور متحرک روی دکمه */
.btn-glow {
  position: absolute;
  top: -60%;
  left: -80%;
  width: 65%;
  height: 220%;

  pointer-events: none;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.18),
    transparent
  );

  transform: rotate(20deg);
  transition: left 0.5s ease;
}

.label {
  position: relative;
  font-size: 13px;
  font-weight: 700;
}

.btn-arrow {
  position: relative;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;

  transition:
    transform 0.25s ease,
    color 0.25s ease;
}

/* واتساپ */
.whatsapp {
  --contact-color: #25d366;

  color: #d6ffe5;
  border-color: rgba(37, 211, 102, 0.35);
  background: #0b1d15;
}

.whatsapp::after {
  background: #0b1d15;
}

.whatsapp .whatsapp-icon {
  color: #25d366;
  filter: drop-shadow(0 0 5px rgba(37, 211, 102, 0.4));
}

/* تلگرام */
.telegram {
  --contact-color: #2aabee;

  color: #fff;
  border-color: #45c4ff;
  background: #087eb5;
}

.telegram::after {
  background: #087eb5;
}

.telegram .telegram-icon {
  color: #fff !important;
  opacity: 1 !important;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

/* هاور مشترک */
.float-btn:hover {
  transform: translateY(-4px) scale(1.025);
}

.float-btn:hover::before {
  opacity: 1;
}

.float-btn:hover .btn-glow {
  left: 130%;
}

.float-btn:hover .btn-arrow {
  color: #fff;
  transform: translate(2px, -2px);
}

/* هاور واتساپ */
.whatsapp:hover {
  border-color: #25d366;
  box-shadow:
    0 8px 26px rgba(0, 0, 0, 0.4),
    0 0 18px rgba(37, 211, 102, 0.22);
}

/* هاور تلگرام */
.telegram:hover {
  border-color: #8bdcff;
  background: #096b99;
  box-shadow:
    0 8px 26px rgba(0, 0, 0, 0.4),
    0 0 18px rgba(42, 171, 238, 0.35);
}

.telegram:hover::after {
  background: #096b99;
}

/* فوکوس با صفحه‌کلید */
.float-btn:focus-visible {
  outline: 2px solid #ff174d;
  outline-offset: 4px;
}

/* موبایل */
@media (max-width: 600px) {
  .floating-contact {
    --normal-bottom: 18px;

    left: 14px;
    gap: 10px;
  }

  .float-btn {
    width: 48px;
    height: 48px;
    min-height: 48px;
    padding: 0;
    gap: 0;
    border-radius: 50%;
  }

  .float-btn::after {
    border-radius: 50%;
  }

  .float-btn .label,
  .float-btn .btn-arrow {
    display: none;
  }

  .float-btn .whatsapp-icon,
  .float-btn .telegram-icon {
    font-size: 25px;
  }
}

/* صفحه‌های بسیار کوچک */
@media (max-width: 360px) {
  .floating-contact {
    --normal-bottom: 14px;
    left: 10px;
  }

  .float-btn {
    width: 44px;
    height: 44px;
    min-height: 44px;
  }
}

/* کاهش حرکت برای کاربران نیازمند دسترس‌پذیری */
@media (prefers-reduced-motion: reduce) {
  .floating-contact,
  .float-btn,
  .btn-glow,
  .btn-arrow,
  .float-btn::before {
    transition: none;
  }

  .float-btn:hover {
    transform: none;
  }
}
</style>
