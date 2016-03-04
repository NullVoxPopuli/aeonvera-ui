import {
  moduleForModel, test
}
from 'ember-qunit';

import { manualSetup, make } from 'ember-data-factory-guy';


moduleForModel('order', 'Unit | Model | order', {
  // Specify the other units that are required for this test.
  needs: [],
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


test('subTotal | it calculates', function(assert) {
  let orderLineItem1 = make('order-line-item', {
    price: 5,
    quantity: 1
  });
  let orderLineItem2 = make('order-line-item', {
    price: 12,
    quantity: 1
  });
  let order = make('order', {
    orderLineItems: [orderLineItem1, orderLineItem2]
  });

  let result = order.get('subTotal');
  assert.equal(result, 17);
});

test('addLineItem | adds an orderLineItem', function(assert) {
  let order = make('order');
  let lesson = make('lesson');

  order.addLineItem(lesson);

  let result = order.get('orderLineItems.length');
  assert.equal(result, 1);
});

test('addLineItem | adding again does not add a new orderLineItem', function(
  assert) {
  let order = make('order');
  let lesson = make('lesson');

  order.addLineItem(lesson);
  order.addLineItem(lesson);

  let result = order.get('orderLineItems.length');
  assert.equal(result, 1);
});

test('addLineItem | adding two kinds of items adds two orderLineItems',
  function(assert) {
    let order = make('order');
    let lesson = make('lesson');
    let lesson2 = make('lesson');

    order.addLineItem(lesson);
    order.addLineItem(lesson2);

    let result = order.get('orderLineItems.length');
    assert.equal(result, 2);
  });

test('addLineItem | adding with negative quantity removes the orderLineItem',
  function(assert) {
    let order = make('order');
    let lesson = make('lesson');

    order.addLineItem(lesson);
    order.addLineItem(lesson, 0);

    let result = order.get('orderLineItems.length');
    assert.equal(result, 0);
  });

test(
  'addLineItem | specifying quantity and price are passed on to the orderLineItem',
  function(assert) {
    let order = make('order');
    let lesson = make('lesson', {
      price: 1
    });

    order.addLineItem(lesson, 3, 3);

    let result = order.get('subTotal');
    assert.equal(result, 9);
  });

test('_eligibleForDiscount | false when no discounts available', function(
  assert) {
  let order = make('order');
  let result = order._eligibleForDiscount();

  assert.equal(result, false);
});

test('_eligibleForDiscount | true when membershipOption added', function(assert) {
  let membershipOption = make('membership-option');
  let organization = make('organization', {
    membershipOptions: [membershipOption]
  });
  let order = make('order', {
    host: organization
  });

  order.addLineItem(membershipOption);

  let result = order._eligibleForDiscount();

  assert.equal(result, true);
});
