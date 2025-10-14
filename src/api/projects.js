import api from './axios'

// fetch list with pagination
export const fetchProjects = (page = 1, page_size = 9) =>
  api.get('/projects/', { params: { page, page_size } })

// fetch single project by id
export const fetchProject = (id) =>
  api.get(`/projects/${id}/`)
