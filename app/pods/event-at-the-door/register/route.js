import Ember from 'ember';

export default Ember.Route.extend({

  model: function (params, transition) {
    let eventId = transition.params['event-at-the-door'].event_id;

  },
});
