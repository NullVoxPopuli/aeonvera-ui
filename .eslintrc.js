module.exports = {
  "extends": "airbnb-base",
  "plugins": [
      // "import"
  ],
  "ignoreFiles": [
    "test/**/*"
  ],
  "env": {

  },
  "maxWarnings": 1,
  "rules": {
    "comma-dangle": ["error", "never"],
    // http://eslint.org/docs/rules/one-var-declaration-per-line
    "one-var-declaration-per-line": ["error", "always"]
    // http://eslint.org/docs/rules/object-property-newline
    "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],
    // http://eslint.org/docs/rules/newline-per-chained-call
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 3}],
    // http://eslint.org/docs/rules/newline-before-return
    "newline-before-return": 0,
    "eol-last": ["error", "always"],
    "indent": ["error", 2],
    "no-mixed-spaces-and-tabs": "error",
    "no-console": 1,
    "complexity": ["error", 2],
    "no-else-return": ["error"],
    "quotes": [2, 'single']
  }
};
