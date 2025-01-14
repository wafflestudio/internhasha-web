import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.survey-josha.site',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
