FROM nullvoxpopuli/ember-cli:2.13.3
USER root

ADD bower.json   /web/bower.json
RUN bower install
ADD package.json /web/package.json
RUN yarn install
