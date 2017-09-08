import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  // event, registration
  model() {
    return this.modelFor('register.event-registration.show');
  }
});
