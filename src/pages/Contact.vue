<template>
  <v-container fluid class="contact-page pa-0">
    <!-- پس‌زمینه Spider-Verse -->
    <div class="universe-background" aria-hidden="true">
      <div class="universe-grid"></div>
      <div class="glow glow-red"></div>
      <div class="glow glow-blue"></div>
      <div class="web-pattern"></div>
    </div>

    <!-- Hero -->
    <section class="contact-hero">
      <div class="hero-content">
        <div class="eyebrow">
          <span class="status-dot"></span>
          CONTACT / ESTABLISH CONNECTION
        </div>

        <h1 class="hero-title">
          بیایید چیزی <span>بسازیم.</span>
        </h1>

        <p class="hero-subtitle">
          سوالی داری یا به دنبال همکاری هستی؟
          پیامت را بفرست؛ خوشحال می‌شوم با هم صحبت کنیم.
        </p>

        <div class="hero-decoration" aria-hidden="true">
          <span class="decoration-line"></span>
          <v-icon icon="mdi-email-fast-outline" size="25" />
          <span class="decoration-line"></span>
        </div>
      </div>
    </section>

    <!-- محتوای اصلی -->
    <v-container class="contact-content">
      <v-row justify="center" align="stretch">
        <!-- اطلاعات تماس -->
        <v-col cols="12" md="5">
          <section class="info-panel">
            <div class="section-index">01 / LET'S CONNECT</div>

            <h2 class="info-title">
              ارتباط را <span>شروع کن</span>
            </h2>

            <p class="info-description">
              اگر درباره پروژه‌ای سوال داری، به همکاری فکر می‌کنی
              یا فقط می‌خواهی سلام کنی، از طریق فرم یا راه‌های ارتباطی
              زیر پیام بده.
            </p>

            <div class="contact-methods">
              <a
                class="contact-method"
                href="mailto:sajjahosseinrezaei@yahoo.com"
              >
                <span class="method-icon method-icon-red">
                  <v-icon icon="mdi-email-outline" />
                </span>

                <span class="method-copy">
                  <span class="method-label">ایمیل</span>
                  <span class="method-value">sajjahosseinrezaei@yahoo.com</span>
                </span>

                <v-icon
                  icon="mdi-arrow-top-left"
                  class="method-arrow"
                />
              </a>

              <a
                class="contact-method"
                href="https://github.com/Sajjadhosseinrezaei"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="method-icon method-icon-blue">
                  <v-icon icon="mdi-github" />
                </span>

                <span class="method-copy">
                  <span class="method-label">GitHub</span>
                  <span class="method-value">پروژه‌ها و کدها</span>
                </span>

                <v-icon
                  icon="mdi-arrow-top-left"
                  class="method-arrow"
                />
              </a>

              <a
                class="contact-method"
                href="https://www.linkedin.com/in/sajjadhossein-rezaei-b3a0a1320/?isSelfProfile=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="method-icon method-icon-purple">
                  <v-icon icon="mdi-linkedin" />
                </span>

                <span class="method-copy">
                  <span class="method-label">LinkedIn</span>
                  <span class="method-value">ارتباط حرفه‌ای</span>
                </span>

                <v-icon
                  icon="mdi-arrow-top-left"
                  class="method-arrow"
                />
              </a>
            </div>

            <div class="availability-card">
              <span class="availability-dot"></span>

              <div>
                <div class="availability-title">آماده‌ی گفتگو</div>
                <div class="availability-description">
                  برای سوال‌ها و پیشنهادهای کاری پیام بفرست.
                </div>
              </div>
            </div>

            <div class="code-decoration" aria-hidden="true">
              <span class="code-muted">const</span>
              <span class="code-blue"> connection</span>
              <span> = </span>
              <span class="code-red">true</span>
              <span>;</span>
            </div>
          </section>
        </v-col>

        <!-- فرم تماس -->
        <v-col cols="12" md="7">
          <section class="form-panel">
            <div class="form-panel-header">
              <div>
                <div class="section-index">02 / SEND A MESSAGE</div>
                <h2 class="form-title">پیام خود را بنویس</h2>
              </div>

              <div class="form-icon">
                <v-icon icon="mdi-message-text-outline" size="27" />
              </div>
            </div>

            <p class="form-description">
              فیلدهای زیر را تکمیل کن تا پیامت برای من ارسال شود.
            </p>

            <v-form
              ref="contactForm"
              v-model="valid"
              validate-on="submit"
              @submit.prevent="submitForm"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <label class="field-label" for="contact-name">
                    نام و نام خانوادگی
                  </label>

                  <v-text-field
                    id="contact-name"
                    v-model.trim="form.name"
                    placeholder="نام شما"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-account-outline"
                    :rules="nameRules"
                    autocomplete="name"
                    maxlength="150"
                    required
                    hide-details="auto"
                    class="contact-input"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <label class="field-label" for="contact-email">
                    ایمیل
                  </label>

                  <v-text-field
                    id="contact-email"
                    v-model.trim="form.email"
                    placeholder="you@example.com"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-email-outline"
                    :rules="emailRules"
                    type="email"
                    autocomplete="email"
                    maxlength="254"
                    required
                    hide-details="auto"
                    class="contact-input"
                  />
                </v-col>

                <v-col cols="12">
                  <label class="field-label" for="contact-message">
                    پیام شما
                  </label>

                  <v-textarea
                    id="contact-message"
                    v-model.trim="form.message"
                    placeholder="درباره سوال، ایده یا پیشنهادت بنویس..."
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-message-text-outline"
                    :rules="messageRules"
                    rows="6"
                    auto-grow
                    maxlength="5000"
                    required
                    hide-details="auto"
                    class="contact-input message-input"
                  />
                </v-col>
              </v-row>

              <!-- Cloudflare Turnstile -->
              <div class="captcha-section">
                <div class="captcha-heading">
                  <v-icon icon="mdi-shield-check-outline" />
                  <span>تأیید امنیتی</span>
                </div>

                <div class="captcha-box">
                  <VueTurnstile
                    v-if="sitekey"
                    :key="turnstileKey"
                    :site-key="sitekey"
                    v-model="turnstileToken"
                    theme="dark"
                    size="normal"
                    appearance="always"
                    :retry="true"
                    :render-on-mount="true"
                    @expired="onTurnstileExpire"
                    @error="onTurnstileError"
                  />

                  <div v-else class="captcha-unavailable">
                    <v-icon
                      icon="mdi-alert-circle-outline"
                      color="red-accent-2"
                    />
                    <span>
                      کلید عمومی CAPTCHA تنظیم نشده است.
                    </span>
                  </div>
                </div>

                <p class="captcha-note">
                  برای جلوگیری از ارسال خودکار پیام‌ها، تأیید امنیتی را کامل کن.
                </p>
              </div>

              <!-- پیام‌های وضعیت -->
              <v-alert
                v-if="formError"
                type="error"
                variant="tonal"
                closable
                class="form-alert"
                @click:close="formError = ''"
              >
                {{ formError }}
              </v-alert>

              <v-alert
                v-if="successMessage"
                type="success"
                variant="tonal"
                closable
                class="form-alert"
                @click:close="successMessage = ''"
              >
                {{ successMessage }}
              </v-alert>

              <v-alert
                v-if="turnstileError"
                type="warning"
                variant="tonal"
                closable
                class="form-alert"
                @click:close="turnstileError = ''"
              >
                {{ turnstileError }}
              </v-alert>

              <v-btn
                type="submit"
                block
                size="large"
                rounded="lg"
                class="submit-btn mt-5"
                :loading="submitting"
                :disabled="
                  submitting ||
                  !sitekey ||
                  !turnstileToken
                "
                append-icon="mdi-arrow-left"
              >
                ارسال پیام
              </v-btn>

              <div class="form-footnote">
                <v-icon icon="mdi-lock-outline" size="15" />
                <span>اطلاعاتت فقط برای پاسخ‌گویی به پیام استفاده می‌شود.</span>
              </div>
            </v-form>
          </section>
        </v-col>
      </v-row>

      <!-- بخش پایانی -->
      <section class="bottom-banner">
        <div class="banner-symbol" aria-hidden="true">
          <v-icon icon="mdi-web" size="35" />
        </div>

        <div>
          <h2>هر پروژه‌ای از یک گفتگو شروع می‌شود.</h2>
          <p>منتظر شنیدن ایده‌ی تو هستم.</p>
        </div>
      </section>
    </v-container>

    <footer class="contact-footer">
      <span>ESTABLISH CONNECTION</span>
      <span class="footer-dot"></span>
      <span>PYTHON · DJANGO · APIs</span>
    </footer>

    <FloatingContact />
  </v-container>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import VueTurnstile from "vue-turnstile";
