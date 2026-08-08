import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-router')) return 'router';
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler')) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
});
