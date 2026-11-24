import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Cloudflare Pages serves from the domain root. Override only for legacy GitHub Pages builds.
  base: process.env.VITE_BASE_PATH || '/',
})
