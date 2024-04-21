import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // to be compatible wit github pages
  base: "/TheWatchlist/",
  plugins: [react()],
})
