/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
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

  var app = new EmberApp({
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
    sourcemaps: { enabled: !isProductionLike },
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

  // tetris!
  app.import('vendor/blockrain/blockrain.css');
  app.import('vendor/blockrain/blockrain.jquery.js');

  return app.toTree();
};
