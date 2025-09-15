import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslint from 'vite-plugin-eslint';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue(),
      AutoImport({
         resolvers: [ElementPlusResolver()],
         imports: ['vue', 'vue-router', 'pinia']
      }),

      Components({
         resolvers: [ElementPlusResolver()]
      }),
      eslint() // 启用了 ESLint 插件
   ],
   esbuild: {
      // 跳过 TypeScript 类型检查
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
   },
   resolve: {
      /*  */
      // 使用对象语法简化别名配置
      alias: {
         '@': resolve(__dirname, 'src')
      }
   },
   css: {
      postcss: {
         plugins: [tailwindcss, autoprefixer]
      },

      preprocessorOptions: {
         scss: {
            // 自动导入全局样式文件
         }
      }
   },
   // 添加 CSS 优化配置
   optimizeDeps: {
      include: ['@kangc/v-md-editor']
   },
   // 修复 CSS 文件路径问题
   build: {
      minify: 'terser',
      terserOptions: {
         compress: {
            drop_console: true, // 可选：移除 console
            drop_debugger: true
         }
      },
      // 配置打包大小限制警告
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
         output: {
            manualChunks(id) {
               if (id.includes('node_modules')) {
                  // 将 v-md-editor 单独打包
                  if (id.includes('@kangc/v-md-editor')) {
                     return 'v-md-editor';
                  }
                  if (id.includes('react') || id.includes('react-dom')) return 'react';
                  if (id.includes('redux')) return 'redux';
                  if (id.includes('lodash')) return 'lodash';
                  if (id.includes('moment')) return 'moment';
                  return 'vendor';
               }
            }
         }
      }
   },
   server: {
      open: true,
      // 添加代理配置示例
      proxy: {
         '/api': {
            target: 'http://localhost:8080/',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            host: true, // 监听所有地址，包括本机 IP
            port: 5173,
            open: true // 可选：启动时自动打开浏览器
         }
      }
   }
});
