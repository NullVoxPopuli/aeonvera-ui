import Ember from 'ember';

export default Ember.Route.extend({


  model: function(){
    var eventSummary = this.modelFor('events.show');
    return this.store.find('event', eventSummary.get('id'));
  }
});
