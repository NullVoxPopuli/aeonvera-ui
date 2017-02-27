import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');

    return this.store.query('volunteer', {event_id: event.get('id')});
  }
});
