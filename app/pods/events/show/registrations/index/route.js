import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');
    const eventId = event.get('id');

    const registrations = this.modelFor('events.show.registrations');

    return {
      registrations: registrations,
      eventId: eventId
    };
  }
});
