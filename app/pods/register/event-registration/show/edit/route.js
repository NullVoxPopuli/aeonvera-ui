import Ember from 'ember';

export default Ember.Route.extend({
  // event, registration
  model(params) {
    return this.modelFor('register.event-registration.show');
  }
});
