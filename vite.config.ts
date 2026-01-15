import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 1. REQUIRED for free GitHub Pages (aditya-verse.github.io/sembuddy/)
    base: '/sembuddy/', 

    plugins: [react()],

    define: {
      // 2. Fallback prevents "Database Error" UI crashes if key is missing
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || "no-key-found"),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || "no-key-found")
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    }
  }
})