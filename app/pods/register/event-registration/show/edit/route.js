import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  // event, registration
  model() {
    return this.modelFor('register.event-registration.show');
  }
});
