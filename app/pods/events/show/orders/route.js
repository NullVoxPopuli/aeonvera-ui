import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    return this.store.query('order', {
      event_id: event.get('id'),
      include: 'order_line_items.line_item,host'
    });
  },
});
