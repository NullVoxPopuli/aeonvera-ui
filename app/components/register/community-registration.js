import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  user: Ember.inject.service('current-user'),
  cart: Ember.inject.service('order-cart'),

  isCurrentMember: Ember.computed('user.user', function() {
    let user = this.get('store').peekRecord('user', 0);
    let organization = this.get('model');

    return user.isMemberOf(organization);
  }),

  showMembershipOptions: Ember.computed('isCurrentMember',
    'session.isAuthenticated',
    function() {
      let isCurrentMember = this.get('isCurrentMember');
      let isAuthenticated = this.get('session.isAuthenticated');

      return (isAuthenticated && !isCurrentMember);
    }),

  membershipExpiresAt: Ember.computed(function(){
    let user = this.get('store').peekRecord('user', 0);
    let organization = this.get('model');
    let renewal = user.latestRenewalFor(organization);
    let date = renewal.get('expiresAt');
    return date;
  }),

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
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item, quantity);
    },
  },
});
