import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from the current directory
  // process.cwd() is more reliable than '.' in CI/CD environments
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 1. FIXED: Changed from '/sembuddy/' to '/' 
    // Because you are using www.sembuddy.com, the site is at the root.
    base: '/', 

    server: {
      port: 3000,
      host: '0.0.0.0'
    },

    plugins: [react()],

    define: {
      // 2. FIXED: Added a fallback empty string "" 
      // This prevents the "Database Error" crash if the key is missing during build
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ""),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || "")
    },

    resolve: {
      alias: {
        // Allows you to use @/components/ instead of ../../components/
        '@': path.resolve(__dirname, './')
      }
    },
    
    build: {
      // Ensures the output goes to the 'dist' folder which GitHub Pages expects
      outDir: 'dist',
    }
  }
})