import Ember from 'ember';
import { test } from 'ember-qunit';
import testSelector from 'ember-test-selectors';
import { withChai } from 'ember-cli-chai/qunit';

import {
  currentSession,
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

import startApp from 'aeonvera/tests/helpers/start-app';
import destroyApp from 'aeonvera/tests/helpers/destroy-app';

let application;

moduleForAcceptance('Acceptance | login', {
  beforeEach() {
    application = startApp();

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
  },

  afterEach() {
    destroyApp(application);
  }
});


test('visiting /', withChai(expect => {
  visit('/');
  andThen(() => {
    expect(currentURL())
      .to.equal('/welcome');

    expect(currentSession(application).get('isAuthenticated'))
      .to.equal(false);
  });

}));

test('ensure that ember-simple-auth authenticates', withChai(expect => {
  authenticateSession(application, { email: 'test@test.test', token: '123abc' });

  andThen(() => {
    const session = currentSession(application);

    expect(session.get('data.authenticated.token')).to.equal('123abc');
  });
}));

test('after logging in, the login button should be hidden', withChai(expect => {
  authenticateSession(application, { email: 'test@test.test', token: '123abc' });

  andThen(() => {
    let buttonText = find('button').text();

    expect(buttonText)
      .to.not.include('Login');
  });
}));

test('can login via route', withChai(expect => {
  let auth = currentSession(application).get('isAuthenticated');

  expect(auth)
    .to.equal(false);

  visit('/login');

  fillIn('input[type="text"]', 'test@test.test');
  fillIn('input[type="password"]', 'some-password');

  click('button[type="submit"]');

  andThen(() => {
    let auth = currentSession(application).get('isAuthenticated');

    expect(auth)
      .to.equal(true);
  });
}));

test('after logging in, the user is redirected to the dashboard', withChai(expect => {
  visit('/login');

  fillIn('input[type="text"]', 'test@test.test');
  fillIn('input[type="password"]', 'some-password');

  click('button[type="submit"]');

  andThen(() => {
    expect(currentURL()).to.equal('/');
    expect(currentRouteName()).to.equal('dashboard.index');
  });
}));

test('after logging in, the user is redirected back to the previous screen', withChai(expect => {
  visit('/welcome/features');

  click(testSelector('app-nav-login-button'));

  andThen(() => {
    fillIn('input[type="text"]', 'test@test.test');
    fillIn('input[type="password"]', 'some-password');

    click('button[type="submit"]');

    andThen(() => {
      expect(currentURL()).to.equal('/welcome/features');
    });
  });

}));
