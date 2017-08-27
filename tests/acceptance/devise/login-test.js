import Ember from 'ember';
import { test } from 'ember-qunit';
import testSelector from 'ember-test-selectors';
import { withChai } from 'ember-cli-chai/qunit';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    server.create('user', {
      email: 'test@test.test',
      password: 'some-password'
    });

    server.post('/api/users/sign_in',
      (schema, request) => {
        return schema.users.findBy({ email: request.params.email });
      }
    );

    server.get('/api/upcoming_events',
      (schema, request) => ({ data: [] })
    );

    server.logging = true;
  }
});


test('visiting /', withChai(expect => {
  visit('/');
  andThen(() => {
    expect(currentURL())
      .to.equal('/welcome');

    expect(currentSession().get('isAuthenticated'))
      .to.equal(false);
  });

}));

test('ensure that ember-simple-auth authenticates', withChai(expect => {
  authenticateSession({ email: 'test@test.test', token: '123abc' });

  andThen(() => {
    const session = currentSession();

    expect(session.get('data.authenticated.token')).to.equal('123abc');
  });
}));

test('after logging in, the login button should be hidden', withChai(expect => {
  authenticateSession({ email: 'test@test.test', token: '123abc' });

  andThen(() => {
    let buttonText = find('button').text();

    expect(buttonText)
      .to.not.include('Login');
  });
}));

test('can login via route', withChai(async expect => {
  let auth = currentSession().get('isAuthenticated');

  expect(auth)
    .to.equal(false);

  await visit('/login');

  fillIn('input[type="email"]', 'test@test.test');
  fillIn('input[type="password"]', 'some-password');

  await click('button[type="submit"]');

  auth = currentSession().get('isAuthenticated');

  expect(auth)
    .to.equal(true);
}));

test('after logging in, the user is redirected to the dashboard', withChai(async expect => {
  visit('/login');

  fillIn('input[type="email"]', 'test@test.test');
  fillIn('input[type="password"]', 'some-password');

  await click('button[type="submit"]');

  expect(currentURL()).to.equal('/');
  expect(currentRouteName()).to.equal('dashboard.index');
}));

test('after logging in, the user is redirected back to the previous screen', withChai(async expect => {
  visit('/welcome/features');

  await click(testSelector('app-nav-login-button'));

  fillIn('input[type="email"]', 'test@test.test');
  fillIn('input[type="password"]', 'some-password');

  await click('button[type="submit"]');

  expect(currentURL()).to.equal('/welcome/features');

}));
