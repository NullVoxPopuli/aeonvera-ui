docker-compose -f docker-compose.test.ci.yml build
docker-compose -f docker-compose.test.ci.yml run --rm test-server npm install
docker-compose -f docker-compose.test.ci.yml run --rm test-server bower install
