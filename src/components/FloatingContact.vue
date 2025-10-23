<template>
  <div class="floating-contact" aria-hidden="false">
    <!-- WhatsApp -->
    <a
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="float-btn whatsapp"
      :aria-label="`پیام در واتساپ به ${phone}`"
    >
      <v-icon size="28">mdi-whatsapp</v-icon>
      <span class="label d-none d-sm-inline">واتساپ</span>
    </a>

    <!-- Telegram -->
    <a
      :href="telegramLink"
      target="_blank"
      rel="noopener noreferrer"
      class="float-btn telegram"
      :aria-label="`پیام در تلگرام به ${telegramUser}`"
    >
      <v-icon size="28">mdi-telegram</v-icon>
      <span class="label d-none d-sm-inline">تلگرام</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// --- CONFIG ---
const phone = '+989039103542' // شماره واتساپ کامل با +98
const telegramUser = 'sajjadhossein' // یوزرنیم تلگرام بدون @

// --- LINKS ---
const whatsappLink = computed(() => {
  const text = encodeURIComponent('سلام، در مورد پروژه‌هایت پیام می‌فرستم.')
  const normalized = phone.replace(/\s+/g, '')
  return `https://wa.me/${normalized.replace(/^\+/, '')}?text=${text}`
})

const telegramLink = computed(() => {
  if (telegramUser.startsWith('http')) return telegramUser
  return `https://t.me/${telegramUser}`
})
</script>

<style scoped>
.floating-contact {
  position: fixed;
  bottom: 22px;
  left: 20px; /* ✅ moved to the left */
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1400;
  direction: ltr;
}

/* base button */
.float-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.5);
  color: white;
  text-decoration: none;
  font-weight: 700;
  transform-origin: left center; /* ✅ changed from right to left */
  transition: transform 120ms ease, box-shadow 120ms ease;
  backdrop-filter: blur(4px);
}

.float-btn .label {
  font-size: 14px;
  line-height: 1;
}

.float-btn.whatsapp {
  background: linear-gradient(180deg,#25D366,#128C7E);
}

.float-btn.telegram {
  background: linear-gradient(180deg,#2AABEE,#0088CC);
}

.float-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 26px rgba(2,6,23,0.6);
}

@media (max-width: 420px) {
  .float-btn {
    padding: 10px;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    justify-content: center;
  }
  .float-btn .label { display: none !important; }
}

.float-btn:focus {
  outline: 3px solid rgba(255,255,255,0.12);
  outline-offset: 3px;
}
</style>