import api from "@/api/axios.js";
import FloatingContact from "@/components/FloatingContact.vue";

const valid = ref(false);
const contactForm = ref(null);

const sitekey = import.meta.env.VITE_TURNSTILE_SITEKEY || "";
const turnstileToken = ref("");
const turnstileError = ref("");
const formError = ref("");
const successMessage = ref("");
const submitting = ref(false);
const turnstileKey = ref(0);

let turnstileResetTimer = null;

const form = ref({
  name: "",
  email: "",
  message: "",
});

const nameRules = [
  (value) => !!value?.trim() || "لطفاً نام خود را وارد کنید.",
  (value) =>
    (typeof value === "string" && value.trim().length <= 150) ||
    "نام نباید بیشتر از ۱۵۰ کاراکتر باشد.",
];

const emailRules = [
  (value) => !!value?.trim() || "لطفاً ایمیل خود را وارد کنید.",
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "") ||
    "لطفاً یک ایمیل معتبر وارد کنید.",
];

const messageRules = [
  (value) => !!value?.trim() || "لطفاً پیام خود را وارد کنید.",
  (value) =>
    (typeof value === "string" && value.trim().length <= 5000) ||
    "پیام نباید بیشتر از ۵۰۰۰ کاراکتر باشد.",
];



function onTurnstileExpire() {
  turnstileToken.value = "";
  turnstileError.value = "تأیید امنیتی منقضی شد. لطفاً دوباره تأیید کن.";
}

