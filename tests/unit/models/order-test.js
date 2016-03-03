import {
  moduleForModel, test
}
from 'ember-qunit';
import {
  make
}
from 'ember-data-factory-guy';


moduleForModel('order', 'Unit | Model | order', {
  // Specify the other units that are required for this test.
  needs: [],
});

test('it hasLineItems', function(assert) {
  let orderLineItem = make('order-line-item');
  let order = make('order', {
    orderLineItems: [orderLineItem]
  });

  let result = order.get('hasLineItems');
  assert.ok(result);
});
