<template>
  <v-container fluid class="contact-page pa-0">
    <!-- Hero Section -->
    <v-container class="contact-hero d-flex flex-column justify-center align-center text-center" fluid>
      <h1 class="hero-title">تماس با من</h1>
      <p class="hero-subtitle mt-2">
        اگر سوالی دارید یا می‌خواهید همکاری کنید، خوشحال می‌شوم پیام شما را دریافت کنم.
      </p>
    </v-container>

    <!-- Contact Form -->
    <v-container class="mt-12 max-width-600 mx-auto">
      <v-form ref="contactForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.name"
          label="نام و نام خانوادگی"
          outlined
          :rules="[v => !!v || 'لطفاً نام خود را وارد کنید']"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          label="ایمیل"
          outlined
          :rules="[v => /.+@.+\..+/.test(v) || 'ایمیل معتبر وارد کنید']"
          required
        ></v-text-field>

        <v-textarea
          v-model="form.message"
          label="پیام شما"
          outlined
          rows="6"
          :rules="[v => !!v || 'لطفاً پیام خود را وارد کنید']"
          required
        ></v-textarea>

        <v-btn
          color="primary"
          class="mt-4"
          @click="submitForm"
          :disabled="!valid"
        >
          ارسال پیام
        </v-btn>
      </v-form>
    </v-container>

    <!-- Social Links -->
    <v-container class="mt-12 text-center">
      <v-btn
        icon
        variant="text"
        href="https://github.com/"
        target="_blank"
      >
        <v-icon size="32">mdi-github</v-icon>
      </v-btn>
      <v-btn
        icon
        variant="text"
        href="https://linkedin.com/"
        target="_blank"
      >
        <v-icon size="32">mdi-linkedin</v-icon>
      </v-btn>
      <v-btn
        icon
        variant="text"
        href="mailto:info@example.com"
      >
        <v-icon size="32">mdi-email</v-icon>
      </v-btn>
    </v-container>
    <FloatingContact />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import FloatingContact from '@/components/FloatingContact.vue'

const valid = ref(false)
const contactForm = ref(null)
const form = ref({
  name: '',
  email: '',
  message: ''
})

function submitForm() {
  if (contactForm.value.validate()) {
    alert(`پیام شما با موفقیت ارسال شد!\n\nنام: ${form.value.name}\nایمیل: ${form.value.email}\nپیام: ${form.value.message}`)
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    contactForm.value.resetValidation()
  }
}
</script>

<style scoped>
.contact-page {
  font-family: "Shabnam", sans-serif;
  color: white;
}

.contact-hero {
  min-height: 25vh;
  background: linear-gradient(180deg, #1a1a1a, #111111);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.v-text-field,
.v-textarea {
  background-color: #222;
  color: white;
}

.v-input__control .v-label {
  color: rgba(255, 255, 255, 0.7) !important;
}

.v-btn {
  text-transform: none;
}
</style>
