/**
 * Prettier 代码格式化配置
 * 官方文档：https://prettier.io/docs/en/options.html
 */
module.exports = {
  // 引用 JSON Schema 以提供编辑器自动补全和验证
  $schema: 'https://json.schemastore.org/prettierrc',

  // 单行代码的最大长度，超过此长度会进行换行
  printWidth: 120,

  // 每个缩进级别使用的空格数
  tabWidth: 3,

  // 禁用 Tab 字符缩进，统一使用空格
  useTabs: false,

  // 在语句末尾添加分号
  semi: true,

  // 使用单引号代替双引号
  singleQuote: true,

  // 根据文件当前的行尾样式自动保持一致
  endOfLine: 'auto',

  // 对象属性仅在必要时添加引号（如属性名是 JavaScript 保留字）
  quoteProps: 'as-needed',

  // JSX 中仍然使用双引号（符合 React 社区惯例）
  jsxSingleQuote: false,

  // 禁用拖尾逗号（如对象或数组的最后一个元素后不添加逗号）
  trailingComma: 'none',

  // 在对象字面量的括号间添加空格（如 { key: value } 而非 {key: value}）
  bracketSpacing: true,

  // 将 HTML/JSX 标签的右尖括号放在最后一行的末尾而非单独一行
  bracketSameLine: true,

  // 箭头函数参数只有一个时省略括号（如 x => x 而非 (x) => x）
  arrowParens: 'avoid',

  // 从第 0 个字符开始格式化整个文件
  rangeStart: 0,

  // 不要求文件顶部有特殊的格式化注释标记
  requirePragma: false,

  // 不自动在文件顶部插入格式化注释标记
  insertPragma: false,

  // 保留 Markdown 文件中已有的换行方式
  proseWrap: 'preserve',

  // 根据 CSS 的 display 属性来决定 HTML 中空格的敏感度
  htmlWhitespaceSensitivity: 'css',

  // 不对 Vue 文件中的 <script> 和 <style> 标签内的代码进行额外缩进
  vueIndentScriptAndStyle: false,

  // 自动格式化嵌入在字符串中的代码（如模板字符串中的 HTML/JS）
  embeddedLanguageFormatting: 'auto',

  // 不禁用每个标签只放一个属性的规则（保持多行属性的灵活性）
  singleAttributePerLine: false
};
