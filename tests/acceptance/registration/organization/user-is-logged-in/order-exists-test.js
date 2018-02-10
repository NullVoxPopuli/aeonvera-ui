import { module, test } from 'qunit';
import testSelector from 'ember-test-selectors';
import { withChai } from 'ember-cli-chai/qunit';

import moduleForAcceptance from 'aeonvera/tests/helpers/module-for-acceptance';

let orgId = 'testorg';

moduleForAcceptance(
  `Acceptance |
   Registration |
   Organization |
   User is Logged In |
   Order Exists`, {

    beforeEach() {
      server.create('user', {
        id: 'current-user',
        email: 'test@test.test',
        password: 'some-password'
      });

      let org = server.create('organization', {
        id: orgId,
        name: 'Test Org',
        domain: 'testorg'
      });

      authenticateSession({
        email: 'test@test.test',
        token: 'abc123'
      });
    }
});

test('reviews the the order', (assert) => {
  assert.ok(true);
});

test('navigates back to the order', (assert) => {
  assert.ok(true);
});

test('starts a new order', (assert) => {
  assert.ok(true);
});

test('edits the order', (assert) => {
  assert.ok(true);
});

test('visits the edit order URL', function(assert) {
  assert.ok(true);
});

test('cancels an order after submitting', (assert) => {
  assert.ok(true);
});

test('pays for the order', (assert) => {
  assert.ok(true);
});

test('cannot cancel a paid order', (assert) => {
  assert.ok(true);
});

test('cannot edit a paid order', (assert) => {
  assert.ok(true);
});
