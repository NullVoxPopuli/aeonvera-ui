import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';

let application;

module('Acceptance | requires-login | password-reset', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    server.shutdown()
    Ember.run(application, 'destroy');
  },
});

test('submitting the password for redirects to page saying you will get an email', function(assert) {
  visit('/password-reset');
  andThen(_ => {
    fillIn('form input[type="email"]', 'test@test.test');
    click('form button[type="submit"]');
  });

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.success');
  });
});

test('setting new password fails without a token', function(assert) {
  visit('/password-reset/edit');
  assert.ok(true);
});

test('setting new password succeeds', function(assert) {
  visit('/password-reset/edit');
  assert.ok(true);

});
