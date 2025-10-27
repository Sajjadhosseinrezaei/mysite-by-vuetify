import { defineStore } from "pinia";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [], // همه پروژه‌ها
    featuredProjects: [], // پروژه‌های ویژه (is_featured = true)
    totalCount: 0, // تعداد کل پروژه‌ها
    loading: false,
    error: null,
    currentProject: null, // برای ذخیره پروژه فعلی
  }),
  actions: {
    async loadProjects(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/projects/?page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("خطا در API: " + response.status);
        const data = await response.json();
        this.projects = Array.isArray(data) ? [...data] : data ? [data] : [];
        this.totalCount = this.projects.length;
        console.log(
          "Projects loaded:",
          this.projects.length,
          "Total Count:",
          this.totalCount
        );
      } catch (err) {
        this.error = err.message;
        this.projects = [];
        this.totalCount = 0;
      } finally {
        this.loading = false;
      }
    },
    async loadFeaturedProjects() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/projects/?is_featured=true`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("خطا در API: " + response.status);
        const data = await response.json();
        this.featuredProjects = Array.isArray(data)
          ? data.filter((p) => p.is_featured)
          : data
          ? [data]
          : [];
        console.log("Featured projects loaded:", this.featuredProjects.length);
      } catch (err) {
        this.error = err.message;
        this.featuredProjects = [];
      } finally {
        this.loading = false;
      }
    },
    async loadProject(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/projects/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("خطا در API: " + response.status);
        const data = await response.json();
        this.currentProject = data;
        console.log("Project loaded:", data);
      } catch (err) {
        this.error = err.message;
        this.currentProject = null;
      } finally {
        this.loading = false;
      }
    },
  },
});
