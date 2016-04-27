# aeonvera-ui [![Build Status](https://travis-ci.org/NullVoxPopuli/aeonvera-ui.svg)](https://travis-ci.org/NullVoxPopuli/aeonvera-ui) [![Code Climate](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui/badges/gpa.svg)](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui) [![Test Coverage](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui/badges/coverage.svg)](https://codeclimate.com/github/NullVoxPopuli/aeonvera-ui/coverage) [![Dependencies](https://david-dm.org/NullVoxPopuli/aeonvera-ui.svg)](https://david-dm.org/NullVoxPopuli/aeonvera-ui.svg)
Ember frontend for aeonvera


## Running / Development

    source nvm-setup
    ember server

* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Deploying

For deploying to heroku, you'll need to specify
 - AWS_ACCESS_KEY_ID
 - AWS_SECRET_ACCESS_KEY
 - REDISCLOUD_URL
 - REDISCLOUD_PORT
 - REDISCLOUD_PASSWORD

* `ember deploy staging`
* `ember deploy production`
  * I've learned I can't trust travis with secret keys.



## Setup on Ubuntu 15.04

### nvm

    git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

or copy the latest command from [the NVM repo](https://github.com/creationix/nvm)

    nvm install stable
    nvm current # should output current node version


### bower

    npm install -g bower

### Initial app dependencies

    npm install
    bower install

### Updating app dependencies

!!! Dangerous !!!

```
npm install -g npm-check-updates
npm-check-updates -u
npm install
```
This is, for the most part, somewhat destructive.
