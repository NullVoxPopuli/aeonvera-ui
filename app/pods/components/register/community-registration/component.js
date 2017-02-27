import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  user: Ember.inject.service('current-user'),
  cart: Ember.inject.service('order-cart'),

  title: Ember.computed('model.name', function() {
    return 'Register for ' + this.get('model.name');
  }).readOnly(),

  firstName: Ember.computed.alias('cart.userFirstName'),
  lastName: Ember.computed.alias('cart.userLastName'),
  email: Ember.computed.alias('cart.userEmail'),

  isCurrentMember: Ember.computed('user.user', 'session.isAuthenticated', 'session.currentUser', function() {
    // let user = this.get('user.user');
    const user = this.get('store').peekRecord('user', 'current-user');
    const organization = this.get('model');

    return Ember.isPresent(user) ? user.isMemberOf(organization) : false;
  }),

  showMembershipOptions: Ember.computed('isCurrentMember',
    'session.isAuthenticated',
    function() {
      const isCurrentMember = this.get('isCurrentMember');
      const isAuthenticated = this.get('session.isAuthenticated');

      return (isAuthenticated && !isCurrentMember);
    }),

  membershipExpiresAt: Ember.computed(function() {
    const user = this.get('store').peekRecord('user', 'current-user');
    const organization = this.get('model');
    const renewal = user.latestRenewalFor(organization);
    const date = renewal.get('expiresAt');

    return date;
  }),

  attendance: Ember.computed(function() {
    return this.store.createRecord('organization-attendance');
  }),

  order: Ember.computed(function() {
    return this.store.createRecord('order');
  }),

  actions: {
    cancel() {
      // NOTE: they are already on this page
      // this.get('router').transitionTo('register.index');
    },

    add: function(item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item);
    },

    addByQuantity(quantity, item) {
      this.get('cart').set('host', this.get('model'));
      this.get('cart').add(item, quantity);
    },

    subtractOneQuantity(item) {
      const counter = Ember.$(`#item-option-${item.id}`);
      const num = parseInt(counter.text());

      if (num > 0) {
        counter.text(num - 1);
      }

      this.get('cart').set('host', this.get('model'));
      this.get('cart').subtractOne(item);
    },

    addOneQuantity(item) {
      const counter = Ember.$(`#item-option-${item.id}`);

      counter.text(parseInt(counter.text()) + 1);
      this.get('cart').set('host', this.get('model'));
      this.get('cart').addOne(item);
    }
  }
});
