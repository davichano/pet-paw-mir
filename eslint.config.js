import js from '@eslint/js';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress/flat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      cypress: pluginCypress,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['cypress/**/*.cy.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: 'readonly',
      },
    },
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      'no-unused-vars': 'off', // Opcional: Desactivar reglas que interfieran en pruebas
      'no-undef': 'off', // Opcional: Ignorar advertencias sobre funciones no definidas
    },
  },

  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: 'readonly',
      },
    },
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      'no-unused-vars': 'off', // Opcional: Desactivar reglas que interfieran en pruebas
      'no-undef': 'off', // Opcional: Ignorar advertencias sobre funciones no definidas
    },
  },
];
