'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var env = EmberApp.env();
var isProductionLike = ['production', 'staging'].indexOf(env) > -1;


module.exports = function(defaults) {
  var fingerprintPrepend = '';
  console.log(env);
  switch(env){
    case 'staging':
      fingerprintPrepend = 'https://s3.amazonaws.com/aeonvera-staging/ember/';
    break;
    case 'production':
      fingerprintPrepend = 'https://s3.amazonaws.com/aeonvera-production/ember/';
    break;
  };

  console.log(fingerprintPrepend);

  let app = new EmberApp(defaults, {
    babel: {

      //optional: ['es7.decorators'],
      plugins: [
        'transform-decorators-legacy',
       // 'transform-decorators',
        'transform-object-rest-spread',
        'transform-class-properties',
      ]

    },
    'ember-cli-babel': {
      includePolyfill: true,

    },
    // disable JSHint, in favor of eslint
    'hinting': false,
    'ember-bootstrap': {
      bootstrapVersion: 4,
      importBootstrapFont: false,
      'importBootstrapCSS': false
    },
    'ember-cli-foundation-sass': {
      'modernizr': true,
      'fastclick': true,
      'foundationJs': 'all'
    },
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

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/momentjs/moment.js');

  // countdowns!
  app.import('vendor/countdown.js');

  if (isProductionLike) {
    app.import('vendor/support/crisp.js');
    app.import('vendor/support/fullstory.js');
  }

  return app.toTree();
};
