import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  cart: Ember.inject.service('order-cart'),

  attendance: Ember.computed(function() {
    return this.store.createRecord('organization-attendance');
  }),

  order: Ember.computed(function() {
    return this.store.createRecord('order');
  }),

  actions: {
    add: function(item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item);
    },

    addByQuantity(quantity, item) {
      this.get('cart').add(item, quantity)
    }
  }
});
