import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),
  email: Ember.computed.oneWay('cart.userEmail'),
  showPaymentInProgress: false,

  statementDescription: Ember.computed('model.host', function() {
    let hostName = this.get('model.host.name');
    if (hostName.length > 15) {
      return hostName.substring(0, 15);
    }

    return hostName;
  }),

  /*
    for unauthenticated orders
  */
  _setOrderTokenIfPresent(order) {
    let token = this.get('token');
    if (Ember.isPresent(token)) {
      order.set('paymentToken', this.get('token'));
    }
  },

  actions: {
    finishedOrder() {
      this.get('router').transitionTo('register.checkout.thankyou');
    },

    /*
      the params here is the response from the stripe-checkout script.
      We'll want to add this in to the order before, and show some sort of visual
      feedback for processing, as this data only enables us to charge the card.
      The server will do the actual charging of the card.

      The only data we need from the stripe checkout object is the 'id'

      NOTE: The order should already be saved before entering this method.
    */
    processStripeToken(params) {
      let token = params.id;
      let order = this.get('model');

      order.set('checkoutToken', token);
      this._setOrderTokenIfPresent(order);
      this.set('showPaymentInProgress', true);

      // by saving, the server is going to attempt to charge the card,
      //
      // if nothing has gone wrong with the payment
      // and an email will be sent to the registrant.
      //
      // if there are errors with the credit card,
      // the user must be notified
      order.save().then(record => {
        this.set('showPaymentInProgress', false);
        this.get('router').transitionTo('register.checkout.thankyou');
      }, error => {
        // model's error object is used.
        this.get('flashMessages').alert(error);
        this.set('showPaymentInProgress', false);
      });
    },

  }
});
