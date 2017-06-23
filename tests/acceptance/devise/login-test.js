import Ember from 'ember';
import { test } from 'qunit';
import testSelector from 'ember-test-selectors';

import 'aeonvera/tests/helpers/login';
import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /', function(assert) {
  visit('/');
  andThen(() => assert.equal(currentURL(), '/welcome'));

  click('.auth-link .login');
  andThen(() => {
    const selector = 'md-dialog h2';
    const element = find(selector);
    const text = element.first().text();

    assert.equal(text, 'Login');
  });
});

test('can login', function(assert) {
  login();
});

test('after logging in, the login button should be hidden', function(assert) {
  login();
  let button = find('.auth-link .login');

  assert.ok(Ember.isEmpty(button));
});
