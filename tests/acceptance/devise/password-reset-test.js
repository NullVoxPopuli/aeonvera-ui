import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';

let application;

module('Acceptance | requires-login | password-reset', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
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
  andThen(_ => {
    fillIn('form input[type="password"]:first', '12345678');
    fillIn('form input[type="password"]:first', '12345678');
    click('form button[type="submit"]');
  });

  andThen(_ => {
    let text = find('form').text();
    let formText = text.indexOf('mising reset token') !== -1;
    assert.ok(formText);
  });
});

test('setting new password succeeds', function(assert) {
  visit('/password-reset/edit?reset_password_token="123"');
  andThen(_ => {
    fillIn('form input[type="password"]:first', '12345678');
    fillIn('form input[type="password"]:last', '12345678');
    click('form button[type="submit"]');
  });

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.reset-success');
  });
});
