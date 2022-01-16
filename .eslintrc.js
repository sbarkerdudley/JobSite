module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'react/prop-types': 0,
    'func-names': 0,
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
  },
};
