import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    // Proxy /api requests to Laravel backend — avoids CORS entirely during development.
    // With this, you can use baseURL: '/api' in axios instead of the full HTTPS URL.
    proxy: {
      '/api': {
        target: 'https://hawi-backend.test',
        changeOrigin: true,
        // Accept the self-signed SSL certificate from Herd
        secure: false,
      },
    },
  },
})
