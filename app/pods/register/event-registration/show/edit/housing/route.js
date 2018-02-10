import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { isBlank } from '@ember/utils';
import RSVP from 'rsvp';

export default Route.extend({
  flash: service('flash-notification'),

  model() {
    return this.modelFor('register.event-registration.show');
  },

  afterModel(model) {
    const event = model.event;

    if (!event.get('isHousingEnabled')) {
      this.transitionTo('register.event-registration.show.edit.shirts');
    }
  }
});
