import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  cart: inject.service('order-cart'),
  store: inject.service(),

  event: computed.alias('model'),
  absorbFees: true,

  actions: {
    addToOrder(item) {
      const cart = this.get('cart');

      // TODO: doesn't need to be set every time - just once
      cart.set('host', this.get('event'));

      cart.add(item);
    },

    absorbFeesClick(value) {
      this.get('cart.currentOrder').set('forceAbsorbFee', value);
    },

    openPaymentModal(order) {
      Ember.$('.hidden-mark-paid-container a').click();
    },

    clearOrder() {
      const cart = this.get('cart');

      cart.get('currentOrder').unloadRecord();
      cart.set('order', null);
    }
  }
});
