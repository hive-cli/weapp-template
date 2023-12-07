// .eslintrc.js
module.exports = {
  root: true,
  //   parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
    __WECHAT__: true,
    __ALIPAY__: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    my: true,
    swan: true,
    getApp: true,
    getCurrentPages: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
