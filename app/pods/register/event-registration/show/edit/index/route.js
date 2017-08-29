import Ember from 'ember';
import RSVP from 'rsvp';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const { isBlank } = Ember;

export default class extends Ember.Route {
  model() {
    return this.modelFor('register.event-registration.show');
  }

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('selectedPackage', null);
      controller.set('selectedLevel', null);
      controller.set('order', null);
      controller.set('registration', null);
      controller.set('model', null);
    }
  }
}
