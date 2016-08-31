import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params, transition) {
    let eventId = transition.params['event-at-the-door'].event_id;

    let attendances = this.store.query('event-attendance', {
      event_id: eventId,
      include: 'host.integrations,orders.order_line_items.line_item.restraints'
    });

    return {
      attendances,
      id: eventId
    };
  },
});
