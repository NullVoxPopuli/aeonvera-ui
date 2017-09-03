import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

moduleForModel('housing-request', 'Unit | Serializer | housing request', {
  // Specify the other units that are required for this test.
  needs: [
    'model:event',
    'model:host',
    'model:registration',
    'model:housing-provision',
    'model:opening-tier',
    'serializer:housing-request'
  ],
  beforeEach: function() {
    manualSetup(this.container);
    this.inject.service('store');
  }
});

// Replace this with your real tests.
test('it converts requested to an array', function(assert) {
  Ember.run(() => {
    let event = make('event');
    let record = make('housing-request', {
      host: event
    });

    record.set('requested1', 'one');

    let serializedRecord = record.serialize();
    let requested = serializedRecord.data.attributes['requested-roommates'];
    let expected = ['one', undefined, undefined, undefined];

    assert.deepEqual(requested, expected);
  });
});

test('it converts unwanted to an array', function(assert) {
  Ember.run(() => {
    let event = make('event');
    let record = make('housing-request', {
      host: event
    });

    record.set('unwanted1', 'one');

    let serializedRecord = record.serialize();
    let unwanted = serializedRecord.data.attributes['unwanted-roommates'];
    let expected = ['one', undefined, undefined, undefined];

    assert.deepEqual(unwanted, expected);
  });
});
