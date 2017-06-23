import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.modelFor('register.event-registration');
  },

  afterModel(model, transition) {
    if (model.get('registrationIsOpen')) {
      return this.transitionTo('register.event-registration', model);
    }
  },

  actions: {
    countdownComplete() {
      this.transitionTo('register.event-registration');
    }
  }

});
