import Route from '@ember/routing/route';

export default Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');

    const registrations = this.store.query('events/registration', {
      event_id: eventId,
      q: {
        ['orders_paid_eq']: false,
        ['orders_sub_total_in_cents_gt']: 0
      }
    });

    return {
      registrations,
      eventId
    };
  }
});
