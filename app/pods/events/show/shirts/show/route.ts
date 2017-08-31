import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    const id = params.shirt_id;
    const event = this.modelFor('events.show');

    return this.store.findRecord('shirt', id, {
      event_id: event.get('id'),
      include: 'order_line_items.order.registration'
    });
  }
});
