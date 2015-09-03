import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    var fromRoute = this.modelFor('event-at-the-door');
    return this.store.query('line-item', { event_id: fromRoute.get('id'), active: true });
  }
});
