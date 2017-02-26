# https://github.com/danlynn/ember-cli/blob/2.11.0/Dockerfile
#
# Comes with
# - ember-cli
# - bower
# - PhantomJS
# - npm v 2.15.11
# - watchman
#
# Maybe use this instead?
# https://github.com/IcaliaLabs/guides/wiki/Creating-and-Running-an-Ember-app-with-Docker
#
# This image uses:
# EXPOSE 4200 49152
# CMD ember server
# FROM danlynn/ember-cli:2.11.0
FROM node:6.9.5

# Note: npm is v2.15.11
RUN \
  apt-get install tar bzip2 && \
  npm install -g ember-cli@2.11.1 && \
  npm install -g bower@1.8.0 && \
  npm install -g phantomjs-prebuilt@2.1.14 && \
  # install watchman
  # Note: See the README.md to find out how to increase the
  # fs.inotify.max_user_watches value so that watchman will
  # work better with ember projects.
  git clone https://github.com/facebook/watchman.git && \
  cd watchman && \
  git checkout v3.5.0 && \
  ./autogen.sh && \
  ./configure && \
  make && \
  make install

# ember server on port 4200
# livereload server on port 49152
EXPOSE 4200 49152

RUN mkdir /web
WORKDIR /web
ADD . /web

# Use user inherited from node image.
# This allows files created in the docker environment to
# be editable by the host machine user
USER node

# run ember server on container start
CMD ["ember", "server"]
