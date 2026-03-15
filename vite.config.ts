<<<<<<< HEAD
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
=======
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
>>>>>>> 963564cf257c0260b367bed0e719edb9155624e2
