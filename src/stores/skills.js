// src/stores/skills.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/axios' // باید وجود داشته باشه: baseURL از env گرفته شده

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref([])        // تمام آیتم‌های دریافت‌شده (از current page)
  const featured = ref([])      // کش جدا برای featured (اختیاری)
  const total = ref(0)          // total count (from paginated response)
  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref('')

  // metadata برای pagination (اگر نیاز داشتی نگه میداریم)
  const currentPage = ref(1)
  const pageSize = ref(20) // پیش‌فرض، می‌تونی 9 بذاری یا هرچیزی

  /**
   * loadSkills(page=1, page_size=20, options={force:false})
   * - بازمی‌گرداند: { results, count } یا می‌تونه خطا throw کنه
   */
  async function loadSkills(page = 1, page_size = 20, options = {}) {
    if (loading.value) return
    // اگر از قبل داده موجوده و force=false و صفحه همون صفحه هست، دوباره نخون
    if (!options.force && skills.value.length && currentPage.value === page && pageSize.value === page_size) {
      return { results: skills.value, count: total.value }
    }

    loading.value = true
    error.value = false
    errorMessage.value = ''
    try {
      const res = await api.get('/skills/', { params: { page, page_size } })
      const data = res.data ?? res
      // data.results expected
      skills.value = Array.isArray(data.results) ? data.results : []
      total.value = data.count ?? skills.value.length
      currentPage.value = page
      pageSize.value = page_size
      return { results: skills.value, count: total.value }
    } catch (err) {
      console.error('Failed to load skills', err)
      error.value = true
      errorMessage.value = err.response?.data || err.message || 'خطا در دریافت مهارت‌ها'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * loadAllSkills(options={force:false})
   * اگر بخوای همهٔ صفحات رو یکجا بیاره (مراقب باش برای تعداد خیلی زیاد)
   */
  async function loadAllSkills(options = {}) {
    if (!options.force && skills.value.length && total.value && skills.value.length >= total.value) {
      return skills.value
    }

    loading.value = true
    error.value = false
    errorMessage.value = ''
    try {
      const page_size = 100 // مقدار زیادی برای اغلب پروژه‌ها کفایت می‌کنه
      const res = await api.get('/skills/', { params: { page: 1, page_size } })
      const data = res.data ?? res
      const all = Array.isArray(data.results) ? data.results : []
      skills.value = all
      total.value = data.count ?? all.length
      return skills.value
    } catch (err) {
      console.error('Failed to load all skills', err)
      error.value = true
      errorMessage.value = err.response?.data || err.message || 'خطا'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * loadFeatured() — فقط featured skills
   * از سرور می‌خواهیم اگر endpoint فیلتر برای featured نداره، ما روی نتایج client-side فیلتر می‌کنیم
   */
  async function loadFeatured(options = {}) {
    // اگر cached موجود و force=false برگردون
    if (!options.force && featured.value.length) return featured.value

    // ابتدا سعی می‌کنیم یک درخواست با فیلتر ارسال کنیم (در صورتیکه API از ?is_featured=true پشتیبانی کنه)
    loading.value = true
    error.value = false
    errorMessage.value = ''
    try {
      // try server-side filter first
      const res = await api.get('/skills/', { params: { is_featured: true, page: 1, page_size: 100 } })
      const data = res.data ?? res
      if (Array.isArray(data.results) && data.results.length) {
        featured.value = data.results
      } else {
        // fallback: load a page/all and filter client-side
        const all = await loadAllSkills({ force: options.force })
        featured.value = all.filter(s => s.is_featured)
      }
      return featured.value
    } catch (err) {
      console.warn('Server-side featured filter failed, falling back to client-side', err)
      // fallback to client-side
      try {
        const all = await loadAllSkills({ force: options.force })
        featured.value = all.filter(s => s.is_featured)
        return featured.value
      } catch (inner) {
        console.error(inner)
        error.value = true
        errorMessage.value = inner.message || 'خطا'
        throw inner
      }
    } finally {
      loading.value = false
    }
  }

  function clear() {
    skills.value = []
    featured.value = []
    total.value = 0
    currentPage.value = 1
    pageSize.value = 20
    loading.value = false
    error.value = false
    errorMessage.value = ''
  }

  return {
    skills,
    featured,
    total,
    loading,
    error,
    errorMessage,
    currentPage,
    pageSize,
    loadSkills,
    loadAllSkills,
    loadFeatured,
    clear,
  }
})
