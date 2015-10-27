import Ember from 'ember';

export default Ember.Route.extend({

  didTransition: function(){
    this._super();
    Ember.$(document).foundation('reflow');
    return true;
  },

  model: function(){
    let event = this.modelFor('events.show');
    return this.store.query('package', { event_id: event.get('id') });
  }
});
