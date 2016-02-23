module.exports = function(grunt) {
  grunt.initConfig({
    env: process.env.DEST,

    // s3: {
    //   options: {
    //     key: '<%= env.S3_ACCESS_KEY_ID %>',
    //     secret: '<%= env.S3_SECRET_ACCESS_KEY %>',
    //     bucket: '<%= env.S3_BUCKET %>',
    //     access: 'public-read',
    //     headers: {
    //       "Cache-Control": "max-age=630720000, public",
    //       "Expires": new Date(Date.now() + 630720000).toUTCString()
    //     },
    //   },
    //   dev: {
    //     upload: [
    //       {
    //         src: 'dist/assets/**/*',
    //         dest: 'assets/',
    //         rel: 'dist/assets',
    //         options: { verify: true }
    //       }
    //     ]
    //   },
    //   prod: {
    //    upload: [
    //      {
    //        src: 'dist/index.html',
    //        dest: 'index.html'
    //      },
    //      {
    //        src: 'dist/assets/*',
    //        dest: 'assets/'
    //      }
    //    ]
    //  }
    // }
  });

  // tell grunt to load and use the grunt-s3 extension
  grunt.loadNpmTasks('grunt-s3');

  // Default task(s).
  grunt.registerTask('default', ['s3']);

};
