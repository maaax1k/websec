import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/websec': {
        target: 'http://194.110.55.14',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/websec/, '/websec/api'),
      },
    },
  },
})