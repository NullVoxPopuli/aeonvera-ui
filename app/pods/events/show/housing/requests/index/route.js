import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');
    const housingStats = this.modelFor('events.show.housing');
    const requests = this.store.query('housing-request', {
      event_id: eventId,
      include: 'attendance'
    });

    const provisions = this.store.query('housing-provision', {
      event_id: eventId,
      include: 'attendance'
    });

    return {
      requests: requests,
      provisions: provisions,
      eventId: eventId
    };
  }
});
