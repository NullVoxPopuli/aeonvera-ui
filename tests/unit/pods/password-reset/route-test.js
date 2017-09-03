import { moduleFor, test } from 'ember-qunit';

moduleFor('route:password-reset', 'Unit | Route | password reset', {
  // Specify the other units that are required for this test.
  needs: [
    'service:session',
    'service:flash-messages',
    'service:router-scroll',
    'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
