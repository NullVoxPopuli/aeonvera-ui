
import Ember from 'ember';
import { module, test, skip } from 'qunit';

import {
  authenticateSession
} from 'aeonvera/tests/helpers/ember-simple-auth';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

let orgId = 'testorg';

moduleForAcceptance(
  `Acceptance |
   Registration |
   Organization |
   User is Logged In |
   New Registration`, {

  beforeEach() {
    let org = server.create('organization', {
      id: orgId,
      name: 'Test Org',
      domain: 'testorg'
    });

    authenticateSession(this.application, {
      email: 'test@test.test',
    });
  }
});

test('can view the registration page', (assert) => {
  visit('/testorg');
  andThen(() => assert.equal(currentURL(), '/testorg'));
});

skip('can view the name of the org', assert => {
  visit('/testorg');
  andThen(() => {
    let h2s = find('h2');
    assert.ok(h2s.text().includes('Register for Test Org'));
  });
});

test('does not show the name and email fields', (assert) => {
  visit('/testorg');
  andThen(() => {
    let labels = find('.row .columns.medium-4 label');
    assert.notOk(labels.text().includes('Name'));
    assert.notOk(labels.text().includes('Email'));
  });
});

test('shows the membership options', (assert) => {
  assert.ok(true);
});

test('does not show membership options if there are none', (assert) => {
  assert.ok(true);
});

test('creates an order', (assert) => {
  assert.ok(true);
});

test('cancels an order before submitting', (assert) => {
  assert.ok(true);
});