function onTurnstileError() {
  turnstileToken.value = "";
  turnstileError.value = "تأیید امنیتی با مشکل مواجه شد. لطفاً دوباره تلاش کن.";

  if (turnstileResetTimer) {
    clearTimeout(turnstileResetTimer);
  }

  turnstileResetTimer = setTimeout(() => {
    resetTurnstile();
  }, 2000);
}

function resetTurnstile() {
  turnstileToken.value = "";

  // تغییر key باعث بازسازی کامپوننت و ایجاد مجدد ویجت می‌شود.
  // این روش به متدهای داخلی و مستندنشده‌ی کتابخانه وابسته نیست.
  turnstileKey.value += 1;
}

async function submitForm() {
  if (submitting.value) {
    return;
  }

  formError.value = "";
  successMessage.value = "";
  turnstileError.value = "";

  if (!sitekey) {
    formError.value = "کلید عمومی Cloudflare Turnstile تنظیم نشده است.";
    return;
  }

  if (!contactForm.value) {
    formError.value = "فرم آماده نیست. لطفاً صفحه را دوباره بارگذاری کن.";
    return;
  }

  const result = await contactForm.value.validate();

  if (!result.valid) {
    formError.value = "لطفاً فیلدهای فرم را به‌درستی تکمیل کن.";
    return;
  }

  if (!turnstileToken.value) {
    turnstileError.value = "لطفاً تأیید امنیتی را کامل کن.";
    return;
  }

  submitting.value = true;

  try {
    await api.post("/contact/", {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
      turnstile_token: turnstileToken.value,
    });

    successMessage.value = "پیام شما با موفقیت ارسال شد.";

    form.value = {
      name: "",
      email: "",
      message: "",
    };

    contactForm.value.resetValidation();
    resetTurnstile();
  } catch (error) {
    console.error("Contact form submission failed:", error);

    const status = error?.response?.status;

    if (status === 400) {
      formError.value =
        "اطلاعات فرم یا تأیید امنیتی معتبر نیست. آن‌ها را بررسی و دوباره تلاش کن.";
    } else if (status === 429) {
      formError.value =
        "تعداد درخواست‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کن.";
    } else if (!error?.response) {
      formError.value =
        "ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی و دوباره تلاش کن.";
    } else {
      formError.value =
        "ارسال پیام ناموفق بود. لطفاً کمی بعد دوباره تلاش کن.";
    }

    resetTurnstile();
  } finally {
    submitting.value = false;
  }
}

