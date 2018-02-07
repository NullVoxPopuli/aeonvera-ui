/* jshint node: true */

module.exports = function(deployTarget) {
  var bucketSuffix = deployTarget === 'development' ? 'dev' : deployTarget;

  var ENV = {
    build: {},
    /* upload assets */
    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
      prefix: 'ember'
    },
    /* upload index.html */
    ['s3-index']: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      allowOverwrite: true,
      region: 'us-east-1',
      prefix: 'ember'
    },
    // redis: {
    //   host: 'localhost',
    //   port: '6379',
    //   password: '',
    //   allowOverwrite: true
    // },

    gzip: {
      /* default, minus map */
      filePattern:  '\*\*/\*.{js,css,json,ico,xml,txt,svg,eot,ttf,woff,woff2}'
    },

    rollbar: {
      accessToken: 'ca10480ec923459abdbe39a95c1181d9',
      accessServerToken: 'ecd51b9e05084953bf2f9bc1e7dd3e77',
      minifiedPrependUrl: function(context){
        return ['https://s3.amazonaws.com/aeonvera-' + bucketSuffix + '/ember/'];
      },
      environment: deployTarget,
      username: process.env.USER + '@' + process.env.HOSTNAME
    }
  };

  // development, staging, production
  ENV.build.environment = deployTarget;
  ENV.s3.bucket = `aeonvera-${bucketSuffix}`;
  ENV['s3-index'].bucket = ENV.s3.bucket;

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
