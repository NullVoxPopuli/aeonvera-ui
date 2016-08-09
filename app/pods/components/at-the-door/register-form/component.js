import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  cart: inject.service('order-cart'),
  store: inject.service(),

  event: computed.alias('model'),

  actions: {
    openPaymentModal() {

    },

    clearOrder() {

    },

    submitOrder() {

    }
  }
});
