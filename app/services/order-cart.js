import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  userFirstName: '',
  userLastName: '',
  userEmail: '',
  order: null,
  host: null,

  userName: Ember.computed('userFirstName', 'userLastName', function(){
    return this.get('userFirstName') + this.get('userLastName');
  }),

  hasItems: Ember.computed('order', 'order.hasLineItems', function() {
    let order = this.get('order');
    return (Ember.isPresent(order) && order.get('hasLineItems'));
  }),

  items: Ember.computed('order.orderLineItems.@each', function() {
    return this.get('order.orderLineItems');
  }),

  currentOrder: Ember.computed('order', function(){
    let order = this.get('order');
    if (!Ember.isPresent(order)){
      let user = this.get('session.currentUser');
      order = this.get('store').createRecord('order', {
        host: this.get('host'),
        user: user,
        userName: this.get('userName'),
        userEmail: this.get('userEmail'),
      });

      this.set('order', order);
    }
    return order;
  }),

  add(item, quantity = 1) {
    let order = this.get('currentOrder');
    this.get('order').addLineItem(item, quantity);
  },

  remove(item) {
    let order = this.get('order');
    order.removeOrderLineItem(item);
    if (!order.get('hasLineItems')) { this.cancel(); }
  },

  cancel() {
    this.get('order').unloadRecord();
    this.set('order', null);
  },

  submit() {

  },

  processStripeToken() {

  },

  process() {

  },

});
