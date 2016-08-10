import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  ajax: Ember.inject.service('authenticated-ajax'),

  // passed in
  order: null,

  // set in template via radio buttons
  paymentMethods: {
    // PAYPAL: "PayPal",
    CHECK: 'Check',

    // CREDIT: "Credit",
    // DEBIT: "Debit",
    CASH: 'Cash',
    STRIPE: 'Stripe'
  },
  paymentMethod: 'Cash',
  orderTotal: computed.alias('order.total'),
  cashOrCheckAmount: null,
  checkNumber: '',
  notes: '',
  amount: computed('orderTotal', 'cashOrCheckAmount', {
    get() {
      let orderTotal = this.get('orderTotal');
      let enteredAmount = this.get('cashOrCheckAmount');

      return enteredAmount || orderTotal;
    },

    set(key, value) {
      this.set('cashOrCheckAmount', value);
    }
  }),

  modalName: computed('order', {
    get() { return `mark-paid-${this.get('order.id')}`; }
  }),

  actions: {
    markPaid() {
      let id = this.get('order.id');
      let url = '/api/orders/' + id  + '/mark_paid';
      let data = {
        payment_method: this.get('paymentMethod'),
        check_number:   this.get('checkNumber'),
        amount:         this.get('amount'),
        notes:          this.get('notes')
      };

      this.get('ajax').PUT(url, data).then(data => {
        this.get('store').pushPayload(data);
        this.sendAction('afterPayment');
        this.get('flashMessages').success('Order was successfully marked as paid.');
        Ember.$('.close-reveal-modal').click();
      }, error => {
        let json = JSON.parse(error.responseText);
        let errors = json.errors;
        this.get('flashMessages').alert(errors);
      });
    }
  }
});
