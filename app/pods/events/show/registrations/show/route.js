import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params) {
    let event = this.modelFor('events.show');

    return this.store.findRecord('event-attendance', params.registration_id, {
      adapterOptions: {
        query: {
          event_id: event.get('id'),

          include: 'orders.order_line_items.line_item',
        },
      },
    });
  },
});
