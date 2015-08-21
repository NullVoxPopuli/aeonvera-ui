import Ember from 'ember';

export default Ember.Route.extend({
  model: function(eventId) {
    return this.store.find('event', eventId)
  }
});
