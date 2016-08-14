import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  cart: inject.service('order-cart'),
  store: inject.service(),

  event: computed.alias('model'),

  // for building user/attendance for the order
  attendance: computed({
    get() {
      return this.get('store').createRecord('event-attendance');
    }
  }),

  init() {
    this._super(...arguments);
    let cart = this.get('cart');
    cart.clear();
    cart.set('attendance', this.get('attendance'));
  },

  actions: {
    openPaymentModal() {

    },

    clearOrder() {
      this.get('cart').cancel();
    },

    submitOrder() {

    },

    add(item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item, 1); // quantity
    }
  }
});
