import Ember from 'ember';

export default Ember.Component.extend({
  cart: Ember.inject.service('order-cart'),
  orderContainerClasses: 'large-4 medium-4 columns',
  errors: [],
  resetCheckoutButton: false,

  /*
    Handle optional parameters for editing an order
  */
  didInsertElement(){
    this._super(...arguments);
    let token = this.get('token');
    let order = this.get('order');
    this.set('cart.token', token);
    if (Ember.isPresent(order)){
      this.set('cart.order', order);
      this.set('cart.email', order.get('userEmail'));
    }
  },

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
    checkout() {
      this.get('cart').checkout().then(record => {
        let id = record.get('id');
        let token = record.get('paymentToken');
        this.get('router').transitionTo('register.checkout', id, {queryParams: { token: token }});
        this.set('resetCheckoutButton', true);
      }, error => {
        // because the checkout request isn't using ember-data,
        // we have to parse the errors ourselves
        let errors = JSON.parse(error.responseText);
        this.set('errors', errors.errors);
        this.set('resetCheckoutButton', true);
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
