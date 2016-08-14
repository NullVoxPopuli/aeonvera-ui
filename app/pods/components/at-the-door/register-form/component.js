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
    let cart = this.get('cart');
    cart.clear();
    cart.set('attendance', this.get('attendance'));
    cart.set('automaticDiscounts', false);
  },

  actions: {
    add(item) { this._add(item); },
    absorbFeesClick(value) {
      this.set('absorbFees', value);
      this.get('cart.currentOrder').set('forceAbsorbFee', value);
    },

    clearOrder() {
      let cart = this.get('cart');
      cart.get('currentOrder').unloadRecord();
      cart.set('order', null);
    },

    openPaymentModal(order) {
      Ember.$('.hidden-mark-paid-container a').click();
    },

    setPackage(selectedPackage) {
      let attendance = this.get('attendance');
      attendance.set('package', selectedPackage);

      this._add(selectedPackage);
    },

    setLevel(selectedLevel) {
      let attendance = this.get('attendance');
      attendance.set('level', selectedLevel);
    },

    setToEventLocation() {
      let attendance = this.get('attendance');
      let event = this.get('event');

      // TODO: add city and state to event
      let location = event.get('location');
      let parts = location.split(',');
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
