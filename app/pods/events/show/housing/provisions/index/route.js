import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    let housingStats = this.modelFor('events.show.housing');
    let eventId = event.get('id');
    let provisions = this.store.query('housing-provision', {
      event_id: eventId,
      include: 'attendance'
    });

    return {
      provisions: provisions,
      eventId: eventId
    };
  },
});
