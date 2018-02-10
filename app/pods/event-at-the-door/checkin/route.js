import Route from '@ember/routing/route';

export default Route.extend({

  model: function(params, transition) {
    const eventId = transition.params['event-at-the-door'].event_id;

    const registrations = this.store.query('events/registration', {
      event_id: eventId,
      include: 'host.integrations,orders.order_line_items.line_item.restraints'
    });

    return {
      registrations,
      id: eventId
    };
  }
});
