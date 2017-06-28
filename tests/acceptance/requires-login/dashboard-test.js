import Ember from 'ember';
import { module, test } from 'qunit';
import 'aeonvera/tests/helpers/logout';

import {
  currentSession,
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';


import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

import startApp from 'aeonvera/tests/helpers/start-app';
import destroyApp from 'aeonvera/tests/helpers/destroy-app';

let application;

moduleForAcceptance('Acceptance | requires-login | dashboard', {
  beforeEach() {
    application = startApp();
    server.logging = true;

    server.create('user', { id: 'current-user' });
    server.get('/api/upcoming_events', (schema, request) => ({ data: [] }));
  },

  afterEach() {
    destroyApp(application);
  }
});

test('I am redirected upon attempting to visit without being logged in', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});

test('Upon logging out, I am redirected', function(assert) {
  authenticateSession(application, { email: 'test@test.test', token: '123abc' });

  visit('/');

  andThen(() => assert.equal(currentRouteName(), 'dashboard.index'));

  andThen(() => {
    logout(application);
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});
