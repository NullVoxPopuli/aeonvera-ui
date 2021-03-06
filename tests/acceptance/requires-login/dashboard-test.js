import Ember from 'ember';
import { module, test } from 'qunit';

import {
  mockFindAll, mockQuery
} from 'ember-data-factory-guy';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | requires-login | dashboard', {
  beforeEach() {
    server.logging = true;

    server.create('user', { id: 'current-user' });

    mockQuery('event-summary').returns({ models: [] });
    mockFindAll('upcoming-event').returns({ models: [] });
  }
});

test('I am redirected upon attempting to visit without being logged in', async function(assert) {
  await visit('/');

  assert.equal(currentRouteName(), 'welcome.index');
});

test('Upon logging out, I am redirected', async function(assert) {
  authenticateSession({ email: 'test@test.test', token: '123abc' });

  await visit('/dashboard');

  assert.equal(currentRouteName(), 'dashboard.index');

  await logout();

  assert.equal(currentRouteName(), 'welcome.index');
});
