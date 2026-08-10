import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 빌드 결과를 로컬에서 index.html 더블클릭으로 열어도 경로가 깨지지 않도록 상대경로 사용
  plugins: [react()],
})
