import js from '@eslint/js'
import prettier from '@vue/eslint-config-prettier'
import vue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: {
      vue
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vue.parserServices,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs['vue3-essential'].rules,
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      'vue/no-v-model-argument': 'off'
    }
  },
  prettier
]
