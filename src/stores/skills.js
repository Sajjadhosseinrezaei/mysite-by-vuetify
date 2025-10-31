// src/stores/skills.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/axios'

export const useSkillsStore = defineStore('skills', () => {
  // === State ===
  const skills = ref([])      // همه مهارت‌ها
  const featured = ref([])    // مهارت‌های ویژه (کش شده)
  const loading = ref(false)
  const error = ref(null)

  // === Getters ===
  const allSkills = computed(() => skills.value)
  const featuredSkills = computed(() => featured.value)
  const isEmpty = computed(() => skills.value.length === 0 && !loading.value)

  // === Actions ===

  /** بارگذاری همه مهارت‌ها (یک بار) */
  async function loadSkills({ force = false } = {}) {
    if (!force && skills.value.length > 0) {
      return skills.value
    }

    loading.value = true
    error.value = null

    try {
      const res = await api.get('/skills/')
      const data = res.data

      // پشتیبانی از دو حالت: آرایه مستقیم یا { results: [...] }
      if (Array.isArray(data)) {
        skills.value = data
      } else if (data && Array.isArray(data.results)) {
        skills.value = data.results
      } else {
        throw new Error('ساختار داده نامعتبر است')
      }

      return skills.value
    } catch (err) {
      error.value = err.response?.data?.detail || err.message || 'خطا در دریافت مهارت‌ها'
      console.error('[Skills Store] loadSkills error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /** بارگذاری مهارت‌های ویژه */
  async function loadFeatured({ force = false } = {}) {
    if (!force && featured.value.length > 0) {
      return featured.value
    }

    try {
      // 1. سعی در فیلتر سرور
      const res = await api.get('/skills/', { params: { is_featured: true } })
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
    const all = await loadSkills({ force: true })
    featured.value = all.filter(s => s.is_featured)
    return featured.value
  }

  /** جستجو در مهارت‌ها (client-side) */
  function searchSkills(query = '') {
    if (!query.trim()) return skills.value
    const q = query.toLowerCase()
    return skills.value.filter(skill =>
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q)
    )
  }

  /** دریافت مهارت با ID */
  function getSkillById(id) {
    return skills.value.find(s => s.id === id)
  }

  /** ریست استور */
  function clear() {
    skills.value = []
    featured.value = []
    error.value = null
  }

  // === Return ===
  return {
    // State
    skills: allSkills,
    featured: featuredSkills,
    loading,
    error,
    isEmpty,

    // Actions
    loadSkills,
    loadFeatured,
    searchSkills,
    getSkillById,
    clear,
  }
})
