import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { learningApiPlugin } from './src/server/vite-api-plugin'

export default defineConfig({
  plugins: [react(), learningApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true
  }
})
