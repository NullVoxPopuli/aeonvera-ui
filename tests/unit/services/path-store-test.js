import { moduleFor, test } from 'ember-qunit';

moduleFor('service:path-store', 'Unit | Service | path store', {
  // Specify the other units that are required for this test.
  needs: ['service:local-settings']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
