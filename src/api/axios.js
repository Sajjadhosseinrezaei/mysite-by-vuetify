import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: false, // true for session auth/CSRF
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/* Optional: add token if you store JWT in localStorage */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/* Optional: response interceptor for refresh token logic */
api.interceptors.response.use(
  res => res,
  async err => {
    // implement refresh token attempt if 401 etc.
    return Promise.reject(err)
  }
)

export default api
