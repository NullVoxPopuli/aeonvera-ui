# aeonvera-ui [![Build Status](https://travis-ci.org/NullVoxPopuli/aeonvera-ui.svg)](https://travis-ci.org/NullVoxPopuli/aeonvera-ui) [![Code Climate](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui/badges/gpa.svg)](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui) [![Test Coverage](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui/badges/coverage.svg)](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui/coverage) [![Dependencies](https://david-dm.org/NullVoxPopuli/aeonvera-ui.svg)](https://david-dm.org/NullVoxPopuli/aeonvera-ui.svg)
Ember frontend for aeonvera


## Running / Development

Once / when dependencies change
```bash
docker-compose build
docker-compose run --rm server npm install && bower install
```

```bash
docker-compose up
```

* Visit your app at [http://localhost:4200](http://localhost:4200).

There is also a `./run` script that saves typing for the above commands.

### Running Tests

```bash
docker-compose -f docker-compose.test.ci.yml up # to run the test server
```

### Deploying

For deploying to heroku, you'll need to specify
 - AWS_ACCESS_KEY_ID
 - AWS_SECRET_ACCESS_KEY
 - REDISCLOUD_URL
 - REDISCLOUD_PORT
 - REDISCLOUD_PASSWORD

* `ember deploy staging`
  * `grep -lr --include=*.js sourceMappingURL bower_components/ | xargs sed -i 's/sourceMappingURL//g'`
     - In case there are source map issues
* `ember deploy production`
  * I've learned I can't trust travis with secret keys.
