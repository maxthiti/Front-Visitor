import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server:{
    host: true,
    port: 5173,
    allowedHosts: [
      'diffident-dormant-jeramy.ngrok-free.dev'
    ]
  }
})
