import Ember from 'ember';
Ember.run.backburner.DEBUG = true;

export default Ember.Route.extend({
  // event, registration
  model(params) {
    return this.modelFor('register.event-registration.show');
  }
});
