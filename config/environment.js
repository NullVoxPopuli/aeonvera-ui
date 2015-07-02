/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'aeonvera',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      defaultLocale: 'en'

    },

    'simple-auth': {
      authorizer: 'simple-auth-authorizer:devise',
      crossOriginWhitelist: ['*']
    },
    'simple-auth-devise': {
      tokenAttributeName: 'token',
      identificationAttributeName: 'email'
    },
    contentSecurityPolicy: {
      'default-src': "*",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'font-src': "*",
      'connect-src': "*",
      'img-src': "*",
      'style-src': "*",
      'frame-src': ""
    },
    flashMessageDefaults: {
      timeout: 5000
    },
    subdomainMapping: {
      '': 'default',
      'www': 'default',
      '*': 'register'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['simple-auth-devise'] = {
      // defaults to /users/sign_in
      serverTokenEndpoint: 'http://swing.vhost:3000/users/sign_in',
      crossOriginWhitelist: ['http://swing.vhost:3000']
      // serverTokenEndpoint: 'http://aeonvera-staging.work/users/sign_in',
      // crossOriginWhitelist: ['http://aeonvera-staging.work']
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // Make sure Ember allows us to connect to teh server
    ENV['contentSecurityPolicy'] = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      // 'font-src': "'self' data: use.typekit.net",
      'connect-src': "'self' *.aeonvera.com",
      'img-src': "'self'",
      'style-src': "'self' 'unsafe-inline' *.aeonvera.com",
      'frame-src': ""
    }
  }

  return ENV;
};
