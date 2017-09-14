import Ember from 'ember';
import RSVP from 'rsvp';

import { action } from 'ember-decorators/object';

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
      registration = this.store.createRecord('users/registration', {
        host: event
      });
    } else {
      registration = this.store.findRecord('users/registration', registrationId, { include });
    }

    return RSVP.hash({ event, registration });
  },

  @action
  triggerRefreshForOrderReview() {
    this.refresh();
    this.transitionTo('register.event-registration.show.index');
  }
});
