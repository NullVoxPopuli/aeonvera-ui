import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    const id = params.package_id;
    const event = this.modelFor('events.show');

    return this.store.findRecord('package', id, {
      event_id: event.get('id'),
      include: 'order_line_items.order.registration'
    });
  }
});
