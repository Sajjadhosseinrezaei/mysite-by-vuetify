<template>
  <div dir="rtl">
    <v-app-bar app position="fixed" color="surface" dark elevation="4" class="px-4 header-synced">
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" aria-label="باز کردن منو" />

      <!-- لینک‌ها سمت راست (نمایش در دسکتاپ) -->
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn  rounded="lg" variant="text" to="/">خانه</v-btn>
        <v-btn  rounded="lg" variant="text" to="/about">درباره من</v-btn>
        <v-btn  rounded="lg" variant="text" to="/projects">پروژه‌ها</v-btn>
        <v-btn  rounded="lg" variant="text" to="/contact">تماس</v-btn>
      </v-toolbar-items>

      <v-spacer />

      <!-- عنوان در سمت چپ -->
      <v-toolbar-title class="font-weight-bold text-end">سجاد حسین</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary right>
      <v-list>
        <v-list-item to="/"><v-list-item-title>خانه</v-list-item-title></v-list-item>
        <v-list-item to="/projects"><v-list-item-title>پروژه‌ها</v-list-item-title></v-list-item>
        <v-list-item to="/about"><v-list-item-title>درباره من</v-list-item-title></v-list-item>
        <v-list-item to="/contact"><v-list-item-title>تماس</v-list-item-title></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
</script>

<style scoped>
/* مینیمال — فقط یک خط جداکننده ملایم */
.v-app-bar {
  backdrop-filter: none;
  background: var(--v-theme-primary);
}
@media (min-width:960px){
  .v-app-bar { height:64px; }
}
</style>
