import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),

  // passed in
  items: [],

  // set here
  givingBackItem: null,
  givingBackQuantity: 0,
  exchangingForItem: null,
  exchangingForQuantity: 0,
  absorbFees: true,

  isGivingBackDisabled: Ember.computed('givingBackItem', 'givingBackQuantity', {
    get() {
      let item = this.get('givingBackItem');
      let quantity = this.get('givingBackQuantity');

      return (item === null || quantity <= 0);
    }
  }),

  isExchangingForDisabled: Ember.computed('exchangingForItem', 'exchangingForQuantity', {
    get() {
      let item = this.get('exchangingForItem');
      let quantity = this.get('exchangingForQuantity');

      return (item === null || quantity <= 0);
    }
  }),

  actions: {
    addToOrder(item) {

    },

    absorbFeesClick() {
      this.set('absorbFees', !this.get('absorbFees'));
      this.get('cart.currentOrder').set('forceAbsorbFee', this.get('absorbFees'));
    },

    setGivingBack() {
      const item = this.get('givingBackItem');
      const quantity = this.get('givingBackQuantity');

      this._add(item, 0 - quantity);
    },

    setExchangingFor() {
      const item = this.get('exchangingForItem');
      const quantity = this.get('exchangingForQuantity');

      this._add(item, quantity);
    },

    openPaymentModal(order) {
      Ember.$('.hidden-mark-paid-container a').click();
    },

    clearOrder() {
      let cart = this.get('cart');
      // cart.get('currentOrder').unloadRecord();
      cart.set('order', null);
      this.sendAction('onComplete');
    }
  },

  _add(item, quantity) {
    this.get('cart').set('host', this.get('event'));

    this.get('cart.currentOrderAsPromise').then(order => {
      // make sure that the cart has this up to date.
      order.set('forceAbsorbFee', this.get('absorbFees'));
      order.set('allowNegative', true);
      order.addLineItem(item, quantity, null, true);
    });
  }
});
