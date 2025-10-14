import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProjects, fetchProject } from '@/api/projects'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref([])
  const project = ref(null)
  const totalCount = ref(0)
  const loading = ref(false)

  // دریافت لیست پروژه‌ها
  const loadProjects = async (page = 1, page_size = 9) => {
    loading.value = true
    try {
      const { data } = await fetchProjects(page, page_size)
      projects.value = data.results
      totalCount.value = data.count
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // دریافت جزئیات پروژه
  const loadProject = async (id) => {
    loading.value = true
    try {
      const { data } = await fetchProject(id)
      project.value = data
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { projects, project, totalCount, loading, loadProjects, loadProject }
})
