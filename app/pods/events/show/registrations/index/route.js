import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    let eventId = event.get('id');

    let registrations = this.modelFor('events.show.registrations');

    return {
      registrations: registrations,
      eventId: eventId
    };
  },
});
