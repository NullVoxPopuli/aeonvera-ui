import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    let eventId = event.get('id');
    let housingStats = this.modelFor('events.show.housing');
    let requests =  this.store.query('housing-request', {
      event_id: eventId,
      include: 'attendance'
    });

    let provisions = this.store.query('housing-provision', {
      event_id: eventId,
      include: 'attendance'
    });

    return {
      requests: requests,
      provisions: provisions,
      eventId: eventId
    };
  },
});
