import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  cart: inject.service('order-cart'),
  store: inject.service(),
  absorbFees: true,

  event: computed.alias('model'),

  // for building user/attendance for the order
  attendance: computed({
    get() {
      return this.get('store').createRecord('event-attendance', {
        host: this.get('event')
      });
    }
  }),

  init() {
    this._super(...arguments);
    const cart = this.get('cart');

    cart.clear();
    cart.set('attendance', this.get('attendance'));
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
      const attendance = this.get('attendance');

      this.sendAction('onComplete');
    },

    openPaymentModal(order) {
      Ember.$('.hidden-mark-paid-container a').click();
    },

    setPackage(selectedPackage) {
      const attendance = this.get('attendance');

      attendance.set('package', selectedPackage);

      this._add(selectedPackage);
    },

    setLevel(selectedLevel) {
      const attendance = this.get('attendance');

      attendance.set('level', selectedLevel);
    },

    setToEventLocation() {
      const attendance = this.get('attendance');
      const event = this.get('event');

      // TODO: add city and state to event
      const location = event.get('location');
      const parts = location.split(',');

      attendance.set('city', parts[0]);
      attendance.set('state', parts[1]);
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
