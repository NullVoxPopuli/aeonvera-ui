import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('register');
  },

  afterModel(model, transition) {
    this.set('title', model.get('name'));
    const subdomain = transition.params.register.subdomain;

    if (model.get('isEvent')) {
      return this.transitionTo('register.event-registration', model);
    }

    return this.transitionTo('register.community-registration', model);
  }
});
