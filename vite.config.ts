import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {

    // Correct for Firebase hosting
    base: '/',

    plugins: [react()],

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || "no-key-found"),
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || "no-key-found")
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    }

  }
})