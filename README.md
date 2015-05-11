# aeonvera-ui
Ember frontend for aeonvera


## Setup on Ubuntu 15.04

### nvm

    git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

or copy the latest command from [the NVM repo](https://github.com/creationix/nvm)

    nvm install stable
    nvm current # should output current node version

### node and npm

    node -v # should output the version
    npm -v # should output the npm version
    
### ember-cli

    npm install -g ember-cli
    
### bower

    npm install -g bower
    export PATH="$(npm bin):$PATH"
    
### Initial app dependencies

    npm install
    bower install
    
## Running / Development

    ember server

* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
