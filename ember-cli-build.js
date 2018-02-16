'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

var env = EmberApp.env();
var isProductionLike = ['production', 'staging'].indexOf(env) > -1;

module.exports = function(defaults) {
  var fingerprintPrepend = `https://s3.amazonaws.com/aeonvera-${env}/ember/`;

  console.log(env, fingerprintPrepend);

  let app = new EmberApp(defaults, {
    babel: {
      plugins: [
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-class-properties',
      ]
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
    // disable JSHint, in favor of eslint
    'hinting': false,
    /* ember-cli.com/ember-cli-deploy/docs/v0.6.x/fingerprinting */
    fingerprint: {
      enabled: isProductionLike,
      prepend: fingerprintPrepend
    },
    sourcemaps: { enabled: true },
    minifyCss: { enabled: isProductionLike },
    minifyJS: { enabled: isProductionLike },
    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLike,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLike
  });

  // countdowns! (In human-readable format)
  app.import('vendor/countdown.js');

  // font awesome
  app.import('vendor/fontawesome/css/font-awesome-all.min.css');
  var fontTree = new Funnel('vendor/fontawesome/webfonts', { destDir: '/assets/fontawesome/webfonts' });
  var fontStyleTree = new Funnel('vendor/fontawesome/css', { destDir: '/assets/fontawesome/css' });

  if (isProductionLike) {
    app.import('vendor/support/crisp.js');
    app.import('vendor/support/fullstory.js');
  }

  return mergeTrees([app.toTree(), fontTree, fontStyleTree]);
};
