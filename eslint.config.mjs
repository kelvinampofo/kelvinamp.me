import tailwindcss from 'eslint-plugin-tailwindcss';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...compat.extends(
    'next',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  {
    plugins: {
      tailwindcss,
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      react: reactPlugin
    },
    languageOptions: {
      parser: tsParser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-unused-vars': 1,
      'no-console': 1,
      'import/no-cycle': 'error',
      'linebreak-style': ['error', 'unix'],
      'react/prop-types': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off'
    },
    ignores: ['node_modules/']
  }
];
