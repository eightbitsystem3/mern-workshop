import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,

    proxy: {
      '/api': {
       // eslint-disable-next-line no-undef
       target: process.env.API_BASE_URL ||'http://localhost:8001',
        changeOrigin: true,
        secure: false,
      },
    },

  },
  plugins: [react() , tailwindcss(),],
})
