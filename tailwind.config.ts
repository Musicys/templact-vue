// tailwind.config.js
import { type Config } from 'tailwindcss';

const config: Config = {
   content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx,md}' // ✅ 包含 .vue 文件
   ],
   theme: {
      extend: {}
   },
   plugins: []
};

export default config;
