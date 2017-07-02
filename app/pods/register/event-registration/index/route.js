import Ember from 'ember';
import RSVP from 'rsvp';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const { isEmpty } = Ember;

const include = `
orders.order_line_items.line_item
unpaid_order.order_line_items.line_item
housing_request
housing_provision
`.split('\n').join(',');

export default Ember.Route.extend({
  model() {
    const event = this.modelFor('register.event-registration');

    const registrations = this.store.query('registration', {
      include: include,
      q: {
        host_id_eq: event.get('id'),
        host_type_eq: 'Event'
      }
    });

    return RSVP.hash({ event, registrations });
  },

  afterModel(model, transition) {
    const hasNotRegistered = isEmpty(model.registrations);

    if (hasNotRegistered) {
      this.transitionTo('register.event-registration.show.edit', UNREGISTERED_ID);
    }
  }
});
