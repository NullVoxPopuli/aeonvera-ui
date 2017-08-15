import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const housingStats = this.modelFor('events.show.housing');
    const eventId = event.get('id');
    const provisions = this.store.query('housing-provision', {
      event_id: eventId,
      include: 'registration'
    });

    return {
      provisions: provisions,
      eventId: eventId
    };
  }
});
