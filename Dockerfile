FROM danlynn/ember-cli:2.18.0-node_9.3
USER root

COPY package.json /myapp/package.json
RUN yarn install
