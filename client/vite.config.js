import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3001,
    fs: {
      strict: false,
      allow: ['..']
    }
  }
})
