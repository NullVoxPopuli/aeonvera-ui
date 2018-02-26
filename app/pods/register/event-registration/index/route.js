import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const include = `
orders.order_line_items.line_item
unpaid_order.order_line_items.line_item
housing_request
housing_provision
`.split('\n').join(',');

export default Route.extend({
  model() {
    const event = this.modelFor('register.event-registration');

    const registrations = this.store.query('users/registration', {
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

    // disabled for now while testing usability of not auto-redirecting
    // if (hasNotRegistered) {
    //   this.transitionTo('register.event-registration.show.edit', UNREGISTERED_ID);
    // }
  }
});
