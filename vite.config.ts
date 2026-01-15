import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load environment variables (like your Gemini Key)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // REQUIRED: Must match your repository name exactly
    base: '/sembuddy/', 

    plugins: [react()],

    define: {
      // Provides a fallback to prevent the app from crashing if the key is missing
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