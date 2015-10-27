import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    let event = this.modelFor('events.show');
    return this.store.query('discount', { event_id: event.get('id'), include: 'allowed_packages' });
  }
});
