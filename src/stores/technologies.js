// src/stores/technologies.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/axios'

export const useTechnologiesStore = defineStore('technologies', () => {
  // === State ===
  const technologies = ref([])      // همه تکنولوژی‌ها
  const featured = ref([])          // تکنولوژی‌های ویژه (کش شده)
  const loading = ref(false)
  const error = ref(null)

  // === Getters ===
  const allTechnologies = computed(() => technologies.value)
  const featuredTechnologies = computed(() => featured.value)
  const isEmpty = computed(() => technologies.value.length === 0 && !loading.value)

  // === Actions ===

  /** بارگذاری همه تکنولوژی‌ها (یک بار) */
  async function loadTechnologies({ force = false } = {}) {
    if (!force && technologies.value.length > 0) {
      return technologies.value
    }

    loading.value = true
    error.value = null

    try {
      const res = await api.get('/technologies/')
      const data = res.data

      // پشتیبانی از دو حالت: آرایه مستقیم یا { results: [...] }
      if (Array.isArray(data)) {
        technologies.value = data
      } else if (data && Array.isArray(data.results)) {
        technologies.value = data.results
      } else {
        throw new Error('ساختار داده نامعتبر است')
      }

      return technologies.value
    } catch (err) {
      error.value = err.response?.data?.detail || err.message || 'خطا در دریافت تکنولوژی‌ها'
      console.error('[Technologies Store] loadTechnologies error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /** بارگذاری تکنولوژی‌های ویژه */
  async function loadFeatured({ force = false } = {}) {
    if (!force && featured.value.length > 0) {
      return featured.value
    }

    try {
      // 1. سعی در فیلتر سرور
      const res = await api.get('/technologies/', { params: { is_featured: true } })
      const data = res.data

      if (Array.isArray(data) && data.length > 0) {
        featured.value = data
        return featured.value
      }
      if (data?.results && data.results.length > 0) {
        featured.value = data.results
        return featured.value
      }
    } catch (_) {
      // نادیده گرفتن خطا — ادامه به client-side
    }

    // 2. fallback: همه را بگیر و فیلتر کن
    const all = await loadTechnologies({ force: true })
    featured.value = all.filter(t => t.is_featured)
    return featured.value
  }

  /** جستجو در تکنولوژی‌ها (client-side) */
  function searchTechnologies(query = '') {
    if (!query.trim()) return technologies.value
    const q = query.toLowerCase()
    return technologies.value.filter(tech =>
      tech.name.toLowerCase().includes(q) ||
      (tech.description && tech.description.toLowerCase().includes(q))
    )
  }

  /** دریافت تکنولوژی با ID */
  function getTechnologyById(id) {
    return technologies.value.find(t => t.id === id)
  }

  /** ریست استور */
  function clear() {
    technologies.value = []
    featured.value = []
    error.value = null
  }

  // === Return ===
  return {
    // State
    technologies: allTechnologies,
    featured: featuredTechnologies,
    loading,
    error,
    isEmpty,

    // Actions
    loadTechnologies,
    loadFeatured,
    searchTechnologies,
    getTechnologyById,
    clear,
  }
})
