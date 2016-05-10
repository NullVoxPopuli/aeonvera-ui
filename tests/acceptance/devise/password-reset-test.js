import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';

let application;

module('Acceptance | password-reset', {
  beforeEach() {
    application = startApp();
    Ember.testing = false;
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  },
});

test('submitting the password for redirects to page saying you will get an email', function(assert) {
  server.post('/api/users/password', {}, 201);

  visit('/password-reset');
  fillIn('form[name="password-reset-form"] input[type="email"]', 'test@test.test');
  click('form[name="password-reset-form"] button[type="submit"]');

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.success');
  });
});

test('the email address must be specified', function(assert) {
  server.post('/api/users/password',
      { errors: { email: ['cannot be blank'] } },
      422);

  visit('/password-reset');
  fillIn('form[name="password-reset-form"] input[type="email"]', 'test@test.test');
  click('form[name="password-reset-form"] button[type="submit"]');

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.index');
    let text = find('form[name="password-reset-form"]').text();
    let formText = text.indexOf('cannot be blank') !== -1;
    assert.ok(formText);
  });
});

test('setting new password fails without a token', function(assert) {
  server.put('/api/users/password',
    { errors: { reset_password_token: ['missing reset token'] } },
    422);

  visit('/password-reset/edit');
  andThen(_ => {
    assert.equal(currentURL(), '/password-reset/edit');
  });
  fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
  fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
  click('form[name="password-reset-form"] button[type="submit"]');

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.edit');

    let text = find('form[name="password-reset-form"]').text();
    let formText = text.indexOf('missing reset token') !== -1;
    assert.ok(formText);
  });
});

test('setting new password fails without a password', function(assert) {
  server.put('/api/users/password',
    { errors: { password: ['cannot be blank'] } },
    422);

  visit('/password-reset/edit');
  andThen(_ => {
    assert.equal(currentURL(), '/password-reset/edit');
  });
  fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
  fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
  click('form[name="password-reset-form"] button[type="submit"]');

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.edit');

    let text = find('form[name="password-reset-form"]').text();
    let formText = text.indexOf('cannot be blank') !== -1;
    assert.ok(formText);
  });
});

test('setting new password fails without a password confirmation', function(assert) {
  server.put('/api/users/password',
    { errors: { password_confirmation: ['cannot be blank'] } },
    422);

  visit('/password-reset/edit');
  andThen(_ => {
    assert.equal(currentURL(), '/password-reset/edit');
  });
  fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
  fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
  click('form[name="password-reset-form"] button[type="submit"]');

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.edit');

    let text = find('form[name="password-reset-form"]').text();
    let formText = text.indexOf('cannot be blank') !== -1;
    assert.ok(formText);
  });
});

test('setting new password succeeds', function(assert) {
  server.put('/api/users/password', {}, 201);

  Ember.run(function() {
    visit('/password-reset/edit/?reset_password_token=123456a');
    andThen(function() {
      assert.equal(currentURL(), '/password-reset/edit/?reset_password_token=123456a');
      fillIn('form[name="password-reset-form"] input[type="password"]:first', '12345678');
      fillIn('form[name="password-reset-form"] input[type="password"]:last', '12345678');
    });

    Ember.run(function() {
      click('form[name="password-reset-form"] button[type="submit"]');
    });

    andThen(_ => {
      assert.equal(currentRouteName(), 'password-reset.reset-success');
    });
  });
});
