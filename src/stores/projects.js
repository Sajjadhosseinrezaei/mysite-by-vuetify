import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    totalCount: 0,
    loading: false,
    error: null,
    currentProject: null, // برای ذخیره پروژه فعلی
  }),
  actions: {
    async loadProjects(page = 1) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}projects/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) throw new Error('خطا در API: ' + response.status)
        const data = await response.json()
        this.projects = Array.isArray(data) ? [...data] : data ? [data] : []
        this.totalCount = this.projects.length
        console.log('Projects loaded:', this.projects.length, 'Total Count:', this.totalCount)
      } catch (err) {
        this.error = err.message
        this.projects = []
        this.totalCount = 0
      } finally {
        this.loading = false
      }
    },
    async loadProject(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}projects/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) throw new Error('خطا در API: ' + response.status)
        const data = await response.json()
        this.currentProject = data
        console.log('Project loaded:', data)
      } catch (err) {
        this.error = err.message
        this.currentProject = null
      } finally {
        this.loading = false
      }
    },
  },
})
