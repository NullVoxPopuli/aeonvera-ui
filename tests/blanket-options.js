/* globals blanket, module */

var options = {
  modulePrefix: 'aeonvera',
  filter: '//.*aeonvera/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  branchTracking: true,
  cliOptions: {
    reporters: ['lcov'],
    // autostart: true,
    lcovOptions: {
      outputFile: 'lcov.dat',
      excludeMissingFiles: true,

      // provide a function to rename es6 modules to a file path
      renamer: function(moduleName) {
        // return a falsy value to skip given module
        if (moduleName === 'unwanted') { return; }

        var expression = /^APP_NAME/;
        return moduleName.replace(expression, 'app') + '.js';
      }
    }
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
