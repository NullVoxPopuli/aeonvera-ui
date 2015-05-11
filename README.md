# aeonvera-ui
Ember frontend for aeonvera


# Setup

## Ubuntu 15.04

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
    
# Running

    ember server
    
