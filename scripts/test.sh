
#!/bin/sh
set -x

# docker-compose -f docker-compose.test.yml rm --all -f
docker-compose -f docker-compose.test.ci.yml build
docker-compose -f docker-compose.test.ci.yml run --rm test-server
