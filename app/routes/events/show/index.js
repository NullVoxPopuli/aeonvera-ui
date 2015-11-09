import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let event = this.modelFor('events.show');

    return Ember.RSVP.hash({
      summary: this.store.findRecord(
        'event-summary',
        event.get('id'), {
          adapterOptions: {
            query: {
              include: 'event_attendances'
            }
          }
        }),
      event: event
    });


  }
});
