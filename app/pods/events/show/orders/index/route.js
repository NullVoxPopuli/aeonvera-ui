import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');

    const orders = this.modelFor('events.show.orders');

    return {
      orders: orders,
      eventId: eventId
    };
  }
});
