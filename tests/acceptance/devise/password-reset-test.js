import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';

let application;

module('Acceptance | password-reset', {
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
  // server.put('/api/users/password-reset.json', { errors: { reset_password_token: 'missing reset token' }}, 422);
  visit('/password-reset/edit');
  andThen(_ => {
    fillIn('form input[type="password"]:first', '12345678');
    fillIn('form input[type="password"]:first', '12345678');
  });
  andThen(_ => {
    click('form button[type="submit"]');
  });
  andThen(_ => {
    let text = find('form[name="password-reset-form"]').text();
    let formText = text.indexOf('missing reset token') !== -1;
    assert.ok(formText);
  });
});

test('setting new password succeeds', function(assert) {
  server.put('/api/users/password-reset.json', {}, 201);

  visit('/password-reset/edit/?reset_password_token=123456a');

  andThen(_ => {
    assert.equal(currentURL(), '/password-reset/edit/?reset_password_token=123456a');
    fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
    fillIn('form[name="password-reset-form"] input[type="password"]:last', '12345678');
  });
  andThen(_ => {
    click('form button[type="submit"]');
  });
  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.reset-success');
  });
});
