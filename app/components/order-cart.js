import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),

  orderContainerClasses: 'large-3 medium-4 columns',

  itemContainerClasses: Ember.computed('buildingAnOrder', function() {
    let building = this.get('buildingAnOrder');
    return building ? 'large-8 medium-8 columns' : 'large-8 medium-12 columns'
  }),

  buildingAnOrder: Ember.computed('cart.hasItems', function() {
    return this.get('cart.hasItems');
  }),

  currentItems: Ember.computed('cart.order.lineItems.[]', function() {
    return this.get('cart.order.lineItems');
  }),


  actions: {

    removeItem: function(item) {
      this.get('cart').remove(item);
    },

    cancel: function() {
      this.get('cart').cancel();
    },

    finishedOrder: function() {
      Ember.$('.close-reveal-modal').click();
      this.get('flashMessages').success(
        'Order was successfully created and recorded'
      );
    }
  }

});
