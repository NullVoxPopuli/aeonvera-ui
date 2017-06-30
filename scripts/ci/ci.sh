#!/bin/sh
# When things stop working... put it all in one script :-(


set -x

# docker-compose -f docker-compose.test.yml rm --all -f
docker-compose -f docker-compose.test.ci.yml build
docker-compose -f docker-compose.test.ci.yml run \
  --rm test-server bash -c "\
    yarn install && bower install && \
    npm run ci \
  "
  # npm run eslint-no-fix && \
