import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { fileURLToPath } from 'url'

const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url))

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {},
  },
]
