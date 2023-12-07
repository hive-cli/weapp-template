module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
    'stylelint-prettier/recommended'
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true,
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*((__([a-z][a-z0-9]*)(-[a-z0-9]+)*)*(--([a-z][a-z0-9]*)(-[a-z0-9]+)*)?)$',
      { message: 'invalid selector class name' }
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'font-family-no-missing-generic-family-keyword': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'recycle-item', 'view', 'text', 'scroll-view']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['/./', 'v-deep', '-webkit-']
      }
    ]
  },
  ignoreFiles: ['node_modules/**/*', '**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']
}
