import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),

  actions: {

    processStripeToken(params) {
      this.get('cart').processStripeToken(params);
    },

    finishedOrder: function() {
      Ember.$('.close-reveal-modal').click();
      this.get('flashMessages').success(
        'Order was successfully created and recorded'
      );
    },

  }
});
