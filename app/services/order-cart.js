import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  userName: '',
  userEmail: '',
  order: null,
  host: null,

  hasItems: Ember.computed('order', 'order.hasLineItems', function() {
    let order = this.get('order');
    return (Ember.isPresent(order) && order.get('hasLineItems'));
  }),

  items: Ember.computed('order.orderLineItems.@each', function() {
    return this.get('order.orderLineItems');
  }),

  add(item, quantity = 1) {
    let order = this.get('order');
    let user = this.get('session.currentUser');
    let name = this.get('userName');
    let email = this.get('userEmail');
    // email could come from either the current user,
    // or from the entered fields if the user is not logged in
    name = Ember.isPresent(name) ? name : user.get('name');
    email = Ember.isPresent(email) ? email : user.get('email');

    if (!Ember.isPresent(order)) {
      order = this.get('store').createRecord('order', {
        host: this.get('host'),
        user: user,
        userName: name,
        userEmail: email,
      });

      this.set('order', order);
    }

    this.get('order').addLineItem(item, quantity);
  },

  remove(item) {
    let order = this.get('order');
    order.removeOrderLineItem(item);

    if (!order.get('hasLineItems')) {
      this.cancel();
    }
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
