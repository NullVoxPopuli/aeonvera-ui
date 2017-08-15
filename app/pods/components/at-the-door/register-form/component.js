import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  cart: inject.service('order-cart'),
  store: inject.service(),
  absorbFees: true,

  event: computed.alias('model'),

  // for building user/registration for the order
  registration: computed({
    get() {
      return this.get('store').createRecord('registration', {
        host: this.get('event')
      });
    }
  }),

  init() {
    this._super(...arguments);
    const cart = this.get('cart');

    cart.clear();
    cart.set('registration', this.get('registration'));
    cart.set('automaticDiscounts', false);
  },

  actions: {
    add(item) {
      this._add(item);
    },

    absorbFeesClick(value) {
      this.set('absorbFees', value);
      this.get('cart.currentOrder').set('forceAbsorbFee', value);
    },

    clearOrder() {
      const cart = this.get('cart');

      cart.get('currentOrder').unloadRecord();
      cart.set('order', null);
      const registration = this.get('registration');

      this.sendAction('onComplete');
    },

    openPaymentModal(order) {
      Ember.$('.hidden-mark-paid-container a').click();
    },

    setPackage(selectedPackage) {
      const registration = this.get('registration');

      registration.set('package', selectedPackage);

      this._add(selectedPackage);
    },

    setLevel(selectedLevel) {
      const registration = this.get('registration');

      registration.set('level', selectedLevel);
    },

    setToEventLocation() {
      const registration = this.get('registration');
      const event = this.get('event');

      // TODO: add city and state to event
      const location = event.get('location');
      const parts = location.split(',');

      registration.set('city', parts[0]);
      registration.set('state', parts[1]);
    }
  },

  _add(item) {
    this.get('cart').set('host', this.get('model'));

    this.get('cart').add(item, 1).then(() => {
      // make sure that the cart has this up to date.
      this.get('cart.currentOrder').set('forceAbsorbFee', this.get('absorbFees'));
    });
  }
});
