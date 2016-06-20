import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    let event = this.modelFor('events.show');
    return this.store.query('housing-provision', { event_id: event.get('id') });
  },
});
