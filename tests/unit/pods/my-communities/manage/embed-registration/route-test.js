import { moduleFor, test } from 'ember-qunit';

moduleFor('route:my-communities/manage/embed-registration', 'Unit | Route | my communities/manage/embed registration', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:router-scroll']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
