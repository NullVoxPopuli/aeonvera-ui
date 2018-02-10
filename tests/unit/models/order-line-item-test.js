import { run } from '@ember/runloop';
import { moduleForModel, test, skip } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

// setResolver(Ember.DefaultResolver.create({ namespace: 'aeonvera' }))

moduleForModel('order-line-item', 'Unit | Model | order-line-item', {
  // Specify the other units that are required for this test.
  needs: [
    'model:purchasable',
    'model:lesson',
    'model:shirt',
    'model:order-line-item'
  ],
  beforeEach: function() {
    manualSetup(this.container);
    this.inject.service('store');
  }
});

test('total | multiplies quantity by price', function(assert) {
  let orderLineItem = make('order-line-item', {
    price: 5,
    quantity: 3
  });

  let result = orderLineItem.get('total');
  assert.equal(result, 15);
});

test('priceNeedsChanging | price is updated if a size is changed', function(assert) {
  run(() => {

    let shirt = make('shirt');
    shirt.priceForSize = function(a) {
      return 5;
    };

    let orderLineItem = make('order-line-item', {
      price: 10,
      quantity: 2,
      size: 'M'
    });
    orderLineItem.lineItem = shirt;

    let price = orderLineItem.get('total');
    assert.equal(price, 20);
    orderLineItem.set('size', 'S');
    price = orderLineItem.get('total');
    assert.equal(price, 10);
  });
});
