<template>
  <v-footer app height="auto" color="surface" class="text-white py-2">
    <v-container>
      <v-row class="text-right" align="center" justify="space-between">
        <!-- Right Section (Persian site info) -->
        <v-col cols="12" md="6" class="mb-4 mb-md-0">
          <div class="text-h6 mb-2 font-weight-medium">سجاد حسین</div>
          <div class="text-body-2 text-gray-300">
            توسعه‌دهنده بک‌اند با پایتون و فریم‌ورک جنگو، علاقه‌مند به ساخت
            سیستم‌های پایدار، مقیاس‌پذیر و تمیز.
          </div>
        </v-col>

        <!-- Left Section (Social Icons) -->
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-start justify-md-end ga-3"
        >
          <v-btn icon variant="text" href="https://github.com/Sajjadhosseinrezaei" target="_blank">
            <v-icon size="28">mdi-github</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            href="https://www.linkedin.com/in/sajjadhossein-rezaei-b3a0a1320"
            target="_blank"
          >
            <v-icon size="28">mdi-linkedin</v-icon>
          </v-btn>
          <v-btn icon variant="text" href="sajjadhosseinrezaei@yahoo.com">
            <v-icon size="28">mdi-email</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-4 opacity-50"></v-divider>

      <v-row justify="center">
        <v-col class="text-center text-gray-400 text-body-2">
          © {{ new Date().getFullYear() }} تمام حقوق برای سجاد حسین محفوظ است.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// No script needed here
</script>

<style scoped>
.text-gray-300 {
  color: rgba(255, 255, 255, 0.7);
}

.text-gray-400 {
  color: rgba(255, 255, 255, 0.5);
}

.v-footer {
  font-family: "Shabnam", sans-serif;
  backdrop-filter: blur(8px);
  background: rgba(25, 25, 25, 0.85);
}
</style>
