import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'aeonvera/tests/helpers/start-app';
import 'aeonvera/tests/helpers/logout';

import {
  currentSession,
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | requires-login | dashboard', {
  beforeEach() {
    server.get('/api/upcoming_events', (schema, request) => {
      return { data: [] };
    });
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

  andThen(() => {
    logout();
  });
  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});
