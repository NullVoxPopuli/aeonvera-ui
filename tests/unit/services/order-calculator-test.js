import { moduleFor, test } from 'ember-qunit';
import { manualSetup, make } from 'ember-data-factory-guy';

moduleFor('service:order-calculator', 'Unit | Service | order calculator', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
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
    'model:order',
    'model:user',
    'service:priceCalculator',
    'service:orderCalculator'
  ],
  beforeEach: function() {
    manualSetup(this.container);
  }
});

test('itemCorrespondingToDiscount | finds corresponding item', function(assert) {
  let discount = make('discount', {
    amount: 90,
    kind: 1, // percent
  });

  let pkg = make('package', {

  });

  let restraint = make('restraint', {
    restrictionFor: discount,
    restrictedTo: pkg
  });

  let packageLineItem = make('order-line-item', {
    price: 70,
    quantity: 1,
    lineItem: pkg
  });

  let discountLineItem = make('order-line-item', {
    lineItem: discount
  });

  let order = make('order', {
    orderLineItems: [packageLineItem, discountLineItem]
  });

  let service = this.subject();
  let item = service.itemCorrespondingToDiscount(order, [restraint]);
  assert.equal(item, packageLineItem);
});

test('itemCorrespondingToDiscount | does not find item', function(assert) {
  let discount = make('discount', {
    amount: 90,
    kind: 1, // percent
  });

  let pkg = make('package', {

  });

  let restraint = make('restraint', {
    restrictionFor: discount,
    restrictedTo: pkg
  });
  let packageLineItem = make('order-line-item', {
    price: 70,
    quantity: 1,
    lineItem: pkg
  });

  let discountLineItem = make('order-line-item', {
    lineItem: discount
  });

  let order = make('order', {
    orderLineItems: [discountLineItem]
  });

  let service = this.subject();
  let item = service.itemCorrespondingToDiscount(order, [restraint]);
  assert.equal(item, null);
});
