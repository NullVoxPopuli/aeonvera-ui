import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const event = this.modelFor('events.show');

    return this.store.findRecord('housing-stat', event.get('id'), { adapterOptions: { query: { event_id: event.get('id') } } });
  }
});
