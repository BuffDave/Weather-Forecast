import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

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
  plugins: [
    compression({
      algorithm: 'gzip',
      threshold: 1024,
      ext: '.gz',
    }),
  ],
});
