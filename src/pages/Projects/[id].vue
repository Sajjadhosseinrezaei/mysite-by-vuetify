<template>
  <v-container fluid class="project-detail-page pa-0">
    <!-- Hero -->
    <v-container v-if="project" class="project-hero d-flex flex-column justify-center align-center text-center" fluid>
      <h1 class="project-title">{{ project.title }}</h1>
      <p class="project-subtitle">{{ project.short_description || project.description }}</p>
    </v-container>

    <!-- Images carousel -->
    <v-container class="mt-8" v-if="slides.length">
      <v-carousel hide-delimiters height="420" show-arrows-on-hover>
        <v-carousel-item v-for="(src, idx) in slides" :key="idx">
          <v-img :src="src" height="420" @click="openLightbox(idx)" class="cursor-pointer" cover></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <!-- lightbox dialog -->
    <v-dialog v-model="lightbox" max-width="95vw">
      <v-card class="bg-transparent elevation-0" style="position:relative;">
        <v-btn icon class="close-btn" @click="lightbox = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>

        <v-btn icon class="lightbox-arrow left" @click="prevImage">
          <v-icon color="white">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="lightbox-arrow right" @click="nextImage">
          <v-icon color="white">mdi-chevron-right</v-icon>
        </v-btn>

        <v-img :src="slides[currentImg]" max-height="90vh" contain></v-img>
        <div v-if="currentCaption" class="lightbox-caption">{{ currentCaption }}</div>
      </v-card>
    </v-dialog>

    <!-- Content -->
    <v-container v-if="project" class="mt-8 max-width-900 mx-auto">
      <v-row>
        <v-col cols="12" md="8">
          <h3 class="section-title">توضیحات</h3>

          <!-- CLAMPED DESCRIPTION -->
          <div :class="['project-description', { 'is-expanded': showMore }]" ref="descEl">
            <!-- اگر متن HTML داری از v-html استفاده کن ولی sanitize کن در صورت نیاز -->
            <p v-html="project.description"></p>
          </div>

          <div class="readmore-row" v-if="isClamped">
            <v-btn text small @click="toggleShowMore">
              {{ showMore ? 'بستن' : 'نمایش بیشتر' }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <h3 class="section-title">اطلاعات</h3>
          <div class="meta">
            <div><strong>دسته:</strong> {{ project.category?.name }}</div>
            <div><strong>وضعیت:</strong> {{ project.status }}</div>
            <div class="mt-3">
              <v-btn v-if="project.demo_url" :href="project.demo_url" target="_blank" color="primary" class="mb-2">مشاهده آنلاین</v-btn>
              <v-btn v-if="project.github_url" :href="project.github_url" target="_blank" outlined>گیت‌هاب</v-btn>
            </div>
          </div>

          <h4 class="mt-6">تکنولوژی‌ها</h4>
          <div class="tech-list mt-2">
            <v-chip
              v-for="t in project.technologies"
              :key="t.id"
              outlined
              class="ma-1"
              :style="{ borderColor: t.color || 'rgba(255,255,255,0.12)', color: '#fff', background: techBg(t.color) }"
            >
              {{ t.name }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Loading / error -->
    <v-container v-if="loading" class="text-center my-8">
      <v-progress-circular indeterminate />
    </v-container>
    <v-container v-if="error" class="text-center my-8">
      <v-alert type="error">{{ errorMessage }}</v-alert>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const route = useRoute()
const id = route.params.id

const loading = ref(false)
const error = ref(false)
const errorMessage = ref('')
const lightbox = ref(false)
const currentImg = ref(0)

const project = computed(() => store.project || null)

// description clamp / read-more
const showMore = ref(false)
const isClamped = ref(false)
const descEl = ref(null)
const maxLines = 6 // این عدد را اگر خواستی تغییر بده

function toggleShowMore() {
  showMore.value = !showMore.value
  // اگر خواستی بعد از باز شدن اسکرول اتوماتیک کنیم اینجا اضافه کن
}

function techBg(color) {
  if (!color) return 'transparent'
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) return color + '20'
  return 'transparent'
}

const slides = computed(() => {
  if (!project.value) return []
  const arr = []
  if (project.value.featured_image_url) arr.push(project.value.featured_image_url)
  if (Array.isArray(project.value.images)) project.value.images.forEach(i => i.image && arr.push(i.image))
  return arr
})
const currentCaption = computed(() => {
  if (!project.value) return ''
  const idx = currentImg.value
  if (idx === 0 && project.value.featured_image_url) return project.value.title || ''
  return project.value.images?.[idx - (project.value.featured_image_url ? 1 : 0)]?.caption || ''
})

function openLightbox(i = 0) { currentImg.value = i; lightbox.value = true }
function prevImage() { if (!slides.value.length) return; currentImg.value = (currentImg.value - 1 + slides.value.length) % slides.value.length }
function nextImage() { if (!slides.value.length) return; currentImg.value = (currentImg.value + 1) % slides.value.length }

// بررسی می‌کنیم که آیا متن بیش از maxLines است یا خیر
async function checkClamp() {
  await nextTick()
  const el = descEl.value && descEl.value.querySelector('p')
  if (!el) { isClamped.value = false; return }
  const style = getComputedStyle(el)
  const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.4 || 20
  const maxHeight = lineHeight * maxLines
  // اگر ارتفاع واقعی بیشتر از حداکثر خط است => باید clamp کنیم
  isClamped.value = el.scrollHeight > (maxHeight + 1)
  // اگر قبلاً باز بود اما متن تغییر کرده، بازگشت به حالت اولیه
  if (!isClamped.value) showMore.value = false
}

onMounted(async () => {
  loading.value = true
  try {
    await store.loadProject(id)
    // small delay until DOM paints
    await checkClamp()
  } catch (err) {
    console.error(err)
    error.value = true
    errorMessage.value = err.message || 'خطا در دریافت پروژه'
  } finally {
    loading.value = false
  }
})

// اگر route پارام تغییر کرد، دوباره لود کن و clamp را بررسی کن
watch(() => route.params.id, async (newId) => {
  loading.value = true
  try {
    await store.loadProject(newId)
    showMore.value = false
    await checkClamp()
  } catch (err) {
    console.error(err)
    error.value = true
    errorMessage.value = err.message || 'خطا'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.project-detail-page { font-family: "Shabnam", system-ui, Roboto, Arial; color: #fff; }

/* hero */
.project-hero { min-height: 20vh; background: linear-gradient(180deg,#0f1720,#071018); padding: 36px 20px; }
.project-title { font-size: 2rem; margin: 0; font-weight:700; }
.project-subtitle { color: rgba(255,255,255,0.78); margin-top:8px; }

/* carousel/lightbox */
.cursor-pointer { cursor: pointer; }
.close-btn { position:absolute; top:10px; right:10px; z-index:40; background: rgba(0,0,0,0.45); }
.lightbox-arrow { position:absolute; top:50%; transform:translateY(-50%); background: rgba(0,0,0,0.35); z-index:40; }
.lightbox-arrow.left { left:8px } .lightbox-arrow.right { right:8px }
.lightbox-caption { text-align:center; margin-top:8px; color:rgba(255,255,255,0.9) }

/* content */
.section-title { font-weight:700; margin-bottom:8px; }

/* CLAMPED DESCRIPTION */
.project-description {
  color: rgba(255,255,255,0.88);
  line-height: 1.7;
  font-size: 1.03rem;
  position: relative;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* این مقدار باید تقریباً برابر line-height * maxLines باشه */
  max-height: calc(1.7em * 6); /* 6 خط پیش‌فرض */
  -webkit-line-clamp: 6;
  transition: max-height .28s ease;
}

/* expanded state */
.project-description.is-expanded {
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: unset;
  overflow: visible;
  max-height: none;
}

/* readmore */
.readmore-row { display:flex; justify-content:center; margin-top:8px; }

/* meta/tech */
.meta { color: rgba(255,255,255,0.85); }
.tech-list .v-chip { color:#fff; }

/* responsive */
@media (max-width: 900px) {
  .project-hero { min-height: 18vh; padding:28px 14px }
  .project-title { font-size: 1.5rem }
  .project-description { max-height: calc(1.7em * 5); -webkit-line-clamp: 5; }
}
</style>
