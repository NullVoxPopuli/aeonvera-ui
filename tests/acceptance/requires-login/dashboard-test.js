import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import 'aeonvera/tests/helpers/login';
import 'aeonvera/tests/helpers/logout';

let application;

module('Acceptance | requires-login | dashboard', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  },
});

test('I am redirected upon attempting to visit without being logged in', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});

test('Upon logging out, I am redirected', function(assert) {
  login();
  andThen(() => {
    logout();
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});