onBeforeUnmount(() => {
  if (turnstileResetTimer) {
    clearTimeout(turnstileResetTimer);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap");

.contact-page {
  --spider-red: #ff3158;
  --spider-blue: #35b8ff;
  --spider-purple: #a855f7;
  --spider-bg: #080910;
  --spider-card: rgba(17, 19, 31, 0.88);
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

.contact-page :deep(.v-btn),
.contact-page :deep(.v-field),
.contact-page :deep(.v-alert) {
  font-family: inherit;
  letter-spacing: 0;
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
  opacity: 0.14;
  background-image:
    linear-gradient(rgba(90, 100, 160, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(90, 100, 160, 0.12) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

.glow {
  position: absolute;
  width: 430px;
  height: 430px;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.15;
}

.glow-red {
  top: 0;
  right: -230px;
  background: var(--spider-red);
}

.glow-blue {
  top: 35%;
  left: -250px;
  background: var(--spider-blue);
}

.web-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 620px;
  opacity: 0.12;
  background-image: repeating-conic-gradient(
    from 0deg at 100% 0%,
    transparent 0deg 9deg,
    rgba(120, 150, 255, 0.55) 9.2deg 9.45deg,
    transparent 9.7deg 18deg
  );
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

/* Hero */

.contact-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  padding: 70px 22px 55px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
}

.hero-content {
  width: 100%;
  max-width: 800px;
}

.eyebrow,
.section-index {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #a6a8ba;
  font-family: monospace;
  font-size: 0.72rem;
  letter-spacing: 1.4px;
}

.status-dot,
.footer-dot {
  flex: 0 0 auto;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--spider-red);
  box-shadow: 0 0 12px rgba(255, 49, 88, 0.8);
}

.hero-title {
  margin-top: 24px;
  color: #f4f4f9;
  font-size: clamp(2.1rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.5;
  text-shadow: 3px 0 rgba(255, 49, 88, 0.18);
}

.hero-title span {
  color: var(--spider-red);
  text-shadow: 2px 0 rgba(53, 184, 255, 0.25);
}

.hero-subtitle {
  max-width: 620px;
  margin: 12px auto 0;
  color: #a7aabd;
  font-size: 1rem;
  line-height: 2.2;
}

.hero-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 27px;
  color: var(--spider-blue);
}

.decoration-line {
  width: 45px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--spider-blue));
}

.decoration-line:last-child {
  transform: rotate(180deg);
}

/* محتوای صفحه */

.contact-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  padding-top: 55px;
  padding-bottom: 60px;
}

.info-panel {
  height: 100%;
  padding: 25px 8px 20px 18px;
}

.info-panel .section-index,
.form-panel .section-index {
  justify-content: flex-start;
  color: var(--spider-blue);
  font-size: 0.68rem;
}

.info-title {
  margin-top: 20px;
  color: #f4f4f9;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.7;
}

.info-title span {
  color: var(--spider-red);
}

.info-description {
  margin-top: 12px;
  color: #a4a7bb;
  font-size: 0.94rem;
  line-height: 2.3;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(18, 20, 32, 0.62);
  color: inherit;
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;
}

.contact-method:hover {
  transform: translateX(-3px);
  border-color: rgba(53, 184, 255, 0.3);
  background: rgba(24, 28, 44, 0.9);
}

.method-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  border-radius: 12px;
}

.method-icon-red {
  color: var(--spider-red);
  background: rgba(255, 49, 88, 0.1);
}

.method-icon-blue {
  color: var(--spider-blue);
  background: rgba(53, 184, 255, 0.1);
}

.method-icon-purple {
  color: #c084fc;
  background: rgba(168, 85, 247, 0.1);
}

.method-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.method-label {
  color: #f0f0f7;
  font-size: 0.9rem;
  font-weight: 600;
}

.method-value {
  color: #9397ac;
  font-size: 0.8rem;
  overflow-wrap: anywhere;
}

.method-arrow {
  margin-inline-start: auto;
  color: #6f748a;
  transition: color 0.2s ease, transform 0.2s ease;
}

.contact-method:hover .method-arrow {
  color: var(--spider-blue);
  transform: translate(-2px, -2px);
}

.availability-card {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  margin-top: 26px;
  padding: 17px;
  border: 1px solid rgba(53, 184, 255, 0.15);
  border-radius: 14px;
  background: rgba(53, 184, 255, 0.045);
}

.availability-dot {
  flex: 0 0 auto;
  width: 9px;
  height: 9px;
  margin-top: 6px;
  border-radius: 50%;
  background: #44d19d;
  box-shadow: 0 0 12px rgba(68, 209, 157, 0.5);
}

.availability-title {
  color: #e9ebf6;
  font-size: 0.9rem;
  font-weight: 700;
}

.availability-description {
  margin-top: 5px;
  color: #969aaf;
  font-size: 0.8rem;
  line-height: 1.9;
}

.code-decoration {
  margin-top: 30px;
  color: #9ca1b8;
  font-family: monospace;
  font-size: 0.86rem;
  direction: ltr;
  text-align: left;
}

.code-muted {
  color: #c084fc;
}

.code-blue {
  color: var(--spider-blue);
}

.code-red {
  color: var(--spider-red);
}

/* فرم */

.form-panel {
  padding: 30px;
  border: 1px solid var(--spider-border);
  border-radius: 20px;
  background: var(--spider-card);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
}

.form-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.form-title {
  margin-top: 12px;
  color: #f4f4f9;
  font-size: 1.45rem;
  font-weight: 800;
}

.form-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 54px;
  width: 54px;
  height: 54px;
  border: 1px solid rgba(255, 49, 88, 0.22);
  border-radius: 15px;
  background: rgba(255, 49, 88, 0.08);
  color: var(--spider-red);
}

