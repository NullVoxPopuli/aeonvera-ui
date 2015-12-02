import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    let event = this.modelFor('events.show');
    return this.store.createRecord('level', {
      event: event
    });
  }
});
