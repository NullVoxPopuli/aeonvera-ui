import Ember from 'ember';

export default Ember.Route.extend({


  model: function(){
    var eventSummary = this.modelFor('events.show');
    return this.store.findRecord('event', eventSummary.get('id'));
  }
});
