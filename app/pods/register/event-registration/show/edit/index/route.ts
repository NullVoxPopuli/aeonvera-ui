import Ember from 'ember';
import RSVP from 'rsvp';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const { isBlank } = Ember;

export default Ember.Route.extend({
  model() {
    return this.modelFor('register.event-registration.show');
  },

  setupController(controller: Ember.Controller, model: any) {
    const registration = model.registration;
    const shouldClear = registration.get('isNew') && controller.get('registration');

    if (shouldClear) {
      controller.set('selectedPackage', null);
      controller.set('selectedLevel', null);
      controller.set('order', null);
      controller.set('registration', null);
      controller.set('model', null);
    }

    this._super(controller, model);
  }
});
