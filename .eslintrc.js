module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['prettier'],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    'react/forbid-prop-types': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-indent': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
