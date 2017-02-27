import Ember from 'ember';

export default Ember.Route.extend({
  showMyEvents: false,

  model: function() {
    return this.store.findAll('hosted-event');
  }
});
