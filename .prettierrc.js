module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  proseWrap: 'preserve',
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'auto',
  eslintIntegration: false,
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore',
  jsxSingleQuote: false,
  requireConfig: false,
  stylelintIntegration: false,
  trailingComma: 'none',
  tslintIntegration: false,
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
  ]
}
