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
  absorbFees: false,

  amount: computed('orderTotal', 'cashOrCheckAmount', {
    get() {
      const orderTotal = this.get('orderTotal');
      const enteredAmount = this.get('cashOrCheckAmount');

      const result = isPresent(enteredAmount) ? enteredAmount : orderTotal;

      return parseFloat(result);
    },

    set(key, value) {
      this.set('cashOrCheckAmount', value);
    }
  }),

  confirmText: computed('amount', {
    get() {
      const amount = this.get('amount');

      if (amount < 0) {
        return `You have given $${Math.abs(amount)}?`;
      }

      return `You have collected $${amount}?`;
    }
  }),

  modalName: computed('order', {
    get() {
      return `mark-paid-${this.get('order.id')}`;
    }
  }),

  actions: {
    setToOrderTotal() {
      this.set('cashOrCheckAmount', null);
    },

    absorbFeesClick() {
      this.set('absorbFees', !this.get('absorbFees'));
      this.get('order').set('forceAbsorbFee', this.get('absorbFees'));
    },

    markPaid() {
      const id = this.get('order.id');
      const url = '/api/orders/' + id + '/mark_paid?include=registration';
      const data = {
        payment_method: this.get('paymentMethod'),
        check_number: this.get('checkNumber'),
        amount: this.get('amount'),
        notes: this.get('notes')
      };

      this.get('ajax').PUT(url, data).then(data => {
        this.get('store').pushPayload(data);
        this.sendAction('afterPayment');
        this.get('flashMessages').success('Order was successfully marked as paid.');
        Ember.$('.close-reveal-modal').click();
      }, error => {
        const json = JSON.parse(error.responseText);
        const errors = json.errors;

        this.get('flashMessages').alert(errors);
      });
    },

    processStripeToken(params) {
      const token = params.id;
      const order = this.get('order');

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