.form-description {
  margin: 12px 0 25px;
  color: #9da0b4;
  font-size: 0.88rem;
  line-height: 2;
}

.field-label {
  display: block;
  margin-bottom: 9px;
  color: #d5d7e5;
  font-size: 0.85rem;
  font-weight: 500;
}

.contact-input {
  margin-bottom: 5px;
}

.contact-input :deep(.v-field) {
  border-radius: 12px;
  background: rgba(6, 8, 16, 0.55);
  color: #f4f4f9;
}

.contact-input :deep(.v-field__outline) {
  color: rgba(255, 255, 255, 0.13);
}

.contact-input :deep(.v-field--focused .v-field__outline) {
  color: var(--spider-blue);
}

.contact-input :deep(.v-field__input) {
  color: #f4f4f9;
  font-size: 0.9rem;
}

.contact-input :deep(.v-field__input::placeholder) {
  color: #74788e;
  opacity: 1;
}

.contact-input :deep(.v-label) {
  color: #9b9fb4;
}

.contact-input :deep(.v-icon) {
  color: #8b90a7;
}

.contact-input :deep(.v-messages__message) {
  font-size: 0.76rem;
}

.message-input :deep(textarea) {
  line-height: 1.9;
}

/* CAPTCHA */

.captcha-section {
  margin-top: 15px;
  padding: 17px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(5, 7, 14, 0.4);
}

