import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 공공 깃랩 AX 개선 케이스 스터디. 플러스엑스 Sphere 사례의 연출 문법을 옮겼다. 포트 5191.
export default defineConfig({
  plugins: [react()],
  base: '/public-gitlab-case/',
  // 샌드박스에 lightningcss 네이티브 바인딩이 없어 압축을 끈다(공통 지시의 vite build --minify false와 같은 효과)
  build: { minify: false, cssMinify: false },
  server: { port: 5191 },
  preview: { port: 5191 },
});
