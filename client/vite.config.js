import { config } from 'dotenv'
import { defineConfig } from 'vite'
import { resolve } from 'path'

config({ path: resolve('../.env') })

export default defineConfig({
  server: {
    port: process.env.CLIENT_PORT,
    fs: {
      strict: false,
      allow: ['..']
    }
  }
})
