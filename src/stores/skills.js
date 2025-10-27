import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/axios"; // باید وجود داشته باشه: baseURL از env گرفته شده

export const useSkillsStore = defineStore("skills", () => {
  const skills = ref([]); // تمام آیتم‌های دریافت‌شده
  const featured = ref([]); // کش جدا برای featured (اختیاری)
  const total = ref(0); // total count (from response)
  const loading = ref(false);
  const error = ref(false);
  const errorMessage = ref("");
  const currentSkill = ref(null); // مهارت فعلی برای لود تک‌گانه

  // metadata برای pagination (اختیاری می‌شه)
  const currentPage = ref(1);
  const pageSize = ref(20); // پیش‌فرض، فقط برای وقتی که صفحه‌بندی می‌خوای

  /**
   * loadSkills(page=1, page_size=20, options={force:false})
   * - لود با صفحه‌بندی (اختیاری)
   * - بازمی‌گرداند: { results, count } یا می‌تونه خطا throw کنه
   */
  async function loadSkills(page = 1, page_size = 20, options = {}) {
    if (loading.value) return;
    if (
      !options.force &&
      skills.value.length &&
      currentPage.value === page &&
      pageSize.value === page_size
    ) {
      return { results: skills.value, count: total.value };
    }

    loading.value = true;
    error.value = false;
    errorMessage.value = "";
    try {
      const res = await api.get("/api/skills/", {
        params: page && page_size ? { page, page_size } : {}, // فقط اگه پارامترها داده شده اعمال کن
      });
      const data = res.data ?? res;
      skills.value = Array.isArray(data.results) ? data.results : data;
      total.value = data.count ?? skills.value.length;
      currentPage.value = page;
      pageSize.value = page_size;
      console.log("Skills loaded:", skills.value); // دیباگ
      return { results: skills.value, count: total.value };
    } catch (err) {
      console.error("Failed to load skills", err);
      error.value = true;
      errorMessage.value =
        err.response?.data || err.message || "خطا در دریافت مهارت‌ها";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * loadAllSkills(options={force:false})
   * - لود همه مهارت‌ها بدون صفحه‌بندی
   */
  async function loadAllSkills(options = {}) {
    if (
      !options.force &&
      skills.value.length &&
      total.value &&
      skills.value.length >= total.value
    ) {
      return skills.value;
    }

    loading.value = true;
    error.value = false;
    errorMessage.value = "";
    try {
      const res = await api.get("/api/skills/"); // بدون پارامتر صفحه‌بندی
      const data = res.data ?? res;
      skills.value = Array.isArray(data.results) ? data.results : data;
      total.value = skills.value.length; // چون صفحه‌بندی نیست، طول لیست رو می‌گیریم
      console.log("All skills loaded:", skills.value); // دیباگ
      return skills.value;
    } catch (err) {
      console.error("Failed to load all skills", err);
      error.value = true;
      errorMessage.value = err.response?.data || err.message || "خطا";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * loadFeatured() — فقط featured skills
   */
  async function loadFeatured(options = {}) {
    if (!options.force && featured.value.length) return featured.value;

    loading.value = true;
    error.value = false;
    errorMessage.value = "";
    try {
      // سعی برای فیلتر سرور‌ساید
      const res = await api.get("/api/skills/", {
        params: { is_featured: true },
      });
      const data = res.data ?? res;
      if (Array.isArray(data.results) && data.results.length) {
        featured.value = data.results;
      } else {
        // فال‌بک به فیلتر کلاینت‌ساید
        const all = await loadAllSkills({ force: options.force });
        featured.value = all.filter((s) => s.is_featured);
      }
      console.log("Featured skills loaded:", featured.value); // دیباگ
      return featured.value;
    } catch (err) {
      console.warn(
        "Server-side featured filter failed, falling back to client-side",
        err
      );
      try {
        const all = await loadAllSkills({ force: options.force });
        featured.value = all.filter((s) => s.is_featured);
        console.log("Fallback featured skills:", featured.value); // دیباگ
        return featured.value;
      } catch (inner) {
        console.error(inner);
        error.value = true;
        errorMessage.value = inner.message || "خطا";
        throw inner;
      }
    } finally {
      loading.value = false;
    }
  }

  /**
   * loadSkill(id) — لود یک مهارت خاص
   */
  async function loadSkill(id) {
    loading.value = true;
    error.value = false;
    errorMessage.value = "";
    try {
      const res = await api.get(`/api/skills/${id}/`);
      const data = res.data ?? res;
      currentSkill.value = data;
      console.log("Skill loaded:", data); // دیباگ
      return data;
    } catch (err) {
      console.error("Failed to load skill", err);
      error.value = true;
      errorMessage.value =
        err.response?.data || err.message || "خطا در دریافت مهارت";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function clear() {
    skills.value = [];
    featured.value = [];
    total.value = 0;
    currentPage.value = 1;
    pageSize.value = 20;
    loading.value = false;
    error.value = false;
    errorMessage.value = "";
    currentSkill.value = null; // ریست currentSkill
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
    loadSkill,
    clear,
    currentSkill,
  };
});
