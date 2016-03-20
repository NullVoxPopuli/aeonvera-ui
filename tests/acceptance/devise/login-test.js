import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import 'aeonvera/tests/helpers/login';
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
  login();
});

test('after logging in, the login button should be hidden', function(assert){
  login();
  let button = find('.auth-link a.button.login');

  assert.ok(Ember.isEmpty(button));
});
