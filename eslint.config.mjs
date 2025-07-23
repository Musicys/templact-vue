import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'node_modules',
      'dist',
      '.gitignore',
      'package.json',
      'package-lock.json',
      '*.local',
      '*.d.ts',
      'src/uni_modules',
      '.husky',
      'vite.config.js',
      '.prettierrc.cjs',
      'vite.config.ts'
    ]
  },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], languageOptions: { globals: globals.browser } },
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'no-var': 'warn', // 禁止出现var用let和const代替
      'no-unused-vars': 'off', //关闭自带的规则
      '@typescript-eslint/no-unused-vars': 'error', //开启未使用变量的规则
      '@typescript-eslint/no-empty-interface': 'off',
      'vue/multi-word-component-names': 'off', //根节点的name
      '@typescript-eslint/no-empty-function': 'off' //不允许空函数
    }
  },

  {
    files: ['**/*.{js,mjs,cjs,vue,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // 关闭禁止 any 类型
      '@typescript-eslint/no-unused-vars': 'off' // 关闭未使用变量检查
    }
  }
]);
