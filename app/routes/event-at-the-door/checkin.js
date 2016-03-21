import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params, transition) {
    let eventId = transition.params['event-at-the-door'].event_id;

    // TODO: if the ID is empty, all event-attendances are returned. bad.
    return this.store.query('event-attendance', { event_id: eventId });
  },
});
