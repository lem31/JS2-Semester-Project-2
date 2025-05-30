import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Define your language options
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        module: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      semi: ['error', 'always'],
      'no-console': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'prefer-const': 'warn',
    },
    plugins: {
      eslint: pluginJs,
      prettier: prettierPlugin,
    },
  },

  pluginJs.configs.recommended,
  prettierConfig,
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
