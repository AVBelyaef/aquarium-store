module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
  },
};
