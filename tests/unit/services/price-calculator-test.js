import { moduleFor, test } from 'ember-qunit';
import { withChai } from 'ember-cli-chai/qunit';


moduleFor('service:price-calculator', 'Unit | Service | price calculator', {
  unit: true
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it calculates for 155', withChai(function(expect, assert) {
  let service = this.subject();
  let valueObject = service.calculateForSubTotal(155);

  expect(valueObject.feesPaidByEvent).to.equal(false);
  expect(valueObject.subTotal).to.equal('155.00');
  expect(valueObject.cardFee).to.equal('4.97');
  expect(valueObject.applicationFee).to.equal('1.21');
  expect(valueObject.totalFee).to.equal('6.18');
  expect(valueObject.total).to.equal('161.18');
  expect(valueObject.buyerPays).to.equal('161.18');
  expect(valueObject.receivedByEvent).to.equal('155.00');

}));

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
