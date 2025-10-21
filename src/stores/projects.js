import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProjects, fetchProject } from '@/api/projects'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const project = ref(null)
  const totalCount = ref(0)
  const loading = ref(false)
  const error = ref(null)  // اضافه: برای error handling

  // دریافت لیست پروژه‌ها
  const loadProjects = async (page = 1, page_size = 9) => {
    loading.value = true
    error.value = null  // reset error
    try {
      const { data } = await fetchProjects(page, page_size)
      console.log('🟢 Full API Response:', data)  // لاگ کامل response
      console.log('🔢 Results Array:', data.results)  // چک results
      console.log('📊 Count:', data.count)  // چک count

      // Safe assignment: اگر pagination باشه results، وگرنه مستقیم data
      projects.value = data.results || data  // fallback اگر array مستقیم باشه
      totalCount.value = data.count || data.length || 0  // fallback count
      console.log('✅ Store Updated - Projects Count:', projects.value.length)

      if (projects.value.length === 0) {
        console.warn('⚠️ No projects loaded – check backend data')
      }
    } catch (err) {
      console.error('❌ LoadProjects Error:', err)  // جزئیات error
      console.error('❌ Error Response:', err.response?.data)  // اگر axios error
      error.value = err.response?.data?.message || err.message || 'خطا در بارگذاری'
    } finally {
      loading.value = false
    }
  }

  // دریافت جزئیات پروژه
  const loadProject = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await fetchProject(id)
      console.log('🟢 Project Details:', data)
      project.value = data
    } catch (err) {
      console.error('❌ LoadProject Error:', err)
      error.value = err.response?.data?.message || err.message || 'خطا در بارگذاری جزئیات'
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    project,
    totalCount,
    loading,
    error,  // expose error
    loadProjects,
    loadProject
  }
})
