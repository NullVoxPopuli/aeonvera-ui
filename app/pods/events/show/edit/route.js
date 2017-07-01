import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    const eventModel = this.modelFor('events.show');

    return eventModel;

    // return this.store.find('event', eventSummary.get('id'));
  }
});
