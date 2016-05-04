import { moduleForModel, test } from 'ember-qunit';
import startMirage from '../../helpers/setup-mirage-for-integration';

moduleForModel('housing-request', 'Unit | Serializer | housing request', {
  // Specify the other units that are required for this test.
  needs: ['serializer:housing-request'],
  beforeEach() {
    startMirage(this.container);
  },
  afterEach() {
    window.server.shutdown();
  }
});

// Replace this with your real tests.
test('it converts requested to an array', function(assert) {
  let record = server.create('housing-request');
  record.set('requested1', 'one');

  let serializedRecord = record.serialize();

  debugger;

  assert.ok(serializedRecord);
});
