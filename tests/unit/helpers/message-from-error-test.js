
import { messageFromError } from 'aeonvera/helpers/message-from-error';
import { module, test } from 'qunit';

module('Unit | Helper | message from error');

// Replace this with your real tests.
test('maps JSONAPI errors', function(assert) {
  let result = messageFromError({ errors: [
    {
      status: '422',
      source: { pointer: '/data/attributes/first-name' },
      title: 'Invalid Attribute',
      detail: 'First name must contain at least three characters.'
    }
  ] });

  assert.ok('422 First name must contain at least three characters.');
});
