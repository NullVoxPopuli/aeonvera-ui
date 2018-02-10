import Route from '@ember/routing/route';

export default Route.extend({
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
