// src/stores/profile.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/axios' // باید وجود داشته باشه (baseURL از env گرفته شده)

export const useProfileStore = defineStore('profile', () => {
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(false)
  const errorMessage = ref('')

  /**
   * loadProfile(force = false)
   * اگر force=true باشد همیشه دوباره fetch می‌کند، در غیر این صورت اگر cache وجود داشته باشد از cache استفاده می‌کند
   */
  async function loadProfile(force = false) {
    if (profile.value && !force) return profile.value
    loading.value = true
    error.value = false
    errorMessage.value = ''
    try {
      const res = await api.get('/profile/')
      // برخی از ماژول‌های api احتمالاً res.data یا res برمی‌گردونن؛ ما res.data انتظار داریم
      profile.value = res.data ?? res
      return profile.value
    } catch (err) {
      console.error('Failed to load profile', err)
      error.value = true
      // سعی می‌کنیم پیام کاربرپسند بدهیم
      errorMessage.value = err.response?.data?.detail || err.response?.data || err.message || 'خطا در دریافت پروفایل'
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearProfile() {
    profile.value = null
    error.value = false
    errorMessage.value = ''
  }

  return {
    profile,
    loading,
    error,
    errorMessage,
    loadProfile,
    clearProfile,
  }
})
