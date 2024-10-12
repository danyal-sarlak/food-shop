/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://react-mini-projects-api.classbon.com', // آدرس سرور اصلی
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // حذف /api از آدرس
      },
    },
  },
});
