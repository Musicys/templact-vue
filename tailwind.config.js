// tailwind.config.js

const config = {
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
