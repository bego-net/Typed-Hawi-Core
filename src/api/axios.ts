import axios from 'axios'
import { getToken } from '../auth/token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://hawi-backend.test/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Required for cross-origin requests that carry auth cookies/headers
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token && config.headers) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

export default api