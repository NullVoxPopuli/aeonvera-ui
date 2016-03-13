import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  userFirstName: '',
  userLastName: '',
  order: null,
  host: null,
  userEmail: Ember.computed({
    get(key){ this.get('order.userEmail') || this.get('session.currentUser.email'); },
    set(key, value){ this.set('order.userEmail', value); }
  }),

  hasItems: Ember.computed('order', 'order.hasLineItems', function() {
    let order = this.get('order');
    return (Ember.isPresent(order) && order.get('hasLineItems'));
  }),

  items: Ember.computed('order.orderLineItems.@each', function() {
    return this.get('order.orderLineItems');
  }),

  userName: Ember.computed('userFirstName', 'userLastName', function(){
    return this.get('userFirstName') + this.get('usreLastName');
  }),

  name: Ember.computed('userName', 'session.currentUser', function(){
    let user = this.get('session.currentUser');
    let hasUser = Ember.isPresent(user);
    let name = this.get('userName');
    name = Ember.isPresent(name) || !hasUser ? name : user.get('name');

    return name;
  }),

  // email could come from either the current user,
  // or from the entered fields if the user is not logged in
  email: Ember.computed('userEmail', 'session.currentUser', function(){
    let user = this.get('session.currentUser');
    let hasUser = Ember.isPresent(user);
    let email = this.get('userEmail');
    email = Ember.isPresent(email) || !hasUser ? email : user.get('email');

    return email
  }),

  add(item, quantity = 1) {
    let order = this.get('order');
    let user = this.get('session.currentUser');

    if (!Ember.isPresent(order)) {
      order = this.get('store').createRecord('order', {
        host: this.get('host'),
        user: user,
        userName: this.get('name'),
        userEmail: this.get('userEmail'),
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
