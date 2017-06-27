import Ember from 'ember';
import { module, test } from 'qunit';
import { withChai } from 'ember-cli-chai/qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import destroyApp from 'aeonvera/tests/helpers/destroy-app';

import testSelector from 'ember-test-selectors';

let application;

module('Acceptance | password-reset', {
  beforeEach() {
    application = startApp();
    Ember.testing = false;
  },

  afterEach() {
    destroyApp(application);
    server.shutdown();
  },
});

test('submitting the password for redirects to page saying you will get an email', function(assert) {
  const formSelector = testSelector('password-reset-request');

  server.post('/api/users/password', {}, 201);

  visit('/password-reset');
  fillIn(`${formSelector} input[type="email"]`, 'test@test.test');
  click(`${formSelector} button[type="submit"]`);

  andThen(_ => {
    assert.equal(currentRouteName(), 'password-reset.success');
  });
});

test('the email address must be specified', withChai(expect => {
  const formSelector = testSelector('password-reset-request');
  const errorsSelector = testSelector('form-errors');

  server.post('/api/users/password',
    {"errors":[{"source":{"pointer":"/data/attributes/email"},"detail":"can't be blank"}]},
    422);

  visit('/password-reset');
  fillIn(`${formSelector} input[type="email"]`, 'test@test.test');
  click(`${formSelector} button[type="submit"]`);

  andThen(_ => {
    expect(currentRouteName()).to.equal('password-reset.index');

    let text = find(formSelector).text();

    expect(text).to.include("email can't be blank");
  });
}));

test('setting new password fails without a token', withChai(expect => {
  const formSelector = testSelector('password-reset-new-password');
  const errorsSelector = testSelector('form-errors');

  server.put('/api/users/password',
    {"errors":[
      {
        "source":{
          "pointer":"/data/attributes/reset-password-token"
        },
        "detail":"can't be blank"
      }
    ]},
    422);


  visit('/password-reset/edit');

  andThen(() => expect(currentURL()).to.equal('/password-reset/edit'));

  fillIn(`${formSelector} input[type="password"]:first`, '12345678');
  fillIn(`${formSelector} input[type="password"]:first`, '12345678');
  click(`${formSelector} button[type="submit"]`);

  andThen(() => {
    expect(currentRouteName()).to.equal('password-reset.edit');

    const errors = `${formSelector} ${errorsSelector}`;
    const text = find(errors).text();

    expect(text).to.include("token can't be blank");
  });
}));

test('setting new password fails without a password', withChai(expect => {
  const formSelector = testSelector('password-reset-new-password');
  const errorsSelector = testSelector('form-errors');

  server.put('/api/users/password',
    {"errors":[
      {
        "source":{
          "pointer":"/data/attributes/password"
        },
        "detail":"can't be blank"
      }
    ]},
    422);

  visit('/password-reset/edit');
  andThen(() => expect(currentURL()).to.equal('/password-reset/edit'));

  fillIn(`${formSelector} input[type="password"]:first`, '12345678');
  fillIn(`${formSelector} input[type="password"]:first`, '12345678');
  click(`${formSelector} button[type="submit"]`);

  andThen(() => {
    expect(currentRouteName()).to.equal('password-reset.edit');

    const errors = `${formSelector} ${errorsSelector}`;
    const text = find(errors).text();

    expect(text).to.include('password can\'t be blank');
  });
}));

test('setting new password fails without a password', withChai(expect => {
  const formSelector = testSelector('password-reset-new-password');
  const errorsSelector = testSelector('form-errors');

  server.put('/api/users/password',
    {"errors":[
      {
        "source":{
          "pointer":"/data/attributes/password-confirmation"
        },
        "detail":"can't be blank"
      }
    ]},
    422);

  visit('/password-reset/edit');
  andThen(() => expect(currentURL()).to.equal('/password-reset/edit'));

  fillIn(`${formSelector} input[type="password"]:first`, '12345678');
  fillIn(`${formSelector} input[type="password"]:first`, '12345678');
  click(`${formSelector} button[type="submit"]`);

  andThen(() => {
    expect(currentRouteName()).to.equal('password-reset.edit');

    const errors = `${formSelector} ${errorsSelector}`;
    const text = find(errors).text();

    expect(text).to.include('confirmation can\'t be blank');
  });
}));

test('setting new password succeeds', function(assert) {
  const formSelector = testSelector('password-reset-new-password');

  server.put('/api/users/password', {}, 201);

  Ember.run(function() {
    visit('/password-reset/edit/?reset_password_token=123456a');

    andThen(function() {
      assert.equal(currentURL(), '/password-reset/edit/?reset_password_token=123456a');
      fillIn(`${formSelector} input[type="password"]:first`, '12345678');
      fillIn(`${formSelector} input[type="password"]:first`, '12345678');
    });

    Ember.run(function() {
      click(`${formSelector} button[type="submit"]`);
    });

    andThen(_ => {
      assert.equal(currentRouteName(), 'password-reset.reset-success');
    });
  });
});
