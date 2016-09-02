import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Ember.Component.extend({
  ajax: Ember.inject.service('authenticated-ajax'),

  // passed in
  order: null,
  showOrder: false,

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

      let result = isPresent(enteredAmount) ? enteredAmount : orderTotal;
      return parseFloat(result);
    },

    set(key, value) {
      this.set('cashOrCheckAmount', value);
    }
  }),

  confirmText: computed('amount', {
    get() {
      let amount = this.get('amount');

      if (amount < 0) {
        return `You have given $${Math.abs(amount)}?`;
      }

      return `You have collected $${amount}?`;
    }
  }),

  modalName: computed('order', {
    get() { return `mark-paid-${this.get('order.id')}`; }
  }),

  actions: {
    setToOrderTotal() {
      this.set('cashOrCheckAmount', null);
    },

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
    },

    processStripeToken(params) {
      let token = params.id;
      let order = this.get('order');

      order.set('checkoutToken', token);

      // by saving, the server is going to attempt to charge the card,
      //
      // if nothing has gone wrong with the payment
      // and an email will be sent to the registrant.
      //
      // if there are errors with the credit card,
      // the user must be notified
      order.asPromiseObject().then(order => {
        order.save().then(record => {
          this.sendAction('afterPayment');
          this.get('flashMessages').success('Order was successfully marked as paid.');
          Ember.$('.close-reveal-modal').click();
        }, error => {
          // model's error object is used.
          this.get('flashMessages').alert(error);
          this.set('showPaymentInProgress', false);
        });
      });
    }
  }
});
