import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    plugins: {
      import: importPlugin,
      react,
      unicorn
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        ecmaFeatures: { jsx: true }
      }
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' }
      }
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          pathGroups: [
            { pattern: '@ozen-ui/**', group: 'external', position: 'after' },
            { pattern: '@assets/**', group: 'external', position: 'after' },
            { pattern: '@shared/**', group: 'external', position: 'after' },
            {
              pattern: '@infrastructure/**',
              group: 'external',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          groups: [
            'builtin', // node builtins
            'external', // npm пакеты (включая @ozen-ui/**)
            'internal', // абсолютные/алиасы проекта
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      // js rules
      eqeqeq: ['error', 'always'],
      'no-unneeded-ternary': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],

      // ts rules
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: true }
      ],
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true }
      ],
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',

      // react
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-no-comment-textnodes': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-no-leaked-render': 'warn',
      'react/jsx-curly-brace-presence': 'warn',

      'unicorn/filename-case': ['error', { case: 'kebabCase' }]
    }
  }
])
