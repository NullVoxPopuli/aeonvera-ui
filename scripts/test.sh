#!/bin/sh
set -x

# docker-compose -f docker-compose.test.yml rm --all -f
docker-compose -f docker-compose.test.ci.yml build
docker-compose -f docker-compose.test.ci.yml run --rm test-server bash -c "\
  yarn install && bower install && \
  ember test --server --test-port 4310 --line-reload-port 4311\
  "
