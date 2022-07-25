module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // "plugin:vue/essential",
    'plugin:vue/vue3-recommended',
    'standard',
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off' // 要求组件名称始终为 “-” 链接的单词
  }
}
