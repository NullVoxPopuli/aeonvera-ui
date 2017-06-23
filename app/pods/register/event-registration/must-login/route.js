import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Route.extend({
  session: inject.service(),

  beforeModel() {
    if (this.get('loggedIn')) {
      return this.transitionTo('register.event-registration');
    }
  },

  model() {
    return this.modelFor('register.event-registration');
  },

  loggedIn: computed('session.isAuthenticated', function() {
    return Boolean(this.get('session.isAuthenticated'));
  }),

  actions: {
    backToRegistration() {
      this.transitionTo('register.event-registration');
    }
  }
});
