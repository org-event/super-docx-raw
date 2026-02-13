import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'superdoc/style.css': path.resolve(__dirname, 'node_modules/superdoc/dist/style.css'),
      'superdoc': path.resolve(__dirname, 'node_modules/superdoc/dist/superdoc.es.js')
    }
  },
  server: {
    host: true,
    allowedHosts: true,
    proxy: {
      '/user': {
        target: 'http://localhost:3050',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/user/, '/user'),
      },
    }
  }
})
