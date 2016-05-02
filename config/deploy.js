/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    /* upload assets */
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
      /* folder */
      prefix: 'ember'
    },
    /* upload index.html */
    redis: {
      host: 'localhost',
      port: '6379',
      password: '',
      allowOverwrite: true
    },

    gzip: {
      /* default, minus map */
      filePattern:  '\*\*/\*.{js,css,json,ico,xml,txt,svg,eot,ttf,woff,woff2}'
    },

    rollbar: {
      accessToken: 'ca10480ec923459abdbe39a95c1181d9',
      accessServerToken: 'ecd51b9e05084953bf2f9bc1e7dd3e77',
      minifiedPrependUrl: function(context){
        return ['https://s3.amazonaws.com/aeonvera-' + deployTarget + '/ember/'];
      },
      environment: deployTarget,
      username: process.env.USER + '@' + process.env.HOSTNAME
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'staging';
    // configure other plugins for staging deploy target here
    ENV.s3.bucket = 'aeonvera-staging';
    ENV.redis.host = process.env.REDISCLOUD_URL;
    ENV.redis.port = process.env.REDISCLOUD_PORT;
    ENV.redis.password = process.env.REDISCLOUD_PASSWORD;
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
    ENV.s3.bucket = 'aeonvera-production';
    ENV.redis.host = process.env.REDISCLOUD_URL;
    ENV.redis.port = process.env.REDISCLOUD_PORT;
    ENV.redis.password = process.env.REDISCLOUD_PASSWORD;
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
