import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import 'aeonvera/tests/helpers/login';
import 'aeonvera/tests/helpers/logout';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance | requires-login | dashboard', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  },
});

test('I am redirected upon attempting to visit without being logged in', function(assert) {
  visit('/dashboard');
  andThen(() => {
    equal(currentRouteName(), 'welcome');
  });
});

test('Upon logging out, I am redirected', function(assert) {
  login();
  andThen(() => {
    visit('/dashboard');
    logout();
    andThen(() => {
      equal(currentRouteName(), 'welcome');
    });
  });
});
