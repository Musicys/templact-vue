// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

// 不再直接使用 pluginPrettier.configs.recommended
import pluginPrettier from 'eslint-plugin-prettier';

export default [
   // 1. 忽略文件
   {
      ignores: ['dist/', 'node_modules/', '.env', '.env.*', '!.*.env', '*.cjs', 'tailwind.config.js']
   },

   // 2. 基础 JavaScript 规则
   js.configs.recommended,

   // 3. TypeScript 规则
   ...tseslint.configs.recommended,

   // 4. Vue 规则
   ...pluginVue.configs['flat/essential'],

   // 5. 手动添加 Prettier 规则（✅ 核心：手动配置，避免 extends）
   {
      files: ['**/*.{js,cjs,mjs,ts,tsx,jsx,vue}'],
      // 手动加载 Prettier 插件的规则
      plugins: {
         prettier: pluginPrettier
      },
      rules: {
         // 启用 Prettier 检查
         'prettier/prettier': 'error'
      }
   },

   // 6. 手动关闭与 Prettier 冲突的规则（✅ 替代 eslint-config-prettier）
   {
      rules: {
         'comma-dangle': 'off',
         'no-mixed-spaces-and-tabs': 'off',
         'no-trailing-spaces': 'off',
         semi: 'off',
         quotes: 'off',
         'space-before-function-paren': 'off',
         'eol-last': 'off',
         'arrow-spacing': 'off',
         'block-spacing': 'off',
         'comma-spacing': 'off',
         'key-spacing': 'off',
         'object-curly-spacing': 'off',
         'array-bracket-spacing': 'off',
         'space-in-parens': 'off',
         'space-infix-ops': 'off',
         'keyword-spacing': 'off',
         'template-curly-spacing': 'off',
         'rest-spread-spacing': 'off',
         'yield-star-spacing': 'off',
         'generator-star-spacing': 'off',
         'jsx-quotes': 'off',
         'vue/html-closing-bracket-spacing': 'off',
         'vue/html-self-closing': 'off',
         'vue/html-indent': 'off',
         'vue/max-attributes-per-line': 'off',
         'vue/singleline-html-element-content-newline': 'off',
         'vue/multiline-html-element-content-newline': 'off'
      }
   },

   // 7. 自定义规则
   {
      files: ['**/*.vue'],
      languageOptions: {
         parserOptions: {
            parser: tseslint.parser
         }
      },
      rules: {
         'vue/multi-word-component-names': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         'vue/valid-template-root': 'off',
         'no-undef': 'off'
      }
   }
];
