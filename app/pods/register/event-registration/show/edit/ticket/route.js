import Ember from 'ember';
import RSVP from 'rsvp';

const { isBlank, inject } = Ember;

export default Ember.Route.extend({
  flash: inject.service('flash-notification'),

  model() {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model) {
    const event = model.event;

    if (!event.get('hasTickets')) {
      this.transitionTo('register.event-registration.show.edit.line-items');
    }
  }
});
