import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Route.extend({
  session: inject.service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      return this.transitionTo('register.event-registration');
    }
  },

  model() {
    return this.modelFor('register.event-registration');
  },

  actions: {
    backToRegistration() {
      this.transitionTo('register.event-registration');
    }
  }
});
