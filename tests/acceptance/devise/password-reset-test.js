import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance | requires-login | password-reset', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },
});


test('submitting the password for redirects to page saying you will get an email', function(assert){
});

test('setting new password fails without a token', function(assert){

});

test('setting new password succeeds', function(assert){

});
