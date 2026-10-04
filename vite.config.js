import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content')
    }
  },
  worker: {
    format: 'es'
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('content/courses/python-programming/unit-01')) {
            return 'course-unit-01';
          }
          if (id.includes('content/courses/python-programming/unit-02')) {
            return 'course-unit-02';
          }
          if (id.includes('content/courses/python-programming/unit-03')) {
            return 'course-unit-03';
          }
          if (id.includes('content/courses/python-programming/unit-04')) {
            return 'course-unit-04';
          }
          if (id.includes('content/courses/python-programming/unit-05')) {
            return 'course-unit-05';
          }
          if (id.includes('content/courses') || id.includes('src/content/loader')) {
            return 'course-curriculum';
          }
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@monaco-editor') || id.includes('monaco-editor')) {
              return 'vendor-editor';
            }
            if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('rehype-sanitize')) {
              return 'vendor-markdown';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('lucide-react') || id.includes('canvas-confetti') || id.includes('sonner')) {
              return 'vendor-ui';
            }
            if (id.includes('zustand')) {
              return 'vendor-state';
            }
            if (id.includes('fuse.js') || id.includes('zod') || id.includes('react-hook-form') || id.includes('date-fns')) {
              return 'vendor-utils';
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 1600
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
});