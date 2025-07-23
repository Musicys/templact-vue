import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue(),
      AutoImport({
         resolvers: [ElementPlusResolver()]
      }),
      Components({
         resolvers: [ElementPlusResolver()]
      })
   ],
   resolve: {
      /*  */
      // 使用对象语法简化别名配置
      alias: {
         '@': resolve(__dirname, 'src')
      }
   },
   css: {
      preprocessorOptions: {
         scss: {
            // 自动导入全局样式文件
         }
      }
   },
   server: {
      host: 'localhost',
      port: 9999,
      open: true,
      // 添加代理配置示例
      proxy: {
         '/api': {
            target: 'https://api.example.com',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, '')
         }
      }
   },
   // 生产环境配置
   build: {
      minify: 'terser',
      terserOptions: {
         compress: {
            drop_console: true,
            drop_debugger: true
         }
      },
      // 配置打包大小限制警告
      chunkSizeWarningLimit: 1500
   }
});
