// eslint-disable-next-line no-undef
module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
      {
        "files": [
          "**/*.spec.js",
          "**/*.spec.jsx"
        ],
        "env": {
          "jest": true
        }
      }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
    },
    plugins: ['@typescript-eslint'],
    rules: {},
  };