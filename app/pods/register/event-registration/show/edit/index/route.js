import Ember from 'ember';
import RSVP from 'rsvp';

const { isBlank } = Ember;

export default Ember.Route.extend({
  model() {
    return this.modelFor('register.event-registration.show');
  }
});
