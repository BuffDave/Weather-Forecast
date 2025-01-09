import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', 
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        robots: 'robots.txt',
        google: 'googlec08a62fc3513bf8a.html',
      },
    },
  },
});