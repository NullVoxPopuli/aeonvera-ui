import Route from '@ember/routing/route';

export default Route.extend({

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
