import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const id = event.get('id');

    return this.store.query('order', {
      event_id: id,
      host_id: id,
      host_type: 'Event',
      include: 'order_line_items.line_item,host'
    });
  }
});
