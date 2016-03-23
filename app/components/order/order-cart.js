import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),
  orderContainerClasses: 'large-4 medium-4 columns',

  itemContainerClasses: Ember.computed('buildingAnOrder', function() {
    let building = this.get('buildingAnOrder');
    return building ? 'large-8 medium-8 columns' :
      'large-8 medium-12 columns';
  }),

  buildingAnOrder: Ember.computed('cart.hasItems', function() {
    return this.get('cart.hasItems');
  }),

  currentItems: Ember.computed('cart.items', function() {
    return this.get('cart.items');
  }),

  order: Ember.computed('cart.order', function() {
    return this.get('cart.order');
  }),

  actions: {
    checkout(){
      this.get('cart').checkout().then(record => {
        let id = record.get('id');
        this.get('router').transitionTo('register.checkout', id);
      }, error => {
        // TODO: have a more prevelant place to display these errors
        // TODO: What errors could show up here?
        this.get('flashMessages').alert(error);
        console.error(error);
      });
    },

    removeItem: function(item) {
      this.get('cart').remove(item);
    },

    cancel: function() {
      this.get('cart').cancel();
    },
  },

});
