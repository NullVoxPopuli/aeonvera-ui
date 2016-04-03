import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  event: Ember.computed.alias('model'),
  cart: Ember.inject.service('order-cart'),

  housingResponse: 0,
  isWaivingHousing: Ember.computed.equal('housingResponse', 0),
  isProvidingHousing: Ember.computed.equal('housingResponse', 1),
  isRequestingHousing: Ember.computed.equal('housingResponse', 2),

  selectedPackage: null,


  // TODO: maybe eventually make requiring to login optional?
  mustLogin: Ember.computed('session.isAuthenticated', function() {
    let authed = this.get('session.isAuthenticated');
    return !authed;
  }),

  title: Ember.computed('model.name', function () {
    return 'Register for ' + this.get('model.name');
  }).readOnly(),

  attendance: function () {
    return this.store.createRecord('event-attendance');
  }.property(),

  // TODO: remove other packages, or provide an option on the event
  //       to force only registering for one
  packageObserver: Ember.observer('selectedPackage', function(){
    this.get('cart').set('host', this.get('model'));
    this.get('cart').add(this.get('selectedPackage'));
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
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item, quantity);
    }
  }
});
