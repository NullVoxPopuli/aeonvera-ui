import { asHash } from 'aeonvera/helpers/as-hash';
import { module, test } from 'qunit';
import _ from 'lodash';

module('Unit | Helper | as hash');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = asHash({}, { a: 1, b: 2 });
  assert.ok(_.isEqual(result, { a: 1, b: 2 }));
});