.captcha-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #dfe1ee;
  font-size: 0.87rem;
  font-weight: 600;
}

.captcha-heading .v-icon {
  color: var(--spider-blue);
}

.captcha-box {
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  min-height: 65px;
  overflow-x: auto;
}

.captcha-unavailable {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ff9eae;
  font-size: 0.82rem;
  line-height: 1.8;
}

.captcha-note {
  margin-top: 10px;
  color: #82869c;
  font-size: 0.75rem;
  line-height: 1.9;
}

.form-alert {
  margin-top: 17px;
  font-size: 0.86rem;
  line-height: 1.9;
}

.submit-btn {
  min-height: 51px;
  color: #fff !important;
  background: linear-gradient(110deg, #d91e47, #ff3158) !important;
  box-shadow: 0 8px 26px rgba(255, 49, 88, 0.17);
  font-weight: 700;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(255, 49, 88, 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
}

.form-footnote {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 7px;
  margin-top: 16px;
  color: #85899e;
  font-size: 0.73rem;
  line-height: 1.9;
  text-align: center;
}

.form-footnote .v-icon {
  flex: 0 0 auto;
  margin-top: 2px;
}

/* بنر پایانی */

.bottom-banner {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 45px;
  padding: 25px 28px;
  border: 1px solid rgba(53, 184, 255, 0.14);
  border-radius: 17px;
  background:
    linear-gradient(100deg, rgba(53, 184, 255, 0.04), transparent 55%),
    rgba(17, 19, 31, 0.65);
}

.banner-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 62px;
  width: 62px;
  height: 62px;
  border: 1px solid rgba(53, 184, 255, 0.22);
  border-radius: 17px;
  color: var(--spider-blue);
  background: rgba(53, 184, 255, 0.07);
}

.bottom-banner h2 {
  color: #ededf6;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.9;
}

.bottom-banner p {
  margin-top: 5px;
  color: #9296aa;
  font-size: 0.85rem;
  line-height: 1.9;
}

/* Footer */

.contact-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 23px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: #777b91;
  font-family: monospace;
  font-size: 0.63rem;
  letter-spacing: 1px;
  text-align: center;
}

.footer-dot {
  width: 5px;
  height: 5px;
  background: var(--spider-blue);
  box-shadow: 0 0 8px var(--spider-blue);
}

/* واکنش‌گرایی */

@media (max-width: 960px) {
  .contact-content {
    max-width: 760px;
  }

  .info-panel {
    padding: 10px 5px 20px;
  }

  .form-panel {
    padding: 25px;
  }
}

@media (max-width: 600px) {
  .contact-hero {
    min-height: 300px;
    padding: 55px 20px 45px;
  }

  .hero-title {
    font-size: 2.15rem;
  }

  .hero-subtitle {
    font-size: 0.88rem;
  }

  .contact-content {
    padding: 35px 18px 45px;
  }

  .info-panel {
    padding: 0 2px 15px;
  }

  .info-title {
    font-size: 1.9rem;
  }

  .form-panel {
    padding: 20px 16px;
    border-radius: 16px;
  }

  .form-title {
    font-size: 1.2rem;
  }

  .form-icon {
    flex-basis: 45px;
    width: 45px;
    height: 45px;
  }

  .captcha-section {
    padding: 13px;
  }

  .captcha-box {
    justify-content: flex-start;
  }

  .bottom-banner {
    align-items: flex-start;
    gap: 14px;
    padding: 20px 16px;
  }

  .banner-symbol {
    flex-basis: 45px;
    width: 45px;
    height: 45px;
  }

  .banner-symbol .v-icon {
    font-size: 27px !important;
  }

  .bottom-banner h2 {
    font-size: 0.95rem;
  }

  .bottom-banner p {
    font-size: 0.8rem;
  }

  .contact-footer {
    font-size: 0.56rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-page *,
  .contact-page *::before,
  .contact-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
