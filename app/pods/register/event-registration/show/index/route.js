import Ember from 'ember';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const { isEmpty } = Ember;

const PARENT_ROUTE = 'register.event-registration.show';

export default Ember.Route.extend({
  // an unregistered registration cannot view this route
  // (it would be empty, and confusing to a viewer)
  beforeModel(transition) {
    const id = transition.params[PARENT_ROUTE].registrationId;

    if (id === UNREGISTERED_ID) {
      const registration = this.store.peekRecord('registration', UNREGISTERED_ID);

      if (isEmpty(registration)) {
        this.transitionTo('register.event-registration.index');
      }
    }
  },

  model() {
    return this.modelFor('register.event-registration.show');
  }
});
