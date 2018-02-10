import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    const event = this.modelFor('events.show');

    return hash({
      summary: this.store.findRecord(
        'event-summary',
        event.get('id'), {
          adapterOptions: {
            query: {
              include: 'registrations.orders.order_line_items.line_item.restraints'
            }
          }
        }),
      event: event
    });

  }
});
