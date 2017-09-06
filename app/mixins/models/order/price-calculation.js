import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { not, gt } from 'ember-decorators/object/computed';

const { inject } = Ember;

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
  // orderCalculator: inject.service(),

  allowNegative: false,
  @computed('unconfirmedSubTotal', 'shouldApplyFee')
  priceCalculation(subTotal, shouldApplyFee) {
    const absorbTheFee = !shouldApplyFee;
    const allowNegative = this.get('allowNegative');
    const priceCalculator = this.get('priceCalculator');
    const value = priceCalculator.calculateForSubTotal(subTotal, absorbTheFee, allowNegative);

    return value;
  },

  forceAbsorbFee: false,
  @computed('forceAbsorbFee', 'subTotal', 'isFeeAbsorbed', 'paymentMethod')
  shouldApplyFee(forceAbsorbFee, subTotal, isFeeAbsorbed, paymentMethod) {
    if (isFeeAbsorbed) return false;

    if (forceAbsorbFee) { return !forceAbsorbFee; }

    const electronicPayment = (
      paymentMethod === 'stripe' ||
      this.get('host.acceptOnlyElectronicPayments') || false
    );

    const result = (
      subTotal > 0 &&
      !isFeeAbsorbed &&
      electronicPayment
    );

    return result;
  },

  @computed('subTotal')
  fee(subTotal) {
    const calculation = this.get('priceCalculation');
    const stringFee = calculation.totalFee;

    return parseFloat(stringFee);
  },

  /*
    Calculates raw total of all the order line items
     - before fees or anything
  */
  // @computed('orderLineItems.@each.total')
  // subTotal() {
  //   const lineItems = this.get('orderLineItems');
  //   const subTotal = this.get('orderCalculator').calculateSubTotal(this);
  //
  //   return subTotal;
  // },

  // @computed('subTotal', 'shouldApplyFee')
  // total(subTotal, shouldApplyFee) {
  //   const calculation = this.get('priceCalculation');
  //
  //   return calculation.total;
  // },

  @computed('total')
  hasNonZeroBalance(total) {
    return parseFloat(total) > 0;
  },

  @not('hasNonZeroBalance') hasZeroBalance: null
});
