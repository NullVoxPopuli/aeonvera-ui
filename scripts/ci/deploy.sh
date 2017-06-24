#!/bin/sh
set -x
echo $DEPLOY_TARGET
docker-compose -f docker-compose.test.ci.yml run \
  --rm test-server bash -c "\
    yarn install && bower install && \
    DEPLOY_ENV=$DEPLOY_TARGET ember deploy $DEPLOY_TARGET --activate \
    "
