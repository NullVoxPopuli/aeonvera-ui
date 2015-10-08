/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    APP: {},
    modulePrefix: 'aeonvera',
    i18n: { defaultLocale: 'en' },
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    stripe: {
      key: 'a' /* set per event */
    },

    devise: {
      serverTokenEndpoint: '/users/sign_in'
    },


    ACTIVE_MODEL_API_URL: 'https://aeonvera.com/api/',

    'ember-simple-auth': {
      session: 'session:application',
      store: 'session-store:local-storage',
      authorizer: 'ember-simple-auth-authorizer:devise',
      crossOriginWhitelist: ['*']
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com",
      // 'font-src': "'self' data: use.typekit.net",
      'connect-src': "*",
      'img-src': "'self' data: https://*.stripe.com",
      'style-src': "'self' 'unsafe-inline' *.aeonvera.com",
      'frame-src': "https://*.stripe.com"
    },
    flashMessageDefaults: {
      timeout: 10000
    },
    subdomainMapping: {
      '': 'default',
      'www': 'default',
      '*': 'register'
    }
  };

  /*
  ==========================
    Per Environment Setups
  ==========================
  */

  if (environment === 'development') {
    ENV.host = 'http://swing.vhost:3000';

    ENV['devise']['serverTokenEndpoint'] = 'http://swing.vhost:3000/users/sign_in';
    // {
    //   // defaults to /users/sign_in
    //   serverTokenEndpoint: ,
    //   serverTokenRevocationEndPoint: 'http://swing.vhost:3000/users/sign_out',
    //   crossOriginWhitelist: ['http://swing.vhost:3000']
    //     /*
    //     serverTokenEndpoint: 'http://aeonvera-staging.work/users/sign_in',
    //     crossOriginWhitelist: ['http://aeonvera-staging.work']
    //     */
    // };

    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
  }

  if (environment === 'production') {
    ENV.host = 'https://aeonvera.com';
    // serverTokenEndpoint: 'https://aeonvera.com/users/sign_in',
    // crossOriginWhitelist: ['https://aeonvera.com'],

    // Make sure Ember allows us to connect to teh server
    ENV['contentSecurityPolicy'] = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com",
      // 'font-src': "'self' data: use.typekit.net",
      'connect-src': "'self' *.aeonvera.com",
      'img-src': "'self' data: https://*.stripe.com",
      'style-src': "'self' 'unsafe-inline' *.aeonvera.com",
      'frame-src': "https://*.stripe.com"
    };
  }
  ENV.host = 'http://swing.vhost:3000';

  return ENV;
};
