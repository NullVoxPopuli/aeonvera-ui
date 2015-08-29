import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    var fromRoute = this.modelFor('event-at-the-door');
    return this.store.find('event-attendance', { event_id: fromRoute.get('id') });
  }
});
