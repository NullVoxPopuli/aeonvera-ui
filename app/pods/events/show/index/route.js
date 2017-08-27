import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    const event = this.modelFor('events.show');

    return Ember.RSVP.hash({
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
