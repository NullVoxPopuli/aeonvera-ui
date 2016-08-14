import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params, transition) {
    return this.modelFor('event-at-the-door');
  },

  actions: {
    newRegistrationComplete() {
      this.transitionTo('event-at-the-door');
    }
  }
});
