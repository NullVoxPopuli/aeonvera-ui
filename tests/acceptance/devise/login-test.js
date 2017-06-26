import Ember from 'ember';
import { test } from 'ember-qunit';
import testSelector from 'ember-test-selectors';
import { withChai } from 'ember-cli-chai/qunit';

import 'aeonvera/tests/helpers/login';
import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    server.create('user', {
      email: 'test@test.test',
      password: 'some-password'
    });

    server.post('/api/users/sign_in', (schema, request) => {
      return schema.user.where({ email: request.params.email })[0];
    });

    server.get('/api/upcoming_events', (schema, request) => {
      return { data: [] };
    });

    server.logging = true;
  }
});

import {
  currentSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

test('visiting /', withChai(function(expect) {
  visit('/');
  andThen(() => {
    expect(currentURL())
      .to.equal('/welcome');

    expect(currentSession(this.application).get('isAuthenticated'))
      .to.equal(false);
  });

}));

test('can login', withChai(function(expect) {

  login();
  expect(true).to.equal(true);
}));

test('after logging in, the login button should be hidden', withChai(function(expect) {
  login();
  andThen(() => {
    let buttonText = find('button').text();

    expect(buttonText)
      .to.not.include('Login')
  });
}));
