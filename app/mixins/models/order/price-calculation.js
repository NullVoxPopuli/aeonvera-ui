import Ember from 'ember';

const { computed, inject } = Ember;

// Because calculating the total amount of an order is complicated,
// the logic for summing line items, and applying discounts
// has been extracted here.
//
// if discounts were ONLY dollar amounts off, you could simply
// just add everything together (assuming discounts had a
// negative value)
//
// but, because of percent discounts, and their binding to specific items,
// (rather than whole orders), there needs to be some logic that checks
// the line items for a discount's requirement, and applies the discount
// only to that.
export default Ember.Mixin.create({

  // handles fee adding / absorbing to the subtotal
  priceCalculator: inject.service(),
  orderCalculator: inject.service(),

  priceCalculation: computed('subTotal', 'shouldApplyFee', function() {
    let subTotal = this.get('subTotal');
    let shouldApplyFee = this.get('shouldApplyFee');
    let absorbTheFee = !shouldApplyFee;
    var value = this.get('priceCalculator').calculateForSubTotal(subTotal, absorbTheFee);
    return value;
  }),

  forceAbsorbFee: false,
  shouldApplyFee: computed('forceAbsorbFee', 'subTotal', 'host.makeAttendeesPayFees', 'paymentMethod', {
    get() {
      let forceAbsorbFee = this.get('forceAbsorbFee');
      if (forceAbsorbFee) return !forceAbsorbFee;

      let electronicPayment = (
        this.get('paymentMethod') === 'stripe' ||
        this.get('host.acceptOnlyElectronicPayments') || false
      );

      let result = (
        this.get('subTotal') > 0 &&
        this.get('host.makeAttendeesPayFees') &&
        electronicPayment);

      return result;
    }
  }),

  fee: computed('subTotal', function() {
    let calculation = this.get('priceCalculation');
    let stringFee = calculation.totalFee;
    return parseFloat(stringFee);
  }),

  /*
    Calculates raw total of all the order line items
     - before fees or anything
  */
  subTotal: computed('orderLineItems.@each.total', function() {
    let lineItems = this.get('orderLineItems');
    let subTotal = this.get('orderCalculator').calculateSubTotal(this);

    return subTotal;
  }),

  total: computed('subTotal', 'shouldApplyFee', function() {
    let calculation = this.get('priceCalculation');
    return calculation.total;
  }),

  hasNonZeroBalance: computed('total', function() {
    return parseFloat(this.get('total')) > 0;
  }),
});
