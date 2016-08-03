import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

const { computed } = Ember;

export default Ember.Component.extend({
  // passed in
  order: null,

  // set in template via radio buttons
  paymentMethods: {
    // PAYPAL: "PayPal",
    CHECK: "Check",
    // CREDIT: "Credit",
    // DEBIT: "Debit",
    CASH: "Cash",
    STRIPE: "Stripe"
  },
  paymentMethod: 'Cash',
  cashOrCheckAmount: computed.oneWay('model.total'),
  checkNumber: '',

  modalName: computed('order', {
    get() { return `mark-paid-${this.get('order.id')}`; }
  }),

  actions: {
    markPaid() {

    }
  }
});
