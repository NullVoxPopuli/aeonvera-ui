import Ember from 'ember';
import { module, test } from 'qunit';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | requires-login | dashboard', {
  beforeEach() {
    server.logging = true;

    server.create('user', { id: 'current-user' });
    server.get('/api/upcoming_events', (schema, request) => ({ data: [] }));
  }
});

test('I am redirected upon attempting to visit without being logged in', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});

test('Upon logging out, I am redirected', function(assert) {
  authenticateSession({ email: 'test@test.test', token: '123abc' });

  visit('/');

  andThen(() => assert.equal(currentRouteName(), 'dashboard.index'));

  andThen(() => {
    logout();
  });

  andThen(() => {
    assert.equal(currentRouteName(), 'welcome.index');
  });
});
