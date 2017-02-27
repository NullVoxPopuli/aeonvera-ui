import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  cart: Ember.inject.service('order-cart'),
  discountService: Ember.inject.service('order-apply-discount'),
  email: Ember.computed.oneWay('cart.userEmail'),

  // Set when in the process of paying / waiting on stripe.
  // This triggers an overlay that prevents the user from
  // clicking anything.
  showPaymentInProgress: false,

  // set by discount field
  discountCode: '',

  // set by failure to apply discount
  discountApplicationErrors: null,

  statementDescription: Ember.computed('model.host', function() {
    const hostName = this.get('model.host.name');

    if (hostName.length > 15) {
      return hostName.substring(0, 15);
    }

    return hostName;
  }),

  canAddDiscount: Ember.computed('model', 'model.orderLineItems.@each', function() {
    const hostAllowsDiscounts = this.get('model.host.allowDiscounts');
    const hostAllowsMultipleDiscounts = this.get('model.host.allowCombinedDiscounts');
    const alreadyHasDiscount = this.get('model').hasDiscount();

    return (
      hostAllowsDiscounts && (!alreadyHasDiscount || hostAllowsMultipleDiscounts)
    );
  }),

  willRender() {
    this._super(...arguments);
    this.get('cart').set('order', this.get('model'));
  },

  /*
    for unauthenticated orders
  */
  _setOrderTokenIfPresent(order) {
    const token = this.get('token');

    if (Ember.isPresent(token)) {
      order.set('paymentToken', this.get('token'));
    }
  },

  actions: {
    finishedOrder() {
      this.get('router').transitionTo('register.checkout.thankyou');
    },

    applyDiscount() {
      const discountCode = this.get('discountCode');
      const discountService = this.get('discountService');
      const store = this.get('store');
      const order = this.get('model');
      const host = order.get('host');
      const cart = this.get('cart');

      discountService.lookupDiscount(host, discountCode).then(discounts => {

        // only take the first object
        const allLoadedDiscounts = this.get('store').peekAll('discount');
        const filteredDiscounts = Ember.A();

        allLoadedDiscounts.forEach(discount => {
          if (discount.get('code') === discountCode) {
            filteredDiscounts.pushObject(discount);
          }
        });

        const discount = filteredDiscounts.get('firstObject');

        if (filteredDiscounts.get('length') > 1) {
          this.set('discountApplicationErrors', ['code does not exist']);
        } else if (Ember.isPresent(discount)) {
          cart.add(discount);

          cart._saveOrderLineItems().then(() => {
            // Ember.run.later(() => {
            //   // a run later in a then?
            //   // this is weird.
            //   // but it somehome provides enough time for
            //   // the order to actually return the correct
            //   // amountInCents :-/
            //   cart.get('order').reload();
            // });
          });
          this.set('discountCode', '');
        } else {
          this.set('discountApplicationErrors', ['discount not found']);
        }
      }, error => {
        this.set('discountApplicationErrors', error);
      });
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
      const token = params.id;
      const order = this.get('model');

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
    }

  }
});
