import { config } from 'dotenv'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

config({ path: resolve('../.env') })

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.CLIENT_PORT,
    fs: {
      strict: false,
      allow: ['..']
    }
  }
})
