import { moduleForModel, test, skip } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';
// setResolver(Ember.DefaultResolver.create({ namespace: 'aeonvera' }))

moduleForModel('order', 'Unit | Model | order', {
  // Specify the other units that are required for this test.
  needs: [
    'model:host',
    'model:organization',
    'model:lesson',
    'model:order-line-item',
    'model:membership-option',
    'model:membership-discount',
    'model:membership-renewal',
    'model:purchasable',
    'model:user'
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

test('addLineItem | adding again does not add a new orderLineItem', function(assert) {
  let order = make('order');
  let lesson = make('lesson');

  order.addLineItem(lesson);
  order.addLineItem(lesson);

  let result = order.get('orderLineItems.length');
  assert.equal(result, 1);
});

test('addLineItem | adding two kinds of items adds two orderLineItems', function(assert) {
  let order = make('order');
  let lesson = make('lesson', {id: 1});
  let lesson2 = make('lesson', {id: 2});

  order.addLineItem(lesson);
  order.addLineItem(lesson2);

  let result = order.get('orderLineItems.length');
  assert.equal(result, 2);
});

test('addLineItem | adding with negative quantity removes the orderLineItem', function(assert) {
  let order = make('order');
  let lesson = make('lesson');

  order.addLineItem(lesson);
  order.addLineItem(lesson, 0);

  let result = order.get('orderLineItems.length');
  assert.equal(result, 0);
});

test('addLineItem | specifying quantity and price are passed on to the orderLineItem', function(assert) {
  let order = make('order');
  let lesson = make('lesson', {
    price: 1
  });

  order.addLineItem(lesson, 3, 3);

  let result = order.get('subTotal');
  assert.equal(result, 9);
});

test('addLineItem | members get no discount if no discount is configured', function(assert) {
  let user = make('user');

  // stub the method, as its functionality is tested in user-test
  user.isMemberOf = function(host) { return true; };

  let organization = make('organization');
  let order = make('order', {
    host: organization,
    user: user
  });
  let lesson = make('lesson');

  order.addLineItem(lesson);

  let result = order.get('orderLineItems.length');
  assert.equal(result, 1);
});

test('addLineItem | members could get an automatic discount when purchasing a lesson', function(assert) {
  let user = make('user');

  // stub the method, as its functionality is tested in user-test
  user.isMemberOf = function(host) { return true; };

  let membershipDiscount = make('membership-discount', {
    code: 'discount',
    appliesTo: 'Lesson'
  });
  let organization = make('organization', { membershipDiscounts: [membershipDiscount]});
  let order = make('order', { host: organization, user: user });
  let lesson = make('lesson', { name: 'lesson', id: 2, price: 1 });
  order.addLineItem(lesson);

  // sanity
  assert.equal(order._eligibleForDiscount(), true);
  let result = order.get('orderLineItems.length');
  assert.equal(result, 2);
});

// TODO: this id should really be the same.
// TODO: test when the discount and purchasable item has the same id
// test('addLineItem | members could get an automatic discount when purchasing a lesson when the lesson and discount have the same id', function(assert) {
//   let user = make('user');
//
//   // stub the method, as its functionality is tested in user-test
//   user.isMemberOf = function(host) { return true; };
//
//   let membershipDiscount = make('membership-discount', {
//     code: 'discount',
//     appliesTo: 'Lesson',
//     id: 1,
//     price: 1
//   });
//   let organization = make('organization', { membershipDiscounts: [membershipDiscount] });
//   let order = make('order', { host: organization, user: user });
//
//   let lesson = make('lesson', { name: 'lesson', id: 1, price: 1 });
//
//   order.addLineItem(lesson);
//
//   // sanity
//   assert.equal(order._eligibleForDiscount(), true);
//   let result = order.get('orderLineItems.length');
//   assert.equal(result, 2);
// });

test('_eligibleForDiscount | false when no discounts available', function(assert) {
  let order = make('order');
  let result = order._eligibleForDiscount();

  assert.equal(result, false);
});

test('_eligibleForDiscount | true when membershipOption added', function(assert) {
  let membershipOption = make('membership-option');
  let membershipDiscount = make('membership-discount');
  let organization = make('organization', {
    membershipOptions: [membershipOption],
    membershipDiscounts: [membershipDiscount]
  });
  let order = make('order', {
    host: organization
  });

  order.addLineItem(membershipOption);

  let result = order._eligibleForDiscount();
  assert.equal(result, true);
});

test('_eligibleForDiscount | true when user is already a member', function(assert) {
  let user = make('user', { id: 1 });

  // stub the method, as its functionality is tested in user-test
  user.isMemberOf = function(host) { return true; };

  let membershipDiscount = make('membership-discount');
  let organization = make('organization', {
    membershipDiscounts: [membershipDiscount]
  });

  let order = make('order', {
    host: organization,
    user: user
  });

  let result = order._eligibleForDiscount();
  assert.equal(result, true);
});

test('getOrderLineItemMatching | gets a single item', function(assert){
  let lesson = make('lesson', {name: 'lesson'});
  let order = make('order');
  order.addLineItem(lesson);
  let result = order.getOrderLineItemMatching(lesson);

  assert.equal(result.get('lineItem.name'), lesson.get('name'));
});

test('getOrderLineItemMatching | lineItem not found', function(assert){
  let order = make('order');
  let lesson = make('lesson');
  let result = order.getOrderLineItemMatching(lesson);

  assert.equal(result, null);
});

test('getOrderLineItemMatching | with two items, the correct is chosen', function(assert){
  let lesson = make('lesson', {name: 'lesson'});
  let lesson2 = make('lesson', {name: 'lesson2'});
  let order = make('order');
  order.addLineItem(lesson);
  order.addLineItem(lesson2);
  let result = order.getOrderLineItemMatching(lesson2);

  assert.equal(result.get('lineItem.name'), lesson2.get('name'));
});
