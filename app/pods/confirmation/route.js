import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  beforeModel(transition) {
    if (this.get('session.isAuthenticated')) {
      let msg = 'Resetting your password requires that you be logged out';
      this.get('flashMessages').info(msg);
      this.transitionTo('dashboard');
      return;
    }
  }
});
