import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',  // Adjust this path according to your project structure
    },
  },
  plugins: [react()],
});
