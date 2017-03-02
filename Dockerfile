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
FROM nullvoxpopuli/ember-cli
