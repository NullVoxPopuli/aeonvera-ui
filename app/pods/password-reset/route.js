import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  flashMessages: Ember.inject.service('flashMessages'),

  activate: function() {
    Ember.$('a.close-reveal-modal').trigger('click');
  },

  beforeModel: function(transition) {
    if (this.get('session.isAuthenticated')) {
      const msg = 'Resetting your password requires that you be logged out';

      this.get('flashMessages').info(msg);
      this.transitionTo('dashboard');
      return;
    }
  },

  model: function() {
    return this.get('store').createRecord('user');
  },

  actions: {
    resetSuccess: function() {
      this.transitionTo('password-reset.success');
    },

    newPasswordSet: function() {
      this.transitionTo('password-reset.reset-success');
    }
  }
});
