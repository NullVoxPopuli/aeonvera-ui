import Route from '@ember/routing/route';

export default Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');

    const registrations = this.store.query('events/registration', {
      event_id: event.get('id')
    });

    return {
      registrations: registrations,
      eventId: eventId
    };
  }
});
