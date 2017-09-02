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
    'model:opening-tier',
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

//
// test('subTotal | it calculates', function(assert) {
//   let orderLineItem1 = make('order-line-item', {
//     price: 5,
//     quantity: 1
//   });
//   let orderLineItem2 = make('order-line-item', {
//     price: 12,
//     quantity: 1
//   });
//   let order = make('order', {
//     orderLineItems: [orderLineItem1, orderLineItem2]
//   });
//
//   let result = order.get('subTotal');
//   assert.equal(result, 17);
// });
//
// test('subTotal | it calculates with a percent discount tied to a package', function(assert) {
//   let discount = make('discount', {
//     amount: 90,
//     kind: 1, // percent
//   });
//
//   let pkg = make('package', {
//
//   });
//
//   let restraint = make('restraint', {
//     restrictionFor: discount,
//     restrictedTo: pkg
//   });
//   let packageLineItem = make('order-line-item', {
//     price: 70,
//     quantity: 1,
//     lineItem: pkg
//   });
//
//   let discountLineItem = make('order-line-item', {
//     lineItem: discount
//   });
//
//   let order = make('order', {
//     orderLineItems: [packageLineItem, discountLineItem]
//   });
//
//   let result = order.get('subTotal');
//   assert.equal(result, 7);
// });

test('fee | it calculates', function(assert) {
  let orderLineItem1 = make('order-line-item', { price: 5, quantity: 1 });
  let order = make('order', {
    subTotal: 5,
    isFeeAbsorbed: false,
    orderLineItems: [orderLineItem1]
  });

  let result = order.get('fee');
  let expected = (5 * (0.029 + 0.0075) + 0.30).toFixed(2);
  assert.equal(result, expected);
});

test('shouldApplyFee | subTotal is 0', function(assert) {
  let order = make('order', { isFeeAbsorbed: false });
  let result = order.get('shouldApplyFee');
  assert.equal(result, false);
});

test('shouldApplyFee | host.makeAttendeesPayFees', function(assert) {
  let orderLineItem1 = make('order-line-item', { price: 5, quantity: 1 });
  let host = make('organization', { makeAttendeesPayFees: true });
  let order = make('order', {
    subTotal: 5,
    isFeeAbsorbed: false,
    paymentMethod: 'stripe',
    orderLineItems: [orderLineItem1],
    host: host
  });

  let result = order.get('shouldApplyFee');
  assert.equal(result, true);
});

test('shouldApplyFee | is not stripe payment method', function(assert) {
  let orderLineItem1 = make('order-line-item', { price: 5, quantity: 1});
  let host = make('event', { makeAttendeesPayFees: true, acceptOnlyElectronicPayments: false });
  let order = make('order', {
    subTotal: 5,
    isFeeAbsorbed: false,
    paymentMethod: 'cash',
    orderLineItems: [orderLineItem1],
    host: host
  });

  let result = order.get('shouldApplyFee');
  assert.equal(result, false);
});

test('shouldApplyFee | only electronicPayments', function(assert) {
  let orderLineItem1 = make('order-line-item', { price: 5, quantity: 1 });
  let host = make('organization', { makeAttendeesPayFees: true, acceptOnlyElectronicPayments: true });
  let order = make('order', {
    subTotal: 5,
    isFeeAbsorbed: false,
    paymentMethod: 'cash',
    orderLineItems: [orderLineItem1],
    host: host
  });

  let result = order.get('shouldApplyFee');
  assert.equal(result, true);
});

// skipped, because total calculation moved to the backend
// test('total | it calculates', function(assert) {
//   let orderLineItem1 = make('order-line-item', { price: 5, quantity: 1 });
//   let host = make('organization', { makeAttendeesPayFees: true });
//   let order = make('order', {
//     subTotal: 5,
//     isFeeAbsorbed: false,
//     paymentMethod: 'stripe',
//     orderLineItems: [orderLineItem1],
//     host: host
//   });
//
//   let result = order.get('total');
//   assert.equal(result, 5.50);
// });
