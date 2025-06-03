// eslint.config.js

import eslintPluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['*.jsx', '*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      'react/default-props-match-prop-types': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
