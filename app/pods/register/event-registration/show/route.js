import Ember from 'ember';
import RSVP from 'rsvp';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const { isPresent, isBlank } = Ember;

const include = Ember.String.w(`
level
orders.order_line_items.line_item
unpaid_order.order_line_items.line_item
housing_request
housing_provision
`).join(',');

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  authenticationRoute: 'register.event-registration.must-login',

  model(params) {
    const registrationId = params.registrationId;
    const event = this.modelFor('register.event-registration');

    let registration;

    if (registrationId === UNREGISTERED_ID) {
      // try to unload an existing unregistered registration first
      // there can be stale unregistered registrations when repeatedly
      const old = this.store.peekRecord('registration', UNREGISTERED_ID);

      if (old) old.unloadRecord();

      registration = this.store.createRecord('registration', {
        host: event
      });
    } else {
      registration = this.store.findRecord('registration', registrationId, { include });
    }

    return RSVP.hash({ event, registration });
  },

  actions: {
    triggerRefreshForOrderReview() {
      this.refresh();
      this.transitionTo('register.event-registration.show.index');
    }
  }
});
