import Ember from 'ember';

export default Ember.Component.extend({
  // required to be passed in
  host: null,

  actions: {
    searchRegistrants: function(query, deferred) {
      const host = this.get('host');

      return this.store.query('event-attendance', {
        // TODO: currently only works for events.
        event_id: host.get('id'),
        q: {attendee_full_name_cont: query.term}
      }).then(deferred.resolve, deferred.reject);
    }
  }
});
