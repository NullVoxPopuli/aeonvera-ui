import { moduleFor, test } from 'ember-qunit';

moduleFor('route:events/show/collaboration', 'Unit | Route | events/show/collaboration', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:router-scroll',
    'service:flash-notification',
    'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
