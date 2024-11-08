import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'global': 'window', // global을 window로 설정
  },
  plugins: [react()],
})