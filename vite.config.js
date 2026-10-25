import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/soliar-panel/',
  plugins: [tailwindcss()],
});
