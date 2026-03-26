import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: "0.0.0.0",
    // port: 3000,
    proxy: {
      "/api": {
        target: process.env.API_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
