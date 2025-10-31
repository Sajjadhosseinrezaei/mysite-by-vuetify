import { defineStore } from 'pinia'
import { fetchProjects, fetchProject } from '@/api/projects'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    featuredProjects: [],
    totalCount: 0,
    loading: false,
    error: null,
    currentProject: null, // برای ذخیره پروژه فعلی
  }),

  getters: {
    getFeaturedProjects: (state) => state.projects.filter(project => project.is_featured),
  },
  actions: {
    async loadProjects(page = 1, pageSize = 9) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchProjects(page, pageSize)
        this.projects = response.data.results || response.data
        this.totalCount = response.data.count || this.projects.length
        // Update featured projects
        this.featuredProjects = this.getFeaturedProjects
      } catch (err) {
        this.error = err.message
        this.projects = []
        this.totalCount = 0
        console.error('Error loading projects:', err)
      } finally {
        this.loading = false
      }
    },

    async loadProject(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchProject(id)
        this.currentProject = response.data
      } catch (err) {
        this.error = err.message
        this.currentProject = null
        console.error('Error loading project:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
