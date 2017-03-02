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

  allowNegative: false,
  priceCalculation: computed('subTotal', 'shouldApplyFee', function() {
    const subTotal = this.get('subTotal');
    const shouldApplyFee = this.get('shouldApplyFee');
    const absorbTheFee = !shouldApplyFee;
    const allowNegative = this.get('allowNegative');
    const value = this.get('priceCalculator').calculateForSubTotal(subTotal, absorbTheFee, allowNegative);

    return value;
  }),

  forceAbsorbFee: false,
  shouldApplyFee: computed('forceAbsorbFee', 'subTotal', 'host.makeAttendeesPayFees', 'paymentMethod', {
    get() {
      const forceAbsorbFee = this.get('forceAbsorbFee');

      if (forceAbsorbFee) {
        return !forceAbsorbFee;
      }

      const electronicPayment = (
        this.get('paymentMethod') === 'stripe' ||
        this.get('host.acceptOnlyElectronicPayments') || false
      );

      const result = (
        this.get('subTotal') > 0 &&
        this.get('host.makeAttendeesPayFees') &&
        electronicPayment);

      return result;
    }
  }),

  fee: computed('subTotal', function() {
    const calculation = this.get('priceCalculation');
    const stringFee = calculation.totalFee;

    return parseFloat(stringFee);
  }),

  /*
    Calculates raw total of all the order line items
     - before fees or anything
  */
  subTotal: computed('orderLineItems.@each.total', function() {
    const lineItems = this.get('orderLineItems');
    const subTotal = this.get('orderCalculator').calculateSubTotal(this);

    return subTotal;
  }),

  total: computed('subTotal', 'shouldApplyFee', function() {
    const calculation = this.get('priceCalculation');

    return calculation.total;
  }),

  hasNonZeroBalance: computed('total', function() {
    return parseFloat(this.get('total')) > 0;
  })
});
