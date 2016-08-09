import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  cart: inject.service('order-cart'),
  store: inject.service(),

  event: computed.alias('model'),

  // for building user/attendance for the order
  hasAccount: false,
  emailAddress: '',

  actions: {
    openPaymentModal() {

    },

    clearOrder() {

    },

    submitOrder() {

    }
  }
});
