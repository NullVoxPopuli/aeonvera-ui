// by default this extends
// eslint:recommended
module.exports = {
  root: true,
  "extends": "ember",
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  "maxWarnings": 1,
  "rules": {
    // allow inline braces
    // http://eslint.org/docs/rules/brace-style#1tbs
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    // allow implicit undefined return
    // TODO: figure out why this errors when unspecified return
    "consistent-return": ["warn", { "treatUndefinedAsUnspecified": true }],
    // allow arrow function shorthand
    // http://eslint.org/docs/rules/arrow-body-style#as-needed
    "arrow-body-style": ["error", "as-needed"],
    // have an arrow on both sides of the phat-arrow / hash-rocket
    // http://eslint.org/docs/rules/arrow-spacing
    "arrow-spacing": ["error", { "before": true, "after": true }],
    // No spaces before function parethesis
    // http://eslint.org/docs/rules/space-before-function-paren
    "space-before-function-paren": ["error", "never"],
    // Enforce spaces around curly braces in deconstruction and imports
    // http://eslint.org/docs/rules/object-curly-spacing#always
    'object-curly-spacing': ["error", "always"],
    // Allow singleline if blocks
    // http://eslint.org/docs/rules/curly
    'curly': ["error", "multi-line"],
    // In Ember, everything is a dev dep, cause we deploy compiled version
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    "import/no-extraneous-dependencies": [
      0, {
        "devDependencies": false,
        "optionalDependencies": false,
        "peerDependencies": false}],
    "comma-dangle": ["error", "never"],
    // http://eslint.org/docs/rules/one-var-declaration-per-line
    "one-var-declaration-per-line": ["error", "always"],
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
    "no-warning-comments": ["warn"],
    "complexity": ["error", 2],
    "no-else-return": ["error"],
    "quotes": [2, 'single'],

    // sometimes ya just don't want to extract another function.
    // (thanks promises)
    "max-nested-callbacks": ["warn", 4],
    // 80 is so 90's
    "max-len": ["warn", 100],

    /////////////////////////
     // TEMPORARILY DISABLED:
     /////////////////////////
     // babel-eslint doesn't work with short-hand decorators
     // https://github.com/babel/babel-eslint/issues/204
     "no-undef": 0,

    // TEMPORARY - these should all be re-enabled
    "no-magic-numbers": 0,
    "no-undefined": 0,
    "no-empty-function": 0,
    "no-alert": 0,
    "radix": 0,
    "prefer-const": 0,
    "one-var": 0,
    "valid-jsdoc": 0,
    "newline-per-chained-call": 0,
    "no-multi-str": 0,
    "no-negated-condition": 0,
    "no-use-before-define": 0,
    "no-bitwise": 0,
    "no-return-assign": 0,
    "no-param-reassign": 0,
    "no-ternary": 0,
    "no-confusing-arrow": 0,
    "consistent-this": 0,
    "no-nested-ternary": 0,
    "consistent-return": 0,
    "no-unused-vars": 0, // laziness :-(
    "camelcase": 0, // cause of rails ids
    "complexity": ["warn", 2],
    "no-shadow": 0,
    "no-console": 0, // really? shame on me.
    "no-undef": 0, // esp this one -- renabled
    "no-warning-comments": 0,
    "prefer-rest-params": 0,
    "prefer-reflect": 0,
    "array-callback-return": 0, // router.js?
    "no-eq-null": 0, // use === instead of ==
    "eqeqeq": 0, // != instead of !==
  }
};
