#!/bin/sh

# use user input, otherwise analyze
# command=${1:-'analyze -f html > codeclimate.html'}

# echo "Running: codeclimate $command"

# actually run the command
 docker run   \
  --rm  \
  --env CODECLIMATE_CODE="$PWD"   \
  --volume "$PWD":/code  \
  --volume /var/run/docker.sock:/var/run/docker.sock   \
  --volume /tmp/cc:/tmp/cc  \
  codeclimate/codeclimate analyze -f html > codeclimate.html
  #  $(echo $command | xargs)
