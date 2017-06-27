/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    APP: {
    },
    modulePrefix: 'aeonvera',
    podModulePrefix: 'aeonvera/pods',
    i18n: {
      defaultLocale: 'en'
    },
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse
        Date: false
      }
    },

    emblemOptions: {
      // use handlebars by default
      blueprints: false
    },

    // React-like prop type checking
    'ember-prop-types': {
      // Validate properties coming from a spread property (default is undefined)
      // spreadProperty: 'options',
      // Throw errors instead of logging warnings (default is false)
      throwErrors: false,
      // Validate properties (default is true for all environments except "production")
      validate: true,
      // Validate properties when they are updated (default is false)
      validateOnUpdate: true
    },

    stripe: {
      key: 'a', /* set per event */
      /* development client id */
      clientId: 'ca_4oEqCCUzDfLTBqXsFbXyklhVUP8XdOfO'
    },

    devise: {
      serverTokenEndpoint: 'api/users/sign_in'
    },
    'ember-loading-route': {
      enabled: false,
      commonRoutes: [
        {
          // routeLevel: 5,
          templateName: 'loading'
        }
      ]
    },

    emberRollbarClient: {
      accessToken:  'ca10480ec923459abdbe39a95c1181d9',
      enabled: environment !== 'test' && environment !== 'development',
      verbose: true
    },

    torii: {
      providers: {
        'stripe-connect': {
          apiKey: process.env.STRIPE_CLIENT_ID
        }
      }
    },

    localSettings: {
      serializer: 'json',
      adapter: 'local-storage',
      prefix: 'aeonvera/'
    },

    'ember-simple-auth': {
      routeIfAlreadyAuthenticated: 'dashboard',
      // session: 'session:application',
      // store: 'session-store:local-storage',
      // authorizer: 'ember-simple-auth-authorizer:token',
      authorizer: 'authorizer:token',
      crossOriginWhitelist: ['*']
    },
    'ember-simple-auth-token': {
      serverTokenEndpoint: '/api/users/sign_in',
      identificationField: 'email',
      passwordField: 'password',
      tokenPropertyName: 'token',
      authorizationPrefix: 'Bearer ',
      authorizationHeaderName: 'Authorization',
      headers: {},
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' js-agent.newrelic.com *.stripe.com sidecar.gitter.im *",
      'font-src': "'self' *.amazonaws.com fonts.gstatic.com",
      'connect-src': "*",
      'img-src': "'self'  *.amazonaws.com data: https://*.stripe.com *",
      'style-src': "'self' 'unsafe-inline' *.aeonvera.com https://fonts.googleapis.com",
      'frame-src': "https://*.stripe.com"
    },
    flashMessageDefaults: {
      timeout: 10000
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }

  };

  /*
  ==========================
    Per Environment Setups
  ==========================
  */

  if (environment === 'development') {
    ENV.host = 'http://swing.vhost:4301';
    ENV.APP.host = 'http://swing.vhost:4301';

    ENV['ember-simple-auth-token']['serverTokenEndpoint'] =
      'http://swing.vhost:4301/api/users/sign_in';

    ENV.torii.providers['stripe-connect'].apiKey = ENV.stripe.clientId;
    ENV.torii.providers['stripe-connect'].redirectUri = 'http://swing.vhost:4300';

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
  }

  if (environment === 'staging'){
    ENV.host = 'https://aeonvera-staging.work';
    ENV.APP.host = 'https://aeonvera-staging.work';
    ENV.S3Assets = 'https://s3.amazonaws.com/aeonvera-staging/ember';

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    ENV['ember-simple-auth-token']['serverTokenEndpoint'] =
      'https://aeonvera-staging.work/api/users/sign_in';

    ENV.torii.providers['stripe-connect'].redirectUri = ENV.host;

    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;

    ENV['contentSecurityPolicy'] = {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.stripe.com sidecar.gitter.im",
      'font-src': "'self' *.amazonaws.com",
      'connect-src': "'self' *.aeonvera-staging.work",
      'img-src': "'self' '*amazonaws.com' data: https://*.stripe.com",
      'style-src': "'self' 'unsafe-inline' *.aeonvera-staging.work",
      'frame-src': "https://*.stripe.com"
    };

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.host = '/';
    ENV.host = '';

    ENV.localSettings.adapter = 'local-memory';
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
    ENV.torii.providers['stripe-connect'].redirectUri = ENV.host;


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
