import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 添加对 Vue Router 的支持
  resolve: {
    alias: {
      '@': '/src', // 设置路径别名
    },
  },
});