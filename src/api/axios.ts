import axios from 'axios'

const api = axios.create({
  baseURL: 'https://hawi-backend.test/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
