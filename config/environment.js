/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    APP: {},
    modulePrefix: 'aeonvera',
    i18n: {
      defaultLocale: 'en'
    },
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
      key: 'a', /* set per event */
      /* development client id */
      clientId: 'ca_4oEqCCUzDfLTBqXsFbXyklhVUP8XdOfO'
    },

    devise: {
      serverTokenEndpoint: 'users/sign_in'
    },

    rollbar: {
      captureUncaught: environment !== 'development',
      accessToken: 'ca10480ec923459abdbe39a95c1181d9'
    },


    ACTIVE_MODEL_API_URL: 'https://aeonvera.com/api/',

    'ember-simple-auth': {
      routeIfAlreadyAuthenticated: 'dashboard',
      session: 'session:application',
      store: 'session-store:local-storage',
      authorizer: 'ember-simple-auth-authorizer:devise',
      crossOriginWhitelist: ['*']
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.stripe.com sidecar.gitter.im *",
      // 'font-src': "'self' data: use.typekit.net",
      'connect-src': "*",
      'img-src': "'self'  *.amazonaws.com data: https://*.stripe.com *",
      'style-src': "'self' 'unsafe-inline' *.aeonvera.com",
      'frame-src': "https://*.stripe.com"
    },
    flashMessageDefaults: {
      timeout: 10000
    }
  };

  /*
  ==========================
    Per Environment Setups
  ==========================
  */

  if (environment === 'development') {
    ENV.host = 'http://swing.vhost:3000';
    ENV.APP.host = 'http://swing.vhost:3000';

    // note that the test environment is api/users/sign_in
    ENV['devise']['serverTokenEndpoint'] =
      'http://swing.vhost:3000/users/sign_in';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    // Extremely detailed logging, highlighting every internal
    // step made while transitioning into a route, including
    // `beforeModel`, `model`, and `afterModel` hooks, and
    // information about redirects and aborted transitions
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.torii = {
      providers: {
        'stripe-connect': {
          apiKey: ENV.stripe.clientId,
          redirectUri: 'http://swing.vhost:4200'
        }
      }
    };
  }

  if (environment === 'staging'){
    ENV.host = 'http://aeonvera-staging.work';
    ENV.APP.host = 'http://aeonvera-staging.work';
    ENV.S3Assets = 'https://s3.amazonaws.com/aeonvera-staging/ember';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    // note that the test environment is api/users/sign_in
    ENV['devise']['serverTokenEndpoint'] =
      'http://aeonvera-staging.work/users/sign_in';

    ENV['contentSecurityPolicy'] = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com sidecar.gitter.im",
      'connect-src': "'self' *.aeonvera-staging.work",
      'img-src': "'self' '*amazonaws.com' data: https://*.stripe.com",
      'style-src': "'self' 'unsafe-inline' *.aeonvera-staging.work",
      'frame-src': "https://*.stripe.com"
    };

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.host = '/';
  }

  if (environment === 'production') {
    ENV.host = 'https://aeonvera.com';
    ENV.APP.host = 'https://aeonvera.com';
    ENV.S3Assets = 'https://s3.amazonaws.com/aeonvera-production/ember';

    /* somehow get the production client id from an environment variable
      https://github.com/ember-cli/ember-cli/issues/1236#issuecomment-47839794

      apparently process is the node process
      - I think this only matters during build-time
    */
    ENV.stripe.clientId = process.env.STRIPE_CLIENT_ID;

    // Make sure Ember allows us to connect to teh server
    ENV['contentSecurityPolicy'] = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com sidecar.gitter.im",
      'connect-src': "'self' *.aeonvera.com",
      'img-src': "'self' '*amazonaws.com' data: https://*.stripe.com",
      'style-src': "'self' 'unsafe-inline' *.aeonvera.com",
      'frame-src': "https://*.stripe.com"
    };
  }

  return ENV;
};
