import Route from '@ember/routing/route';

export default Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');
    const housingStats = this.modelFor('events.show.housing');
    const requests = this.store.query('housing-request', {
      event_id: eventId,
      include: 'registration'
    });

    const provisions = this.store.query('housing-provision', {
      event_id: eventId,
      include: 'registration'
    });

    return {
      requests: requests,
      provisions: provisions,
      eventId: eventId
    };
  }
});
