import { moduleForModel, test, skip } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

// setResolver(Ember.DefaultResolver.create({ namespace: 'aeonvera' }))

moduleForModel('order', 'Unit | Model | order', {
  // Specify the other units that are required for this test.
  needs: [
    'model:host',
    'model:organization',
    'model:event',
    'model:lesson',
    'model:discount',
    'model:package',
    'model:restraint',
    'model:order-line-item',
    'model:membership-option',
    'model:membership-discount',
    'model:membership-renewal',
    'model:purchasable',
    'model:user',
    'service:priceCalculator'
  ],
  beforeEach: function() {
    manualSetup(this.container);
  }
});

test('hasLineItems | counts', function(assert) {
  let orderLineItem = make('order-line-item');
  let order = make('order', {
    orderLineItems: [orderLineItem]
  });

  let result = order.get('hasLineItems');

  assert.ok(result);
});
