import { moduleFor, test } from 'ember-qunit';

moduleFor('service:price-calculator', 'Unit | Service | price calculator', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it calculates for 155', function(assert) {
  let service = this.subject();
  let valueObject = service.calculateForSubTotal(155);

  assert.equal(valueObject.feesPaidByEvent, false);
  assert.equal(valueObject.subTotal, 155);
  assert.equal(valueObject.cardFee, 4.97);
  assert.equal(valueObject.applicationFee, 1.21);
  assert.equal(valueObject.totalFee, 6.18);
  assert.equal(valueObject.total, 161.18);
  assert.equal(valueObject.buyerPays, 161.18);
  assert.equal(valueObject.receivedByEvent, 155);

});

test('it calculates for 0', function(assert) {
  let service = this.subject();
  let valueObject = service.calculateForSubTotal(0);

  assert.equal(valueObject.feesPaidByEvent, false);
  assert.equal(valueObject.subTotal, 0);
  assert.equal(valueObject.cardFee, 0);
  assert.equal(valueObject.applicationFee, 0);
  assert.equal(valueObject.totalFee, 0);
  assert.equal(valueObject.total, 0);
  assert.equal(valueObject.buyerPays, 0);
  assert.equal(valueObject.receivedByEvent, 0);
});

test('it calculates for 75 with fee absorbing', function(assert) {
  let service = this.subject();
  let valueObject = service.calculateForSubTotal(75, true);

  assert.equal(valueObject.feesPaidByEvent, true);
  assert.equal(valueObject.subTotal, 75);
  assert.equal(valueObject.cardFee, 2.48);
  assert.equal(valueObject.applicationFee, 0.56);
  assert.equal(valueObject.totalFee, 3.04);
  assert.equal(valueObject.total, 75);
  assert.equal(valueObject.buyerPays, 75);
  assert.equal(valueObject.receivedByEvent, 71.96);
});
