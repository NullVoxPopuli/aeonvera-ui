import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    let eventId = event.get('id');

    let orders = this.modelFor('events.show.orders');

    return {
      orders: orders,
      eventId: eventId
    };
  },
});
