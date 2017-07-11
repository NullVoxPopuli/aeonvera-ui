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

    if (!event.get('isHousingEnabled')) {
      this.get('flash').info('Housing is either closed or disabled for this event');

      this.transitionTo('register.event-registration.show');
    }
  }
});
