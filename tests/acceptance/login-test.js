import Ember from 'ember';
import {
  module, test
}
from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import Mirage from 'ember-cli-mirage';

let application;

module('Acceptance | login', {
  beforeEach() {
      application = startApp();

    },

    afterEach() {
      Ember.run(application, 'destroy');
    },
});

test('visiting /', function(assert) {
  visit('/');
  andThen(() => assert.equal(currentURL(), '/welcome'));

  click('.auth-link a.button.login');
  andThen(() => {
    let text = find(
      '.reveal-modal[data-name="login-modal"] h2').first().text();
    assert.equal(text, 'Login');
  });
});

test('can login', function(assert) {
  server.create('user');

  let session = application.__container__.lookup('service:session');
  let auth = session.get('isAuthenticated');
  assert.equal(auth, false);

  visit('/');
  click('.auth-link a.button.login');
  let loginModalSelector = '.reveal-modal[data-name="login-modal"]';
  andThen(() => {
    let text = find(
      loginModalSelector + ' h2').first().text();
    assert.equal(text, 'Login');
  });

  fillIn(loginModalSelector + ' input[type="text"]', 'test@test.test');
  fillIn(loginModalSelector + ' input[type="password"]', 'some-password');

  click(loginModalSelector + ' button[type="submit"]');

  andThen(() => {
    // debugger;
    // TODO: WHAT IS G OING ON WITH THIS
    // let message = find('body').text();
    // let expectedMessage = 'You have successfully logged in';
    // assert.equal(message, expectedMessage);

    let session = application.__container__.lookup('service:session');
    let auth = session.get('isAuthenticated');
    assert.equal(auth, true);
  });
});
